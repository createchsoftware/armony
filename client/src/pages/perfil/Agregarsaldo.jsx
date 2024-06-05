import { useEffect, useState } from 'react'
// import TarjetasPago from '../../components/ui/Tarjetas_de_pago';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../../components/ui/Navbar'
import InforTarjeta from '../../components/ui/InfoTarjeta';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';

function AgregarSaldo(){
    const [sTarjeta, setsTarjeta] = useState({});
    const [array, setArray] = useState([]);
    const [array_toShow, setArray_toShow] = useState([]);
    const [monto_a_recargar, setMonto] = useState('0.0');
    const [addTarjeta, setAddTarjeta] = useState(false);
    const [isSelected, setIsSelecetd] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [ticket, setTicket] = useState(false);

    function ModificarArray(number){

        // cambiar el arreglo que se presenta en pantalla
        setArray_toShow(
            array.map(tarjeta=> {

                if(tarjeta.numero_tarjeta === number){
                    tarjeta.predeterminada = 1;
                }
                else{
                    tarjeta.predeterminada = 0;
                }

                return tarjeta;
            })
        )
    }

    useEffect(()=>{
        fetch("/api/tarjetas/1.5")
           .then(response=> response.json())
           .then(data => {
              if(data.array){
                setArray(data.array);
                setArray_toShow(data.array);

                let tp = data.array.find(tarjeta=> tarjeta.predeterminada == 1);
                setsTarjeta(tp);
              }
           })
           .catch(error=>{
               console.log(error);
           });
     },[])

    useEffect(()=>{
        if(sTarjeta && Object.keys(sTarjeta).length != 0){
            ModificarArray(sTarjeta.numero_tarjeta);
        }
    },[sTarjeta]);

    useEffect(()=>{},[monto_a_recargar]);
    
    function obtenerValorEnTiempoReal(e){
        setMonto(e.target.value);
    }

    const handleSubmit = async(e)=>{
        
        e.preventDefault();        

        const respuesta = await fetch('/api/recargaSaldo',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                numero_tarjeta:sTarjeta.numero_tarjeta,
                monto:monto_a_recargar
            })
        })

        if(!respuesta.ok){
            console.log('hubo un problema en la conexion servidor-cliente')
        }

        const respuestaJson = await respuesta.json();


        if(respuestaJson.mensaje){
            console.log(respuestaJson.mensaje);
        }

        // if(respuestaJson.redirect){
        //     console.log('hola');
        //     window.location.href = respuestaJson.redirect;
        // }

        setConfirm(!confirm)
        setTicket(!ticket)
    }

    async function seleccionarTarjeta(tarjeta){
        setIsSelecetd(!isSelected);
        setsTarjeta(tarjeta);
        ModificarArray(sTarjeta.numero_tarjeta);
    }

    const tarjeta = array_toShow.map(tarjetas => (
        <div key={tarjetas.vista_tarjeta} className='flex px-10 py-2 items-center rounded-2xl my-3 shadow-md justify-between border border-gray-400'>
            <img src={`../../../pictures/${tarjetas.imagen}`}
                    alt={tarjetas.empresa} className='w-auto h-12' />
            <div className="flex items-center gap-4">
                <h1 className="text-xl truncate">{tarjetas.empresa}</h1>
                <h1 className="text-xl">{tarjetas.tipo}</h1>
                <h1 className="text-xl">****{tarjetas.numero_tarjeta.slice(0, 4)}</h1>
            </div>
            <div className='grid gap-2 p-2'>
                {isSelected ? (
                    <button onClick={()=> seleccionarTarjeta(tarjetas)} className='px-4 py-2 bg-[#036C65] rounded-full text-white duration-200 hover:bg-[#4bcdc4]'>Seleccionado</button>
                ):(
                    <button onClick={()=> seleccionarTarjeta(tarjetas)} className='px-4 py-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>Seleccionar</button>
                )}
            </div>
        </div>
    ))

    const toggleTarjeta = () => {
        setAddTarjeta(!addTarjeta);
    }

    const confirmar = () => {
        monto_a_recargar === null || monto_a_recargar === '' || monto_a_recargar === '0.0' || monto_a_recargar === 0.0 ?
        toast(<div>{`Favor de ingresar un monto a recargar.`}
            <FontAwesomeIcon icon={faCircleExclamation} className='text-red-700 ml-2'/>
        </div>)
        :
        setConfirm(!confirm)
    }

    const goMonedero = () => {
        window.location.href = '/perfil/monedero';
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <script src="../../scripts/index.js"></script>
                </Helmet>
            </HelmetProvider>
            <Navbar />
            <div className='grid w-1/2 rounded-2xl p-1 m-auto shadow-lg mt-24 mb-8 border-r border-l border-b border-[#036C65]'>
                <div className='px-5 py-2'>
                    <a
                        className="w-full text-sm items-center lg:text-base justify-self-start relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
                        aria-label="Volver"
                        href='/perfil/monedero'
                        >
                        <FontAwesomeIcon
                            style={{ fontSize: "22px" }}
                            icon={faAngleLeft}
                        />{" "}
                        Volver
                    </a>
                </div>
                <div className='grid px-8 pb-8'>
                    <h1 className='text-3xl justify-self-center my-2'>Recarga monedero</h1>
                    <img className='w-24 h-auto justify-self-center' src="../../../pictures/logoArmony.png" alt="" />
                    <label htmlFor="monto" className='my-6 text-2xl justify-self-center'>Monto de Recarga:</label>
                    <input
                        type="text"
                        name='monto'
                        id='monto'
                        minLength={1}
                        placeholder='0.0'
                        className='bg-[#036C65] text-white text-2xl text-center w-full rounded-2xl'
                        onChange={obtenerValorEnTiempoReal}
                    />
                    <h1 className='text-2xl my-4'>Métodos de pago:</h1>
                    <div className='rounded-xl shadow-md'>
                        <div className='h-8 bg-[#036C65] rounded-t-xl' />
                        <div className='py-4 px-10'>
                            { tarjeta }
                            <div className="flex px-10 py-2 rounded-2xl items-center my-3 shadow-md justify-between border border-gray-400">
                                <svg className='w-auto h-12' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 459.669 459.669" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> <g> <g>
                                        <path d="M404.723,76.087H54.948C24.649,76.087,0,100.735,0,131.035v197.599c0,30.298,24.649,54.948,54.948,54.948h349.774 c30.298,0,54.947-24.65,54.947-54.948V131.035C459.67,100.735,435.021,76.087,404.723,76.087z M429.267,328.633 c0,13.534-11.011,24.544-24.544,24.544H54.948c-13.534,0-24.545-11.01-24.545-24.544V196.214h398.863L429.267,328.633 L429.267,328.633z M429.267,152.839l-398.863,0.029v-21.834c0-13.534,11.011-24.545,24.545-24.545h349.774 c13.533,0,24.544,11.011,24.544,24.545V152.839z"></path>
                                        <path d="M68.136,324.98h83.23c2.98,0,5.398-2.416,5.398-5.396v-16.421c0-2.981-2.418-5.397-5.398-5.397h-83.23 c-2.981,0-5.398,2.416-5.398,5.397v16.421C62.737,322.564,65.154,324.98,68.136,324.98z"></path>
                                        <path d="M337.963,324.98h24.756c14.288,0,25.87-11.582,25.87-25.869v-24.756c0-14.287-11.582-25.869-25.87-25.869h-24.756 c-14.287,0-25.869,11.582-25.869,25.869v24.756C312.094,313.398,323.676,324.98,337.963,324.98z"></path> </g> </g>
                                    </g>
                                </svg>
                                <h1 className="text-xl">Nueva tarjeta de crédito</h1>
                                <button onClick={toggleTarjeta} className='px-4 py-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>Seleccionar</button>
                            </div>
                            <div className="flex px-10 py-2 rounded-2xl items-center my-3 shadow-md justify-between border border-gray-400">
                                <svg className="w-auto h-12" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 442.979 442.979" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g>
                                        <path d="M327.93,139.923H33.462C14.982,139.923,0,154.904,0,173.384v166.355c0,18.481,14.981,33.462,33.462,33.462h294.47 c18.479,0,33.461-14.98,33.461-33.462V173.384C361.393,154.904,346.41,139.923,327.93,139.923z M53.441,210.654 c0-11.284,9.147-20.432,20.432-20.432h19.553c11.284,0,20.432,9.147,20.432,20.432v19.553c0,11.284-9.147,20.432-20.432,20.432 H73.873c-11.284,0-20.432-9.147-20.432-20.432V210.654z M154.241,319.293c0,3.159-2.561,5.719-5.719,5.719H60.341 c-3.158,0-5.72-2.561-5.72-5.719v-17.398c0-3.158,2.562-5.719,5.72-5.719h88.182c3.158,0,5.719,2.561,5.719,5.719L154.241,319.293 L154.241,319.293z M306.77,319.293c0,3.159-2.562,5.719-5.721,5.719h-88.18c-3.158,0-5.72-2.561-5.72-5.719v-17.398 c0-3.158,2.562-5.719,5.72-5.719h88.18c3.158,0,5.721,2.561,5.721,5.719V319.293z"></path>
                                        <path d="M409.516,69.777H115.048c-18.48,0-33.462,14.981-33.462,33.462v9.04h246.346c33.691,0,61.104,27.412,61.104,61.105v25.874 h53.943v-96.019C442.979,84.758,427.996,69.777,409.516,69.777z"></path>
                                        <path d="M389.035,303.057h20.48c18.48,0,33.463-14.981,33.463-33.463v-37.16h-53.943V303.057z"></path> </g> </g>
                                    </g>
                                </svg>
                                <h1 className="text-xl">Nueva tarjeta de débito</h1>
                                <button onClick={toggleTarjeta} className='px-4 py-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>Seleccionar</button>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={confirmar}
                        className='w-1/3 justify-self-center mt-4 px-4 py-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>
                        Confirmar
                    </button>
                </div>
                <ToastContainer position={'bottom-right'} theme={'light'} />
            </div>
            {addTarjeta && (
                <div className='soon-fondo'>
                    <div className='soon-fx'>
                        <InforTarjeta cerrarInfo={toggleTarjeta} />
                    </div>
                </div>
            )}
            {confirm && (
                <div className='cart-fondo'>
                    <div className='cart-fx'>
                        <div className='grid mt-60 w-1/3 bg-white rounded-2xl p-6 m-auto'>
                            <h1 className='text-[#EB5765] text-2xl mb-8 justify-self-center text-center'>¿Estás segura?</h1>
                            <h1 className='mb-8 justify-self-center text-center'>Da click es aceptar si deseas continuar con la compra.</h1>
                            <button onClick={handleSubmit} className='px-4 py-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>Aceptar</button>
                        </div>
                    </div>
                </div>
            )}
            {ticket && (
                <div className='cart-fondo'>
                    <div className='cart-fx'>
                        <div className='grid mt-60 w-1/3 bg-white rounded-2xl p-8 m-auto'>
                            <h1 className='text-[#EB5765] text-2xl mb-4 justify-self-center text-center'>¡Recarga exitosa!</h1>
                            <img src="../../../pictures/logoArmony.png" className='justify-self-center w-1/4 h-auto mb-4' alt="" />
                            <div className='mb-4'>
                                <div className='flex justify-between'>
                                    <h1>Total</h1>
                                    <p> . . . . . . . . . . . . </p>
                                    <h1>${parseFloat(monto_a_recargar).toFixed(2)}</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Tarjeta</h1>
                                    <p> . . . . . . . . . . . . </p>
                                    <h1>412309359815</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Fecha</h1>
                                    <p> . . . . . . . . . . . . </p>
                                    <h1>08/05/2024</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Hora</h1>
                                    <p> . . . . . . . . . . . . </p>
                                    <h1>10:10 a.m.</h1>
                                </div>
                            </div>
                            <button onClick={goMonedero} className='w-1/3 justify-self-center px-4 py-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>Regresar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AgregarSaldo;