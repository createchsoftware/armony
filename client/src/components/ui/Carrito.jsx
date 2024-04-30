import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleXmark, faCircleMinus, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
function Carrito({cerrar, enviarDato}) {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Crema', price: 50.00, quantity: 1 , image: "../../../pictures/crema2.png" , desc: "Crema olor a coco humectante." },
        { id: 2, name: 'Shampoo', price: 75.00, quantity: 1, image: "../../../pictures/crema1.png" , desc: "Shampoo con aceite de coco." }
    ]);
    //  ^^^ ES SOLO TEST PARA PROBAR LA FUNCIONALIDAD DEL POP-UP EMERGENTE DEL CARRITO.

    const [datoLocal, setDatoLocal] = useState(0);

    const sendItem = () => {
        const dato = cartItems.reduce((total, item) => total + item.quantity, 0);
        setDatoLocal(dato);
        enviarDato(dato);
    }; 
    function funcSend(){
        sendItem();
    }

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
        funcSend();
    };
    const increaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
        funcSend();
    };
    const decreaseQuantity = (itemId, itemQuan) => {
        if(itemQuan == 1){
            removeItem(itemId);
        }else{
            setCartItems(cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            ));
        }
        funcSend();
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    const cartList = cartItems.map(item => (
        <li key={item.id} className="cart-item">
            <img className='cart-photo' src={item.image} alt={item.name} />
            <div className='cart-data mx-3'>
                <div className='flex justify-between'>
                    <span className='text-xl mr-5 font-bold'>{item.name}</span>
                </div>
                <p className='text-yellow-400'>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </p>
                <div>
                    <span className='text-xs'>{item.desc}</span>
                </div>
                <div className="flex justify-around">
                    <button className='cart-quan' onClick={() => decreaseQuantity(item.id, item.quantity)}>
                        <FontAwesomeIcon icon={faCircleMinus} />
                    </button>
                    <span>{item.quantity}</span>
                    <button className='cart-quan' onClick={() => increaseQuantity(item.id, item.quantity)}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </button>
                    <span className='ml-5 font-bold'> ${item.price.toFixed(2)}</span>
                </div>
            </div>
            <button className='cart-remove' onClick={() => removeItem(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    ));

    return (
        <div className="cart">
            <div className="cart-header">
                <h2 className='cart-title'>Mi Carrito</h2>
                <button className='cart-exit' onClick={cerrar} >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div> 
            {cartItems.length === 0 ? (
                <h4 className="cart-empty">No hay artículos en el carrito.</h4>
            ):(
                <>
                    <ul id="cart-items">{cartList}</ul>
                    <div className='flex justify-between'>
                        <p>Envio:</p>
                        <span>$0.00</span>
                    </div>
                    <div className='flex justify-between'>
                        <p>IVA:</p>
                        <span>$0.00</span>
                    </div>
                    <div className='cart-total flex justify-between py-2'>
                        <p>Total:</p>
                        <span className='font-bold'>${total}</span>
                    </div>
                </>
            )}
            <button id="cart-mas">Comprar</button>
        </div>
    );
}

export default Carrito;