import { Fragment, useEffect, useState } from 'react'
import TarjetasPago from '../../components/ui/Tarjetas_de_pago';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    fa1,
    fa2,
    fa3,
    fa4,
    faCircle,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";



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
        <div>
            Regarda del Monedero
        </div>
        <label for="monto">Monto de Recarga</label>
        <input type="text" name='monto' id='monto' placeholder='0.0' onChange={obtenerValorEnTiempoReal}/>
        <div>
            Metodos de pago:
        </div>
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
        <button onClick={handleSubmit}>
            Confirmar
        </button>
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