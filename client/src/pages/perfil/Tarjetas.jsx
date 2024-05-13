import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
//import { products } from '../../data/productos.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    fa1,
    fa2,
    fa3,
    fa4,
    faCircle,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import TarjetasPago from '../../components/ui/Tarjetas_de_pago';

function Tarjetas() {


    async function EliminarTarjeta(Arreglo_de_datos){
        console.log("Hiciste click");

        const respuesta = await fetch('/api/deleteCard',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(Arreglo_de_datos)
        });

        if(!respuesta.ok){
            console.log("UPPS!!, el servidor no respondio");
            return; // salir de la funcion lo antes posible
        }
            

        const respuestaJson = await respuesta.json();

        if(respuestaJson.exito){
            console.log("tu tarjeta fue eliminada exitosamente");
            window.location.reload();
            //hay que actualizar el arreglo
        }

        if(respuestaJson.fallo){
            console.log("Hubo un error a la hora de eliminar tu tarjeta");
        }
    
    }

    const [array, setArray] = useState([]);


    useEffect(()=>{
        fetch("/api/tarjetas/1.5")
           .then(response=> response.json())
           .then(data => {
                setArray(data.array);
           })
           .catch(error=>{
               console.log(error);
           });
     },[])

     console.log(array);   //  <---------- los datos del backend aqui estan, los pueden ver en el navegador


    return (
        <>
            <div className='grid gap-6'>
                    
                    {
                    array.map((objeto) => (

                        <TarjetasPago tarjetas={objeto} eliminarTarjeta={EliminarTarjeta}
                        />))
                    }

                </div>
        </>
        
    );
}

export default Tarjetas;