import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleXmark, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
function Carrito({cerrar, totalProductos, logCart , loginCart}) {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Esponjabon', price: 10.00, quantity: 1 , image: "../../../public/pictures/producto1.png" , desc: "Esponjabon floor para baño, formul...", valoracion: 4 },
        { id: 2, name: 'Tónito facial', price: 15.00, quantity: 2, image: "../../../public/pictures/oferta3.png" , desc: "Tónito facial dermatológico...", valoracion: 5 }
    ]);
    //  ^^^ ES SOLO TEST PARA PROBAR LA FUNCIONALIDAD DEL POP-UP EMERGENTE DEL CARRITO.
    const log = logCart;

    const enviarTotal = () => {
        const total = cartItems.reduce((total, item) => total + item.quantity, 0);
        totalProductos(total);
    };

    useEffect(() => {
        enviarTotal();
    }, [])

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
        enviarTotal();
    };
    const increaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
        enviarTotal();
    };
    const decreaseQuantity = (itemId, itemQuan) => {
        if(itemQuan == 1){
            removeItem(itemId);
        }else{
            setCartItems(cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            ));
        }
        enviarTotal();
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const iva = (subtotal * (.08)).toFixed(2);
    const total = (parseInt(subtotal) + parseInt(iva)).toFixed(2);

    const cartList = cartItems.map(item => (
        <li key={item.id} className="cart-item">
            <img className='cart-photo' src={item.image} alt={item.name} />
            <div className='grid w-3/4 mx-4 content-between'>
                <div className='flex justify-between'>
                    <div className='grid'>
                        <span className='text-xl mr-5 font-bold'>{item.name}</span>
                        <Rating className='' value={item.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                    </div>
                    <button className='cart-remove' onClick={() => removeItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <div>
                    <span className='text-xs'>{item.desc}</span>
                </div>
                <div className="flex justify-between">
                    <div>
                        <button className='cart-quan ml-2' onClick={() => decreaseQuantity(item.id, item.quantity)}>
                            <FontAwesomeIcon icon={faCircleMinus} />
                        </button>
                        <span className='ml-2'>{item.quantity}</span>
                        <button className='cart-quan ml-2' onClick={() => increaseQuantity(item.id, item.quantity)}>
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </button>
                    </div>
                    <span className='ml-5 font-bold'> ${item.price.toFixed(2)}</span>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="cart shadow-md">
            <div className="cart-header">
                <h2 className='cart-title'>Mi Carrito</h2>
                <button className='cart-exit' onClick={cerrar} >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div> 
            {cartItems.length === 0 ? (
                <h4 className="cart-empty mt-8">No hay artículos en el carrito.</h4>
            ):(
                <>
                    <ul id="cart-items">{cartList}</ul>
                    <div className='flex justify-between'>
                        <p>Envio:</p>
                        <span>$0.00</span>
                    </div>
                    <div className='flex justify-between'>
                        <p>IVA:</p>
                        <span>${iva}</span>
                    </div>
                    <div className='cart-total flex justify-between py-2'>
                        <p>Total:</p>
                        <span className='font-bold'>${total}</span>
                    </div>
                    { log ? (
                        <div className='flex'>
                            <a href='/spa/comprar' className="cart-mas">Comprar</a>
                        </div>
                    ):(
                        <div className='flex'>
                            <a href='#' className="cart-mas" onClick={loginCart}>Comprar</a>
                        </div>
                    )}
                    
                </>
            )}
        </div>
    );
}

export default Carrito;