import { useState, useEffect } from "react";


function PagoRealizado({ cerrarPago, total, next }) {

    // const total = localStorage.getItem('total')
    const [cargando, setCargando] = useState(true)
    const [cliente, setCliente] = useState(null)


    const handleClick = () => {
        cerrarPago();
        next();
    };




    useEffect(() => {
        const fetchCliente = async () => {
            const storedCliente = localStorage.getItem('cliente');
            if (storedCliente) {
                try {
                    const parsedCliente = JSON.parse(storedCliente);
                    const { ID, Nombre, telefono, monedero } = parsedCliente;
                    setCliente({ ID, Nombre, telefono, monedero });
                } catch (error) {
                    console.error("Error al parsear el cliente:", error);
                }
            } else {
                console.error("No se encontró el cliente en localStorage");
            }
        };

        fetchCliente();
    }, []);

    useEffect(() => {//cuando se muestre el popup se realizara la venta y en consecuente la cita
        //se hara de esta forma para poderlo adaptar al uso de una api para cobrar
        const realizarVentaSus = async () => {
            if (cliente) {
                let card;
                let money;
        
                    if(Number(localStorage.getItem('monedero'))>0){
                      money=1
                      card=null;
                    }
                    else if(localStorage.getItem('tarjeta')!==null){
                      card=localStorage.getItem('tarjeta')
                      money=0;
                    }
                try {
                    const responseVenta = await fetch("/api/admin/ventas/createVentaSus", {
                        method: "POST",
                        body: JSON.stringify({
                            idCliente: cliente.ID,
                            tarjeta: card,
                            monedero: money
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!responseVenta.ok) {
                        throw new Error('Error en la respuesta de la red');
                    }

                    const dataVenta = await responseVenta.json();
                    console.log('Respuesta de la venta:', dataVenta);

                    setCargando(false);
                } catch (error) {
                    console.error('Error en la venta suscripcion:', error);
                    setCargando(false);
                }
            }
        };

        realizarVentaSus();
    }, [cliente]);



    // const horaActual = () => {
    //     let now = new Date();

    //     let hours = now.getHours();
    //     let minutes = now.getMinutes();
    //     let seconds = now.getSeconds();
    //     minutes = minutes < 10 ? "0" + minutes : minutes;
    //     seconds = seconds < 10 ? "0" + seconds : seconds;

    //     return `${hours}:${minutes}:${seconds}`;
    // };


    return (
        <>
            <div className="w-1/3 bg-white shadow-md rounded-xl">
                <div className="grid bg-[rgb(3,109,99)] rounded-t-xl">
                    <h3 className="px-6 py-2 text-2xl font-bold text-white justify-self-center">
                        Métodos de pago
                    </h3>
                </div>
                <div className="p-8 px-10 duration-200">
                    {cargando ? (
                        <div className="grid">
                            <h4 className="text-xl font-bold justify-self-center">
                                Ingresa la tarjeta
                            </h4>
                            <svg
                                className="w-36 justify-self-center"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        fill="#7F8499"
                                        d="M494.345,61.793H17.655C7.905,61.793,0,69.697,0,79.448v70.621c0,9.75,7.905,17.655,17.655,17.655 h61.792h353.106h61.792c9.75,0,17.655-7.905,17.655-17.655V79.448C512,69.697,504.095,61.793,494.345,61.793z"
                                    ></path>
                                    <path
                                        fill="#464655"
                                        d="M459.034,123.586H52.966c-4.875,0-8.828-3.953-8.828-8.828l0,0c0-4.875,3.953-8.828,8.828-8.828 h406.069c4.875,0,8.828,3.953,8.828,8.828l0,0C467.862,119.634,463.91,123.586,459.034,123.586z"
                                    ></path>
                                    <path
                                        fill="#00C3FF"
                                        d="M79.448,105.931v317.793c0,14.626,11.857,26.483,26.483,26.483h300.138 c14.626,0,26.483-11.857,26.483-26.483V105.931H79.448z"
                                    ></path>
                                    <g>
                                        <path
                                            fill="#AFB9D2"
                                            d="M189.793,216.276c-4.879,0-8.828-3.953-8.828-8.828v-22.069c0-4.875,3.948-8.828,8.828-8.828 c4.879,0,8.828,3.953,8.828,8.828v22.069C198.621,212.323,194.673,216.276,189.793,216.276z"
                                        ></path>
                                        <path
                                            fill="#AFB9D2"
                                            d="M189.793,282.483c-4.879,0-8.828-3.953-8.828-8.828v-22.069c0-4.875,3.948-8.828,8.828-8.828 c4.879,0,8.828,3.953,8.828,8.828v22.069C198.621,278.53,194.673,282.483,189.793,282.483z"
                                        ></path>
                                    </g>
                                    <g>
                                        <path
                                            fill="#C7CFE2"
                                            d="M229.517,291.31c-4.879,0-8.828-3.953-8.828-8.828v-79.448c0-4.875,3.948-8.828,8.828-8.828 s8.828,3.953,8.828,8.828v79.448C238.345,287.358,234.397,291.31,229.517,291.31z"
                                        ></path>
                                        <path
                                            fill="#C7CFE2"
                                            d="M229.517,406.069c-4.879,0-8.828-3.953-8.828-8.828v-79.448c0-4.875,3.948-8.828,8.828-8.828 s8.828,3.953,8.828,8.828v79.448C238.345,402.116,234.397,406.069,229.517,406.069z"
                                        ></path>
                                    </g>
                                    <circle
                                        fill="#FFDC64"
                                        cx="335.448"
                                        cy="353.103"
                                        r="44.138"
                                    ></circle>
                                    <circle
                                        fill="#FF5050"
                                        cx="335.448"
                                        cy="291.31"
                                        r="44.138"
                                    ></circle>
                                    <rect
                                        x="79.448"
                                        y="105.931"
                                        fill="#00AAF0"
                                        width="353.103"
                                        height="17.655"
                                    ></rect>
                                    <path
                                        fill="#FF8C5A"
                                        d="M335.448,308.966c-12.334,0-23.459,5.084-31.469,13.241c8.009,8.158,19.134,13.241,31.469,13.241 c12.335,0,23.459-5.084,31.469-13.241C358.908,314.049,347.783,308.966,335.448,308.966z"
                                    ></path>
                                    <g>
                                        <path
                                            fill="#C7CFE2"
                                            d="M220.69,105.931v61.793c0,4.875,3.948,8.828,8.828,8.828s8.828-3.953,8.828-8.828v-61.793H220.69z"
                                        ></path>
                                        <path
                                            fill="#C7CFE2"
                                            d="M141.241,105.931v61.793c0,4.875,3.948,8.828,8.828,8.828c4.879,0,8.828-3.953,8.828-8.828v-61.793 H141.241z"
                                        ></path>
                                    </g>
                                    <g>
                                        <rect
                                            x="141.241"
                                            y="105.931"
                                            fill="#AFB9D2"
                                            width="17.655"
                                            height="17.655"
                                        ></rect>
                                        <rect
                                            x="220.69"
                                            y="105.931"
                                            fill="#AFB9D2"
                                            width="17.655"
                                            height="17.655"
                                        ></rect>
                                    </g>
                                </g>
                            </svg>
                            <div className="grid py-6 border-2 shadow-md rounded-xl border-gray">
                                <h3 className="text-xl font-bold justify-self-center">
                                    Realizando pago
                                </h3>
                                <div className="mt-4 loader justify-self-center" />
                            </div>
                        </div>
                    ) : (
                        <div className="grid">
                            <h4 className="mb-4 text-xl font-bold justify-self-center">
                                ¡Pago exitoso!
                            </h4>
                            <div className="grid border-2 shadow-md rounded-xl border-gray">
                                <svg
                                    className="w-36 justify-self-center"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512"
                                    xmlSpace="preserve"
                                    fill="#000000"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            fill="#7F8499"
                                            d="M494.345,61.793H17.655C7.905,61.793,0,69.697,0,79.448v70.621c0,9.75,7.905,17.655,17.655,17.655 h61.792h353.106h61.792c9.75,0,17.655-7.905,17.655-17.655V79.448C512,69.697,504.095,61.793,494.345,61.793z"
                                        ></path>
                                        <path
                                            fill="#464655"
                                            d="M459.034,123.586H52.966c-4.875,0-8.828-3.953-8.828-8.828l0,0c0-4.875,3.953-8.828,8.828-8.828 h406.069c4.875,0,8.828,3.953,8.828,8.828l0,0C467.862,119.634,463.91,123.586,459.034,123.586z"
                                        ></path>
                                        <path
                                            fill="#00C3FF"
                                            d="M79.448,105.931v317.793c0,14.626,11.857,26.483,26.483,26.483h300.138 c14.626,0,26.483-11.857,26.483-26.483V105.931H79.448z"
                                        ></path>
                                        <g>
                                            <path
                                                fill="#AFB9D2"
                                                d="M189.793,216.276c-4.879,0-8.828-3.953-8.828-8.828v-22.069c0-4.875,3.948-8.828,8.828-8.828 c4.879,0,8.828,3.953,8.828,8.828v22.069C198.621,212.323,194.673,216.276,189.793,216.276z"
                                            ></path>
                                            <path
                                                fill="#AFB9D2"
                                                d="M189.793,282.483c-4.879,0-8.828-3.953-8.828-8.828v-22.069c0-4.875,3.948-8.828,8.828-8.828 c4.879,0,8.828,3.953,8.828,8.828v22.069C198.621,278.53,194.673,282.483,189.793,282.483z"
                                            ></path>
                                        </g>
                                        <g>
                                            <path
                                                fill="#C7CFE2"
                                                d="M229.517,291.31c-4.879,0-8.828-3.953-8.828-8.828v-79.448c0-4.875,3.948-8.828,8.828-8.828 s8.828,3.953,8.828,8.828v79.448C238.345,287.358,234.397,291.31,229.517,291.31z"
                                            ></path>
                                            <path
                                                fill="#C7CFE2"
                                                d="M229.517,406.069c-4.879,0-8.828-3.953-8.828-8.828v-79.448c0-4.875,3.948-8.828,8.828-8.828 s8.828,3.953,8.828,8.828v79.448C238.345,402.116,234.397,406.069,229.517,406.069z"
                                            ></path>
                                        </g>
                                        <circle
                                            fill="#FFDC64"
                                            cx="335.448"
                                            cy="353.103"
                                            r="44.138"
                                        ></circle>
                                        <circle
                                            fill="#FF5050"
                                            cx="335.448"
                                            cy="291.31"
                                            r="44.138"
                                        ></circle>
                                        <rect
                                            x="79.448"
                                            y="105.931"
                                            fill="#00AAF0"
                                            width="353.103"
                                            height="17.655"
                                        ></rect>
                                        <path
                                            fill="#FF8C5A"
                                            d="M335.448,308.966c-12.334,0-23.459,5.084-31.469,13.241c8.009,8.158,19.134,13.241,31.469,13.241 c12.335,0,23.459-5.084,31.469-13.241C358.908,314.049,347.783,308.966,335.448,308.966z"
                                        ></path>
                                        <g>
                                            <path
                                                fill="#C7CFE2"
                                                d="M220.69,105.931v61.793c0,4.875,3.948,8.828,8.828,8.828s8.828-3.953,8.828-8.828v-61.793H220.69z"
                                            ></path>
                                            <path
                                                fill="#C7CFE2"
                                                d="M141.241,105.931v61.793c0,4.875,3.948,8.828,8.828,8.828c4.879,0,8.828-3.953,8.828-8.828v-61.793 H141.241z"
                                            ></path>
                                        </g>
                                        <g>
                                            <rect
                                                x="141.241"
                                                y="105.931"
                                                fill="#AFB9D2"
                                                width="17.655"
                                                height="17.655"
                                            ></rect>
                                            <rect
                                                x="220.69"
                                                y="105.931"
                                                fill="#AFB9D2"
                                                width="17.655"
                                                height="17.655"
                                            ></rect>
                                        </g>
                                    </g>
                                </svg>
                                <svg
                                    viewBox="0 0 64 64"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="w-20 iconify iconify--emojione justify-self-center"
                                    preserveAspectRatio="xMidYMid meet"
                                    fill="#000000"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <circle cx="32" cy="32" r="30" fill="#4bd37b"></circle>
                                        <path
                                            fill="#ffffff"
                                            d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z"
                                        ></path>
                                    </g>
                                </svg>
                                <span className="my-6 text-xl font-bold justify-self-center">
                                    Monto: ${total}
                                </span>
                            </div>
                            <div className="grid">
                                <button
                                    onClick={handleClick}
                                    className="bg-[#ec5766] justify-self-center mt-6 text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PagoRealizado;
