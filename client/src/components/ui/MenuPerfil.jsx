import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPen, faBagShopping, faCalendarDays, faMoneyBill ,faClockRotateLeft, faCreditCard, faArrowRightFromBracket, faQrcode, faAngleLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from 'react';
//import QrCode from "react-qr-code";

// eslint-disable-next-line react/prop-types
function MenuPerfil() {
    <HelmetProvider>
        <Helmet>
            <script src="../../../scripts/logout.js"></script>
        </Helmet>
    </HelmetProvider>

    const [clave, setClave] = useState(false);
    const [sus, setSus] = useState(false);
    // const [qr, setQR] = useState(false);

    // var onImageDownload = () => {
    //     const svg = document.getElementById("QRCode");
    //     const svgData = new XMLSerializer().serializeToString(svg);
    //     const canvas = document.createElement("canvas");
    //     const ctx = canvas.getContext("2d");
    //     const img = new Image();
    //     img.onload = () => {
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         ctx.drawImage(img, 0, 0);
    //         const pngFile = canvas.toDataURL("image/png");
    //         const downloadLink = document.createElement("a");
    //         downloadLink.download = "QRCode";
    //         downloadLink.href = `${pngFile}`;
    //         downloadLink.click();
    //     };
    //     img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    // };

    async function recibido() {
        const respuesta = await fetch("/api/logueado", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!respuesta.ok) {
            setClave(false);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setClave(respuestaJson.clave);
        } else {
            setClave(false);
        }
    }

    useEffect(() => {
        recibido();
    }, []);
    useEffect(() => {
        
        const Prod = async () => {
            try {
                if (clave) {
    
                    const response = await fetch(`/api/admin/cliente/StatusSus/${clave}`)
                    const data = await response.json();
                    setSus(data)
                }
            } catch (error) {
                console.error("hubo error :", error)
            }
        }
        Prod()
    }, [clave])

    return (
        <div className="menu-perfil">
            <ul className="menu-nav-perfil">
                <li className="menu-item-perfil">
                    <a href="/perfil" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faUser} className='text-black' />
                        <p className='ml-5'>Mi perfil</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/editar-perfil" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faUserPen} className='text-black' />
                        <p className='ml-4'>Editar perfil</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/pedidos" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faBagShopping} className='text-black' />
                        <p className='ml-6'>Mis pedidos</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/agenda" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faCalendarDays} className='text-black' />
                        <p className='ml-5'>Agenda</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/monedero" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faMoneyBill} className='text-black' />
                        <p className='ml-5'>Monedero</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/movimientos" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faClockRotateLeft} className='text-black' />
                        <p className='ml-5'>Historial</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/tarjetas" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faCreditCard} className='text-black' />
                        <p className='ml-5'>Tarjetas</p>
                    </a>
                </li>
                {/* {sus && 
                    <li className="menu-item-perfil">
                        <a onClick={() => setQR(!qr)} className="menu-link-perfil">
                            <FontAwesomeIcon icon={faQrcode} className=' text-yellow-400' />
                            <p className='ml-5'>Código QR</p>
                        </a>
                    </li>
                } */}
                <li className="menu-item-perfil">
                    <a href="/api/logout" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-black' />
                        <p className='ml-5'><button id='close'>Cerrar sesión</button></p>
                    </a>
                </li>
            </ul>
            {/* {qr && 
                <div className='cart-fondo'>
                    <div className='cart-fx'>
                        <div className='grid mt-28 w-[40%] bg-white rounded-2xl m-auto gap-2'>
                            <div className="flex bg-[rgb(3,109,99)] rounded-t-xl items-center">
                                <button onClick={() => setQR(!qr)} className='flex w-max gap-1 items-center ml-6 text-white relative cursor-pointer before:bg-white before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold'>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                    <p className='ml-2'>Volver</p>
                                </button>
                                <div className="flex-glow"></div>
                                <p className="py-2 text-2xl text-white justify-self-center text-center absolute left-1/2 transform -translate-x-1/2">
                                    QR personal del socio
                                </p>
                            </div>
                            <h1 className="justify-self-center my-2">
                                ¡Entra a eventos exclusivos!
                            </h1>
                            <div className="justify-self-center w-max ring-4 ring-rose-200">
                                <QrCode
                                    id="QRCode"
                                    size={256}
                                    style={{
                                    height: "18rem",
                                    maxWidth: "100%",
                                    width: "18rem",
                                    padding: "10px",
                                    }}
                                    value="Soy socio :D"
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <div className="grid m-4 place-items-center">
                                <button
                                    onClick={onImageDownload}
                                    className="flex py-3 justify-center w-[10rem] h-[3rem] rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.8)] text-sm font-[ABeeZee]"
                                >
                                    Guardar QR
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{
                                            color: "#000000",
                                            fontSize: "20px",
                                            marginLeft: "0.5rem",
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            } */}
        </div>
    );
}

export default MenuPerfil;