import { Helmet, HelmetProvider } from "react-helmet-async";
import LayoutPrincipal from "../layouts/LayoutPrincipal";
import { useEffect, useState } from "react";
import PopupLogin from "../components/ui/Login/PopupLogin";

const Suscripcion = () => {
    const [log, setLog] = useState(false); //<<< PARA EL INICIO DE SESION
    const [login, setLogin] = useState(false);
    const [clave, setClave] = useState(false);
    const [sus, setSus] = useState(false); //<<< CARACTERISTICA GRAFICA DE QUE EL USUARIO ES SOCIO

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
            setClave(respuestaJson.clave);
        } else {
            setLog(false);
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

    const handleCompra = () => {
        window.location.href = "/suscripcion/compra";
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <script src="../../scripts/index.js"></script>
                </Helmet>
            </HelmetProvider>
            <LayoutPrincipal>
                <div className="flex bg-gradient-to-bl from-[#FED4CE] to-[#FF9D90] h-screen p-20">
                    <div className="grid w-3/5 items-center content-center pr-6">
                        <h1 className="font-[ILoveGlitter] text-white text-center text-7xl font-bold justify-self-center drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-[gray]">Conviértete en socio de armony</h1>
                        <p className="text-4xl text-center text-white justify-self-center mt-4 drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[gray]">Conoce los beneficios que nuestra suscripción tiene para ti</p>
                    </div>
                    <div className="grid w-2/5 items-center">
                        <img className="justify-self-center drop-shadow-[5px_5px_var(--tw-shadow-color)] shadow-[gray] pr-6" src="../../pictures/tarjetaSuscripcion.png" alt="Suscripción para socios." />
                    </div>
                    <div className="deg"></div>
                </div>
                <div className="grid h-max p-10 px-16">
                    <h1 className="font-[ILoveGlitter] py-12 px-20 justify-self-center text-6xl text-center text-[#036C65]">No te pierdas de los beneficios exclusivos de nuestra membresía</h1>
                    <div className='grid border-4 min-h-max border-[#A93F74] rounded-[30px]'>
                        <div className="grid justify-center h-max grid-cols-2 gap-4 p-10 border-[1rem] border-[#F584A7] rounded-3xl place-content-center md:grid-cols-1 md:gap-8 md:place-content-start ">
                            <div className="grid w-full m-auto md:col-span-2">
                                <img className='rounded-2xl w-48 justify-self-center duration-200 hover:w-52' src="../../pictures/tarjetaSuscripcion.png" alt="Tarjeta de suscripción." />
                            </div>
                            <h1 className="col-span-2 font-bold text-3xl text-center text-[#F584A7] drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[#A93F74] ">Suscripción de socio</h1>
                            <div className="grid h-max gap-1 text-center divide-black divide- md:gap-4 md:col-span-2">
                                <p className='bg-[#616C8926] py-4 text-2xl rounded-xl border-2 border-[#A93F74] duration-200 hover:border-[#F584A7] hover:font-bold'>$199 MXN/mes</p>
                                {/* <p className="text-xl">Válido para 4 personas</p>
                                <hr className="border-2 border-gray-500 w-[80%] justify-self-center" /> */}
                                <p className="text-xl">Invitaciones a eventos VIP de élite</p>
                                <hr className="border-2 border-gray-500 w-[80%] justify-self-center" />
                                <p className="text-xl">Acceso anticipado a ventas exclusivas</p>
                                <hr className="border-2 border-gray-500 w-[80%] justify-self-center" />
                                <p className="text-xl">Contenido premiun ilimitado</p>
                                <hr className="border-2 border-gray-500 w-[80%] justify-self-center" />
                                <p className="text-xl">Acceso a todos los servicios de nuestro spa</p>
                                <hr className="border-2 border-gray-500 w-[80%] justify-self-center" />
                                <p className="text-xl">10% de descuento adicional, al momento de realizar compras mayores a $3,000</p>
                                <hr className="border-2 border-gray-500 w-[80%] justify-self-center" />
                                <p className="text-xl">Paquete anual de regalo exclusivo para socios</p>
                            </div>
                        </div>
                    </div>
                    { log ? (
                        <button
                            onClick={handleCompra}
                            //disabled={sus === true}
                            className={
                                sus ? 
                                'justify-self-center text-2xl border-2 border-[#ec5766] bg-white p-2 px-8 text-[#ec5766] mx-6 rounded-xl mt-6 duration-200 hover:font-bold hover:border-[#ffb5a7] hover:text-[#ffb5a7]'
                                : 
                                'justify-self-center text-2xl bg-[#ec5766] p-2 px-8 text-white mx-6 rounded-xl mt-6 duration-200 hover:bg-[#ffb5a7]'}
                        >
                            {sus ? 'Renovar':'Comprar'}
                        </button>
                    ):(
                        <button onClick={() => setLogin(!login)} className='justify-self-center text-2xl bg-[#ec5766] p-2 px-8 text-white mx-6 rounded-xl mt-6 duration-200 hover:bg-[#ffb5a7]'>Comprar</button>
                    )}
                </div>
            </LayoutPrincipal>
            {login && <PopupLogin cerrar={() => setLogin(!login)} />}
        </>
    )
}

export default Suscripcion;