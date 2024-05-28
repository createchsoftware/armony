import React, { useEffect, useState, createContext, useContext } from 'react';
import { Rating } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleXmark, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import PagoProducto from '../../pages/PagoProducto';
const CarritoContext = createContext();
import { Navigate, useNavigate } from "react-router-dom";
import PopupLogin from './Login/PopupLogin';
import { jwtDecode } from "jwt-decode";

export const CarritoProvider = ({ children }) => {

    const [Uid, setUid] = useState(null)



    useEffect(() => {
        const getidUser = () => {// aqui veificamos si hay una cookie con este nombre 
            const cookie = obteneridCookie('Naruto_cookie')
            if (cookie) {

                const decode = jwtDecode(cookie)//aqui decodificaremos la cokie
                setUid(decode.user)
            }
        }
        getidUser()
    }, [])


    const obteneridCookie = (namecookie) => { //en este metodo lo que hacemos es destructurar la cokie para 
        // obtener el user y luego el id
        const cookies = document.cookie.split(';');
        for (let cokie of cookies) {
            const [key, value] = cokie.split('=')
            if (key.trim() === namecookie) {
                return value;//retornara el valor
            }
        }
        return null;
    }


    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    localStorage.clear();
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Función para agregar un ítem al carrito
    const agregarAlCarrito = (item) => {
        const existingItem = cartItems.find(i => i.id === item.id);
        if (existingItem) {
            // Incrementar la cantidad por item.cantidad
            setCartItems(cartItems.map(i =>
                i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad } : i
            ));
        } else {
            // Agregar el ítem al carrito
            setCartItems([...cartItems, item]);
            if (Uid) {
                try {
            fetch('/api/admin/carrito/addCarrito',{
                method: "POST",
                body: JSON.stringify({
                    idCliente: Uid, 
                    IdProducto: item.id 

         })})
        }catch(error){
            console.error("error:",error)
        }}
        }
    };

    const eliminarDelCarrito = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const increaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
    };

    const decreaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) } : item
        ));

        // Si la cantidad es 1, eliminar el producto del carrito
        const item = cartItems.find(item => item.id === itemId);
        if (item && item.cantidad === 1) {
            eliminarDelCarrito(itemId);
        }
    };

    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.cantidad, 0);
    };


    return (
        <CarritoContext.Provider value={{ cartItems, agregarAlCarrito, eliminarDelCarrito, increaseQuantity, decreaseQuantity, getCartItemsCount }}>
            {children}
        </CarritoContext.Provider>
    );

};

export const useCarrito = () => useContext(CarritoContext);

const Carrito = ({ cerrar, totalProductos, cartLogin }) => {
    const { cartItems, eliminarDelCarrito, increaseQuantity, decreaseQuantity } = useCarrito();
    const [log, setLog] = useState(false); //<<< PARA EL INICIO DE SESION
    const [login, setLogin] = useState(false);

    async function recibido() {
        const respuesta = await fetch("/api/logueado", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!respuesta.ok) {
            setLog(false);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setLog(true);
        } else {
            setLog(false);
        }
    }


    const toggleLoginPopup = () => {
        setLogin(!login);
    };


    useEffect(() => {
        recibido();
        enviarTotal();
    }, []);

    const navigate = useNavigate();

    const enviarTotal = () => {
        const total = cartItems.reduce((total, item) => total + item.cantidad, 0);
        totalProductos(total);
    };

    const handleComprar = () => {
        navigate('/spa/comprar', { state: { producto: null } });
    };

    const removeItem = (itemId) => {
        eliminarDelCarrito(itemId);
        enviarTotal();
    };

    const cartList = cartItems.map(item => (
        <li key={item.id} className="overflow-y-auto cart-item">
            <img className='cart-photo' src={item.imagen} alt={item.nombre} />
            <div className='grid content-between w-3/4 mx-4'>
                <div className='flex justify-between'>
                    <div className='grid'>
                        <span className='mr-5 text-xl font-bold'>{item.nombre}</span>
                        <Rating className='' value={item.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                    </div>
                    <button className='cart-remove' onClick={() => removeItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <div>
                    {/* limit item.descripcion to 60 caracters */}
                    <span className='text-xs'>{item.descripcion.length > 30 ? item.descripcion.substring(0, 60) + '...' : item.descripcion}</span>
                </div>
                <div className="flex justify-between">
                    <div>
                        <button className='ml-2 cart-quan' onClick={() => decreaseQuantity(item.id)}>
                            <FontAwesomeIcon icon={faCircleMinus} />
                        </button>
                        <span className='ml-2'>{item.cantidad}</span>
                        <button className='ml-2 cart-quan' onClick={() => increaseQuantity(item.id)}>
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </button>
                    </div>
                    <span className='ml-5 font-bold'> ${item.precio ? item.precio.toFixed(2) : '0.00'}</span>
                </div>
            </div>
        </li>
    ));

    const subtotal = cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2) : '0.00';
    const iva = (parseFloat(subtotal) * 0.08).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

    return (
        <div className="overflow-y-auto shadow-md cart">
            <div className="overflow-y-auto cart-header">
                <h2 className='cart-title'>Mi Carrito</h2>
                <button className='cart-exit' onClick={cerrar} >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div>
            {cartItems.length === 0 ? (
                <h4 className="mt-8 cart-empty">No hay artículos en el carrito.</h4>
            ) : (
                <>
                    <ul id="cart-items overflow-y-auto" className='overflow-y-auto h-[30rem]'>{cartList}</ul>
                    <div className='flex justify-between'>
                        <p>Envio:</p>
                        <span>$0.00</span>
                    </div>
                    <div className='flex justify-between'>
                        <p>IVA:</p>
                        <span>${iva}</span>
                    </div>
                    <div className='flex justify-between py-2 cart-total'>
                        <p>Total:</p>
                        <span className='font-bold'>${total}</span>
                    </div>
                    {log ? (
                        <button className='m-auto w-full hover:bg-opacity-90 rounded-xl py-2 px-6 text-white bg-[#45B59C]' onClick={handleComprar}>
                            Comprar
                        </button>
                    ) : (
                        <button className='m-auto w-full hover:bg-opacity-90 rounded-xl py-2 px-6 text-white bg-[#45B59C]' onClick={cartLogin}>
                            Comprar
                        </button>
                    )}
                </>
            )}
            {login && <PopupLogin cerrar={toggleLoginPopup} />}
        </div>
    );
}

export default Carrito;
