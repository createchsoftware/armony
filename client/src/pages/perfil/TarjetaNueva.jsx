import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
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

import TarjetasPagoEstatica from '../../components/ui/Tarjeta_de_pago_estaticas';
import {loadStripe} from '@stripe/stripe-js';
import { Fragment, useEffect, useState } from 'react';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';  //useStripe y useElements son hooks



//conectarnos a stripe
const  stripePromise = loadStripe('pk_test_51PEcWQRoGJ7uCBvZCsDZUCfTpVTLVBe3FlpjtjkVHjA2n31bLaiJ4Yce009pQLMkGnhnivE1H0BRDcV3BMnnZv2Q00hwzXsCBb');


const CheckoutForm = () =>{

  const stripe = useStripe();
  const elements = useElements();


const handleSubmit = async (e) =>{

    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type:'card',
      card:elements.getElement(CardElement)
    });

    if(!error){
      const {id, number, cvc, exp_month, exp_year} = paymentMethod;

      console.log(number);
      console.log(cvc);
      console.log(id);
    

      //paymentMethod es un objeto, dentro de ese objeto viene un id, que es el que debemos de enviar al backend
      const respuesta = await fetch('/api/tarjeta-nueva',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                id:id,
                numero_tarjeta:number,
                mes:exp_month,
                año:exp_year,
                titular:e.target.titular.value,
                tipo:e.target.tipo.value,
                principal:e.target.principal.value,
                recordar:e.target.recordar.value,
                cvc:cvc
            })
      })

      if(!respuesta.ok){
        console.log('hubo un problema en la comunicacion con back-front');
        return
      }

      const respuestaJson = respuesta.json();


      if(respuestaJson.redirect){
        window.location.href = respuestaJson.redirect;
      }

      if(respuestaJson.fallo){
        console.log('hubo un problema en el proceso de insercion');
      }

      if(respuestaJson.faltantes){
        console.log('tienes campos faltantes');
      }

      if(respuestaJson.invalidos){
        console.log('tienes campos invalidos');
      }

      

      console.log(data);

      elements.getElement(CardElement).clear()  // para limpiar el formulario de pago
     }
     else{
        console.log('hubo un error al comunicarse con la api de stripe');
     }
     

}

   


  return <form onSubmit={handleSubmit}>

    <label for='titular'>Titular de la tarjeta</label>
    <input type="text" id='titular' name='titular'/>

    <CardElement/>

    <label for="tipo">tipo</label>
    <input type="text" id='tipo' name='tipo' placeholder='debido/credito'/>

    <input type="checkbox" id='recordar' name='recordar'/>
    <label for="recordar">Recordar tarjeta</label>

    <input type="checkbox" id='principal' name='principal'/>
    <label for="principal">Poner como tarjeta principal</label>

    <button>
      agregar tarjeta
    </button>
  </form>
}


function TarjetaNueva() {


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

     console.log(array);  



  return (
   <>
      <div className='grid gap-2'>      
            { array.map((objeto) => (<TarjetasPagoEstatica tarjetas={objeto}/>)) }
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
   </>
  );
}

export default TarjetaNueva;