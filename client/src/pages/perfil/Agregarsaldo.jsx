import { useEffect, useState } from 'react'
import TarjetasPago from '../../components/ui/Tarjetas_de_pago';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../../components/ui/Navbar'

function AgregarSaldo(){
    const [sTarjeta, setsTarjeta] = useState({});
    const [array, setArray] = useState([]);
    const [array_toShow, setArray_toShow] = useState([]);
    const [monto_a_recargar, setMonto] = useState('0.0');


    async function seleccionarTarjeta(tarjeta){

        setsTarjeta(tarjeta);
        ModificarArray(sTarjeta.numero_tarjeta);

    }

    function ModificarArray(number){
        

        // cambiar el arreglo que se presenta en pantalla
        setArray_toShow(
            array.map(tarjeta=> {

                if(tarjeta.numero_tarjeta == number){
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






     useEffect(()=>{

     },[monto_a_recargar]);
    

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

        if(respuestaJson.redirect){
            console.log('hola');
            window.location.href = respuestaJson.redirect;
        }

    }

    return (
        <>
            <Navbar />
            <div className='grid w-1/2 rounded-2xl p-1 m-auto shadow-lg mt-24 border-2 border-[#036C65]'>
                <div className=''>
                    <a
                        className="w-full text-sm items-center lg:text-base ml-5 justify-self-start relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
                        aria-label="Volver"
                        >
                        <FontAwesomeIcon
                            style={{ fontSize: "22px" }}
                            icon={faAngleLeft}
                        />{" "}
                        Volver
                    </a>
                </div>
                <div className='grid p-4'>
                    <h1 className='text-3xl justify-self-center my-2'>Recarga monedero</h1>
                    <img className='w-24 h-auto justify-self-center' src="../../../pictures/logoArmony.png" alt="" />
                    <label htmlFor="monto" className='my-6 text-2xl justify-self-center'>Monto de Recarga:</label>
                    <input type="text" name='monto' id='monto' placeholder='0.0' className='bg-[#036C65] text-white text-2xl text-center w-full rounded-2xl' onChange={obtenerValorEnTiempoReal}/>
                    <h1 className='text-2xl my-4'>Metodos de pago:</h1>
                    <div className='rounded-xl shadow-md'>
                        <div className='h-5 bg-[#036C65] rounded-t-xl' />
                        <div className='p-3'>
                            {
                                array_toShow.map(objeto=>{

                                    if(objeto.predeterminada == 0){
                                        return <TarjetasPago tarjetas={objeto} funcion={seleccionarTarjeta} texto_btn={'seleccionar'}/>
                                    }
                                    else{
                                        return <TarjetasPago tarjetas={objeto} /> // no le mandamos la funcion
                                    }
                                })
                            }
                        </div>
                    </div>
                    <button onClick={handleSubmit}>
                        Confirmar
                    </button>
                </div>
            </div>
        </>
    );
}
// function AgregarSaldo() {
//     return(
//         <Elements stripe={stripePromise}>
//             <AddSaldo/>
//         </Elements>
//     );
    
// }

export default AgregarSaldo;