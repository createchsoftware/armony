import { useState, useEffect } from "react";
import InforTarjeta from "./InfoTarjeta";
import PagoRealizado from "./PagoRealizado";
import { IconoMasterCard, IconoVisa } from "./Iconos";
import { jwtDecode } from "jwt-decode";



function Pago({ producto }) {
    const [tarjeta, setTarjeta] = useState(false);
    const [pagoRealizado, setPagoRealizado] = useState(false);
    const [Uid, setUid] = useState(null)
    const [descuento, setDescuento] = useState('');

    const [cartItems, setCartItems] = useState(() => {
        if (producto) {
            // Si hay un producto en el prop, lo utilizamos
            return producto;
        } else {
            // Si no hay un producto en el prop, intentamos obtenerlo del localStorage
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        }
    });

    // const [tarjetas, setTarjetas] = useState([
    //     {id: 1, noTarjeta: "509612341234", tipo: "Débito", banco: "BANORTE", code: "****"},
    //     {id: 2, noTarjeta: "294712341234", tipo: "Débito", banco: "NU", code: "****"}
    // ]);

    const [tarjetas, setTarjetas] = useState([]);

    const totalProductos = cartItems.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    const cantidadProductos = cartItems.reduce((sum, producto) => sum + producto.cantidad, 0);
    const subTotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
    const ivaTotal = (parseFloat(subTotal) * 0.08).toFixed(2);
    const total = (parseFloat(subTotal) + parseFloat(ivaTotal)).toFixed(2);

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



    useEffect(() => {
        setTimeout(() => {
            fetch("/api/tarjetas/1.5")
                .then(response => response.json())
                .then(data => {
                    setTarjetas(data.array);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 500);
    }, [])

    const cliente = {};
    useEffect(() => {
        if (Uid) {
            fetch(`/api/admin/cliente/read/${Uid}`)
                .then(response => response.json())
                .then(data => {
                    cliente.idCliente = data.ID;
                    cliente.nombre = data.Nombre;
                    cliente.telefono = data.telefono;
                    cliente.direccion = data.Dirección;
                    cliente.email = data.email;
                    cliente.monedero = data.monedero;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [Uid]);

    const toggleTarjeta = () => {
        setTarjeta(!tarjeta);
    }
    const togglePago = () => {
        setPagoRealizado(!pagoRealizado);
    }
    // const datosRecibidos = (nuevaTarjeta) => {
    //     setTarjetas([...tarjetas, {id: 3, noTarjeta: {nuevaTarjeta}, tipo: "Débito", banco: "BBVA", code: "****"}]);
    //     console.log(tarjetas);
    // }

    //const total = (574).toFixed(2);

    const cardList = tarjetas.length > 0 ? (tarjetas.map(item => (
        <li key={item.id} className="flex items-center justify-between gap-4 px-4 mb-4 border-2 shadow-md rounded-3xl border-gray">
            {/* VVVVV Forma de "validar el bin" de una tarjeta */}
            {item.numero_tarjeta.charAt(0) === "5" ? (
                <IconoVisa />
            ) : (
                <IconoMasterCard />
            )}
            <h1 className="text-xl">{item.banco}</h1>
            <h1 className="text-xl">{item.tipo}</h1>
            <h1 className="text-xl">{item.code}</h1>
            <h1 className="text-xl">{item.numero_tarjeta.slice(0, 4)}</h1>
            <button onClick={togglePago} className='bg-[#ec5766] text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Continuar</button>
        </li>
    ))) : (<div></div>)
    return (
        <>
            <div className='flex justify-between mx-16'>
                {/* Bloque de ¿Cómo quieres pagar? */}
                <div className="rounded-xl shadow-md w-[55%] border-2 border-gray">
                    <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                        <p className='py-2 ml-8 text-2xl text-white'>¿Cómo quieres pagar?</p>
                    </div>
                    <div className='px-6 pt-6 overflow-y-auto'>
                        {cardList.length === 0 ? (
                            <>
                            </>
                        ) : (
                            <ul>
                                {cardList}
                            </ul>
                        )}
                        <ul>
                            <li className="flex items-center justify-between gap-4 px-4 mb-4 border-2 shadow-md rounded-3xl border-gray">
                                <svg className='w-16' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 459.669 459.669" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> <g> <g>
                                        <path d="M404.723,76.087H54.948C24.649,76.087,0,100.735,0,131.035v197.599c0,30.298,24.649,54.948,54.948,54.948h349.774 c30.298,0,54.947-24.65,54.947-54.948V131.035C459.67,100.735,435.021,76.087,404.723,76.087z M429.267,328.633 c0,13.534-11.011,24.544-24.544,24.544H54.948c-13.534,0-24.545-11.01-24.545-24.544V196.214h398.863L429.267,328.633 L429.267,328.633z M429.267,152.839l-398.863,0.029v-21.834c0-13.534,11.011-24.545,24.545-24.545h349.774 c13.533,0,24.544,11.011,24.544,24.545V152.839z"></path>
                                        <path d="M68.136,324.98h83.23c2.98,0,5.398-2.416,5.398-5.396v-16.421c0-2.981-2.418-5.397-5.398-5.397h-83.23 c-2.981,0-5.398,2.416-5.398,5.397v16.421C62.737,322.564,65.154,324.98,68.136,324.98z"></path>
                                        <path d="M337.963,324.98h24.756c14.288,0,25.87-11.582,25.87-25.869v-24.756c0-14.287-11.582-25.869-25.87-25.869h-24.756 c-14.287,0-25.869,11.582-25.869,25.869v24.756C312.094,313.398,323.676,324.98,337.963,324.98z"></path> </g> </g>
                                    </g>
                                </svg>
                                <h1 className="text-xl">Nueva tarjeta de crédito</h1>
                                <button onClick={toggleTarjeta} className='bg-[#ec5766] text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Continuar</button>
                            </li>
                            <li className="flex items-center justify-between gap-4 px-4 mb-4 border-2 shadow-md rounded-3xl border-gray">
                                <svg className="w-16" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 442.979 442.979" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g>
                                        <path d="M327.93,139.923H33.462C14.982,139.923,0,154.904,0,173.384v166.355c0,18.481,14.981,33.462,33.462,33.462h294.47 c18.479,0,33.461-14.98,33.461-33.462V173.384C361.393,154.904,346.41,139.923,327.93,139.923z M53.441,210.654 c0-11.284,9.147-20.432,20.432-20.432h19.553c11.284,0,20.432,9.147,20.432,20.432v19.553c0,11.284-9.147,20.432-20.432,20.432 H73.873c-11.284,0-20.432-9.147-20.432-20.432V210.654z M154.241,319.293c0,3.159-2.561,5.719-5.719,5.719H60.341 c-3.158,0-5.72-2.561-5.72-5.719v-17.398c0-3.158,2.562-5.719,5.72-5.719h88.182c3.158,0,5.719,2.561,5.719,5.719L154.241,319.293 L154.241,319.293z M306.77,319.293c0,3.159-2.562,5.719-5.721,5.719h-88.18c-3.158,0-5.72-2.561-5.72-5.719v-17.398 c0-3.158,2.562-5.719,5.72-5.719h88.18c3.158,0,5.721,2.561,5.721,5.719V319.293z"></path>
                                        <path d="M409.516,69.777H115.048c-18.48,0-33.462,14.981-33.462,33.462v9.04h246.346c33.691,0,61.104,27.412,61.104,61.105v25.874 h53.943v-96.019C442.979,84.758,427.996,69.777,409.516,69.777z"></path>
                                        <path d="M389.035,303.057h20.48c18.48,0,33.463-14.981,33.463-33.463v-37.16h-53.943V303.057z"></path> </g> </g>
                                    </g>
                                </svg>
                                <h1 className="text-xl">Nueva tarjeta de débito</h1>
                                <button onClick={toggleTarjeta} className='bg-[#ec5766] text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Continuar</button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Sección derecha */}
                <div className="w-[40%]">
                    {/* Bloque de resumen */}
                    <div className="border-2 shadow-md rounded-xl border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 ml-8 text-2xl text-white'>Pago</p>
                        </div>
                        <div className='px-6 pt-6'>
                            <div className='grid p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <div className='flex justify-between px-6'>
                                    <span className='font-bold'>{cantidadProductos} {cantidadProductos === 1 ? "producto" : "productos"}</span>
                                    <span className="text-[rgb(3,109,99)] font-bold text-xl">{totalProductos}</span>
                                </div>
                                <div className='flex justify-between px-6 pt-6'>
                                    <h1 className='font-bold'>Envío</h1>
                                    <span className="text-[rgb(3,109,99)] font-bold">$0.00</span>
                                </div>
                                <div className='flex justify-between px-6 pt-6'>
                                    <h1 className='font-bold'>IVA</h1>
                                    <span className="text-[rgb(3,109,99)] font-bold">{ivaTotal}</span>
                                </div>
                                <div className='flex justify-between px-6 pt-6'>
                                    <h1 className='font-bold'>Cupón</h1>
                                    <span className="text-[rgb(3,109,99)] font-bold">$0.00</span>
                                </div>
                            </div>
                            <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h4 className='text-xl font-bold'>Total:</h4>
                                <span className='font-bold text-[rgb(3,109,99)] text-xl'>${total}</span>
                            </div>
                        </div>
                    </div>
                    {/* Bloque "Aceptamos" */}
                    <div className="border-2 shadow-md rounded-xl border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 ml-8 text-2xl text-white'>Aceptamos</p>
                        </div>
                        <div className='flex justify-between px-6 pt-6'>
                            <svg className="w-28" viewBox="0 0 141.732 141.732" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <g fill="#2566af">
                                    <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"></path> </g>
                                    <path d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z" fill="#e6a540"></path>
                                    <path fill="none" d="M0 0h141.732v141.732H0z"></path>
                                </g>
                            </svg>
                            <svg className="w-28" viewBox="0 -54.25 482.51 482.51" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <title>mastercard</title> <g>
                                    <path d="M220.13,421.67V396.82c0-9.53-5.8-15.74-15.32-15.74-5,0-10.35,1.66-14.08,7-2.9-4.56-7-7-13.25-7a14.07,14.07,0,0,0-12,5.8v-5h-7.87v39.76h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78Zm129.22-39.35h-14.5v-12H327v12h-8.28v7H327V408c0,9.11,3.31,14.5,13.25,14.5A23.17,23.17,0,0,0,351,419.6l-2.49-7a13.63,13.63,0,0,1-7.46,2.07c-4.14,0-6.21-2.49-6.21-6.63V389h14.5v-6.63Zm73.72-1.24a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76h7.87V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-111.41,4.14c-4.14-2.9-9.94-4.14-16.15-4.14-9.94,0-16.15,4.56-16.15,12.43,0,6.63,4.56,10.35,13.25,11.6l4.14.41c4.56.83,7.46,2.49,7.46,4.56,0,2.9-3.31,5-9.53,5a21.84,21.84,0,0,1-13.25-4.14l-4.14,6.21c5.8,4.14,12.84,5,17,5,11.6,0,17.81-5.38,17.81-12.84,0-7-5-10.35-13.67-11.6l-4.14-.41c-3.73-.41-7-1.66-7-4.14,0-2.9,3.31-5,7.87-5,5,0,9.94,2.07,12.43,3.31Zm120.11,16.57c0,12,7.87,20.71,20.71,20.71,5.8,0,9.94-1.24,14.08-4.56l-4.14-6.21a16.74,16.74,0,0,1-10.35,3.73c-7,0-12.43-5.38-12.43-13.25S445,389,452.07,389a16.74,16.74,0,0,1,10.35,3.73l4.14-6.21c-4.14-3.31-8.28-4.56-14.08-4.56-12.43-.83-20.71,7.87-20.71,19.88h0Zm-55.5-20.71c-11.6,0-19.47,8.28-19.47,20.71s8.28,20.71,20.29,20.71a25.33,25.33,0,0,0,16.15-5.38l-4.14-5.8a19.79,19.79,0,0,1-11.6,4.14c-5.38,0-11.18-3.31-12-10.35h29.41v-3.31c0-12.43-7.46-20.71-18.64-20.71h0Zm-.41,7.46c5.8,0,9.94,3.73,10.35,9.94H364.68c1.24-5.8,5-9.94,11.18-9.94ZM268.59,401.79V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm306.08-20.71a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76H532V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-30.65,20.71V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm111.83,0V366.17h-7.87v20.71c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25C564.73,415.46,560.17,409.25,560.17,401.79Z" transform="translate(-132.74 -48.5)"></path>
                                    <g> <rect x="169.81" y="31.89" width="143.72" height="234.42" fill="#ff5f00"></rect>
                                        <path d="M317.05,197.6A149.5,149.5,0,0,1,373.79,80.39a149.1,149.1,0,1,0,0,234.42A149.5,149.5,0,0,1,317.05,197.6Z" transform="translate(-132.74 -48.5)" fill="#eb001b"></path>
                                        <path d="M615.26,197.6a148.95,148.95,0,0,1-241,117.21,149.43,149.43,0,0,0,0-234.42,148.95,148.95,0,0,1,241,117.21Z" transform="translate(-132.74 -48.5)" fill="#f79e1b"></path> </g> </g>
                                </g>
                            </svg>
                            <svg className="w-28" viewBox="0 -140 780 780" enableBackground="new 0 0 780 500" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"><rect width="780" height="500" fill="#2557D6"></rect>
                                    <path d="m0.253 235.69h37.441l8.442-19.51h18.9l8.42 19.51h73.668v-14.915l6.576 14.98h38.243l6.576-15.202v15.138h183.08l-0.085-32.026h3.542c2.479 0.083 3.204 0.302 3.204 4.226v27.8h94.689v-7.455c7.639 3.92 19.518 7.455 35.148 7.455h39.836l8.525-19.51h18.9l8.337 19.51h76.765v-18.532l11.626 18.532h61.515v-122.51h-60.88v14.468l-8.522-14.468h-62.471v14.468l-7.828-14.468h-84.38c-14.123 0-26.539 1.889-36.569 7.153v-7.153h-58.229v7.153c-6.383-5.426-15.079-7.153-24.75-7.153h-212.74l-14.274 31.641-14.659-31.641h-67.005v14.468l-7.362-14.468h-57.145l-26.539 58.246v64.261h3e-3zm236.34-17.67h-22.464l-0.083-68.794-31.775 68.793h-19.24l-31.858-68.854v68.854h-44.57l-8.42-19.592h-45.627l-8.505 19.592h-23.801l39.241-87.837h32.559l37.269 83.164v-83.164h35.766l28.678 59.587 26.344-59.587h36.485l1e-3 87.838zm-165.9-37.823l-14.998-35.017-14.915 35.017h29.913zm255.3 37.821h-73.203v-87.837h73.203v18.291h-51.289v15.833h50.06v18.005h-50.061v17.542h51.289l1e-3 18.166zm103.16-64.18c0 14.004-9.755 21.24-15.439 23.412 4.794 1.748 8.891 4.838 10.84 7.397 3.094 4.369 3.628 8.271 3.628 16.116v17.255h-22.104l-0.083-11.077c0-5.285 0.528-12.886-3.458-17.112-3.202-3.09-8.083-3.76-15.973-3.76h-23.523v31.95h-21.914v-87.838h50.401c11.199 0 19.451 0.283 26.535 4.207 6.933 3.924 11.09 9.652 11.09 19.45zm-27.699 13.042c-3.013 1.752-6.573 1.81-10.841 1.81h-26.62v-19.51h26.982c3.818 0 7.804 0.164 10.393 1.584 2.842 1.28 4.601 4.003 4.601 7.765 0 3.84-1.674 6.929-4.515 8.351zm62.844 51.138h-22.358v-87.837h22.358v87.837zm259.56 0h-31.053l-41.535-65.927v65.927h-44.628l-8.527-19.592h-45.521l-8.271 19.592h-25.648c-10.649 0-24.138-2.257-31.773-9.715-7.701-7.458-11.708-17.56-11.708-33.533 0-13.027 2.395-24.936 11.812-34.347 7.085-7.01 18.18-10.242 33.28-10.242h21.215v18.821h-20.771c-7.997 0-12.514 1.14-16.862 5.203-3.735 3.699-6.298 10.69-6.298 19.897 0 9.41 1.951 16.196 6.023 20.628 3.373 3.476 9.506 4.53 15.272 4.53h9.842l30.884-69.076h32.835l37.102 83.081v-83.08h33.366l38.519 61.174v-61.174h22.445v87.833zm-133.2-37.82l-15.165-35.017-15.081 35.017h30.246zm189.04 178.08c-5.322 7.457-15.694 11.238-29.736 11.238h-42.319v-18.84h42.147c4.181 0 7.106-0.527 8.868-2.175 1.665-1.474 2.605-3.554 2.591-5.729 0-2.561-1.064-4.593-2.677-5.811-1.59-1.342-3.904-1.95-7.722-1.95-20.574-0.67-46.244 0.608-46.244-27.194 0-12.742 8.443-26.156 31.439-26.156h43.649v-17.479h-40.557c-12.237 0-21.129 2.81-27.425 7.174v-7.175h-59.985c-9.595 0-20.854 2.279-26.179 7.175v-7.175h-107.12v7.175c-8.524-5.892-22.908-7.175-29.549-7.175h-70.656v7.175c-6.745-6.258-21.742-7.175-30.886-7.175h-79.077l-18.094 18.764-16.949-18.764h-118.13v122.59h115.9l18.646-19.062 17.565 19.062 71.442 0.061v-28.838h7.021c9.479 0.14 20.66-0.228 30.523-4.312v33.085h58.928v-31.952h2.842c3.628 0 3.985 0.144 3.985 3.615v28.333h179.01c11.364 0 23.244-2.786 29.824-7.845v7.845h56.78c11.815 0 23.354-1.587 32.134-5.649l2e-3 -22.84zm-354.94-47.155c0 24.406-19.005 29.445-38.159 29.445h-27.343v29.469h-42.591l-26.984-29.086-28.042 29.086h-86.802v-87.859h88.135l26.961 28.799 27.875-28.799h70.021c17.389 0 36.929 4.613 36.929 28.945zm-174.22 40.434h-53.878v-17.48h48.11v-17.926h-48.11v-15.974h54.939l23.969 25.604-25.03 25.776zm86.81 10.06l-33.644-35.789 33.644-34.65v70.439zm49.757-39.066h-28.318v-22.374h28.572c7.912 0 13.404 3.09 13.404 10.772 0 7.599-5.238 11.602-13.658 11.602zm148.36-40.373h73.138v18.17h-51.315v15.973h50.062v17.926h-50.062v17.48l51.314 0.08v18.23h-73.139l2e-3 -87.859zm-28.119 47.029c4.878 1.725 8.865 4.816 10.734 7.375 3.095 4.291 3.542 8.294 3.631 16.037v17.418h-22.002v-10.992c0-5.286 0.531-13.112-3.542-17.198-3.201-3.147-8.083-3.899-16.076-3.899h-23.42v32.09h-22.02v-87.859h50.594c11.093 0 19.173 0.47 26.366 4.146 6.915 4.004 11.266 9.487 11.266 19.511-1e-3 14.022-9.764 21.178-15.531 23.371zm-12.385-11.107c-2.932 1.667-6.556 1.811-10.818 1.811h-26.622v-19.732h26.982c3.902 0 7.807 0.08 10.458 1.587 2.84 1.423 4.538 4.146 4.538 7.903 0 3.758-1.699 6.786-4.538 8.431zm197.82 5.597c4.27 4.229 6.554 9.571 6.554 18.613 0 18.9-12.322 27.723-34.425 27.723h-42.68v-18.84h42.51c4.157 0 7.104-0.525 8.95-2.175 1.508-1.358 2.589-3.333 2.589-5.729 0-2.561-1.17-4.592-2.675-5.811-1.675-1.34-3.986-1.949-7.803-1.949-20.493-0.67-46.157 0.609-46.157-27.192 0-12.744 8.355-26.158 31.33-26.158h43.932v18.7h-40.198c-3.984 0-6.575 0.145-8.779 1.587-2.4 1.422-3.29 3.534-3.29 6.319 0 3.314 2.037 5.57 4.795 6.546 2.311 0.77 4.795 0.995 8.526 0.995l11.797 0.306c11.895 0.276 20.061 2.248 25.024 7.065zm86.955-23.52h-39.938c-3.986 0-6.638 0.144-8.867 1.587-2.312 1.423-3.202 3.534-3.202 6.322 0 3.314 1.951 5.568 4.791 6.544 2.312 0.771 4.795 0.996 8.444 0.996l11.878 0.304c11.983 0.284 19.982 2.258 24.86 7.072 0.891 0.67 1.422 1.422 2.033 2.175v-25h1e-3z" fill="#ffffff">
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {tarjeta && (
                <div className='soon-fondo'>
                    <div className='soon-fx'>
                        <InforTarjeta cerrarInfo={toggleTarjeta} sendDatos={datosRecibidos} />
                    </div>
                </div>
            )}
            {pagoRealizado && (
                <div className='soon-fondo'>
                    <div className='soon-fx'>
                        <PagoRealizado cerrarPago={togglePago} cliente={cliente} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Pago;