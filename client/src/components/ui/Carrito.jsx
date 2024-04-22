import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
function Carrito({cerrar}) {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Crema', price: 50.00, quantity: 1 , image: "../../../public/pictures/crema2.png" },
        { id: 2, name: 'Shampoo', price: 75.00, quantity: 1, image: "../../../public/pictures/crema1.png" }
    ]);
    //  ^^^ ES SOLO TEST PARA PROBAR LA FUNCIONALIDAD DEL POP-UP EMERGENTE DEL CARRITO.

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };
    const increaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };
    const decreaseQuantity = (itemId, itemQuan) => {
        if(itemQuan == 1){
            removeItem(itemId);
        }else{
            setCartItems(cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            ));
        }
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    // const totalItems = () => {
    //     cartItems.reduce((total, item) => total + item.quantity, 0);
    // };

    const cartList = cartItems.map(item => (
        <li key={item.id} className="cart-item">
            <img className='cart-photo' src={item.image} alt={item.name} />
            <div className='cart-data'>
                <div className='flex justify-between'>
                    <span className='mr-5'>{item.name}</span>
                    <span className='ml-5'> ${item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-around">
                    <button className='cart-quan' onClick={() => decreaseQuantity(item.id, item.quantity)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{item.quantity}</span>
                    <button className='cart-quan' onClick={() => increaseQuantity(item.id)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
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
                    {/* ^^^ FALTA HACER FUNCIONAL ESTE BOTON */}
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div> 
            {cartItems.length === 0 ? (
                <h4 className="cart-empty">No hay artículos en el carrito.</h4>
            ):(
                <>
                    <ul id="cart-items">{cartList}</ul>
                    <p>Total: <span>${total}</span></p>
                </>
            )}
            <button id="cart-mas">Ver Carrito</button>
        </div>
    );
}

export default Carrito;