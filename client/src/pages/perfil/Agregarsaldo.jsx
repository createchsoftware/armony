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


function AgregarSaldo() {

    const [numeroTarjeta, setNumTarjeta] = useState('');
    const [array, setArray] = useState([]);
    const [array_toShow, setArray_toShow] = useState([]);
    const [monto_a_recargar, setMonto] = useState('0.0');


    async function RecargarSaldo(){

        console.log('iniciando proceso de recargar tu saldo');

        const respuesta = await fetch('/api/recargaSaldo',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                numero_tarjeta:numeroTarjeta,
                monto:monto_a_recargar
            })
        })


        if(!respuesta.ok){
            console.log("sucedio un error en la comunicacion back con front");
            return; // obligarlo a salir de la funcion
        }

        const respuestaJson = await respuesta.json();

        if(respuestaJson.exito){
            console.log('El proceso se logro con exito');
            window.location.reload();
        }

        if(respuestaJson.fallo){
            console.log('Hubo un error en el cobro');
        }
    }




    async function seleccionarTarjeta(tarjeta){

        setNumTarjeta(tarjeta.numero_tarjeta);
        ModificarArray(numeroTarjeta);

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
                setNumTarjeta(tp.numero_tarjeta);
              }
           })
           .catch(error=>{
               console.log(error);
           });
     },[])

     useEffect(()=>{
        if(numeroTarjeta != ''){
            ModificarArray(numeroTarjeta);
        }
     },[numeroTarjeta]);






     useEffect(()=>{

     },[monto_a_recargar]);
    

     function obtenerValorEnTiempoReal(e){
        setMonto(e.target.value);
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
        <button onClick={RecargarSaldo}>
            Confirmar
        </button>
        </>
    );
}

export default AgregarSaldo;