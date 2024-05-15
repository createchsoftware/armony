import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    fa1,
    fa2,
    fa3,
    fa4,
    faCircle,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from 'react'




function Monedero() {

    function toTarjetas(){
        window.location.href = '/perfil/tarjetas';
    }

    function toMovimientos(){
        window.location.href = '/perfil/movimientos';
    }

    function toAgregarSaldo(){
        window.location.href = '/perfil/monedero/agregarSaldo';
    }


    const [monedero, setMonedero] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(()=>{
        fetch("/api/monedero")
           .then(response=> response.json())
           .then(data => {
              if(data.data){
                  setNombre(data.data[0].nombre);
                  setMonedero(data.data[0].monedero);

                  
              }
           })
           .catch(error=>{
               console.log(error);
           });
     },[])



    return (
        <div>
            <h1>Monedero</h1>
            <p>Nombre {nombre}</p>
            <p>monedero {monedero}</p>

            <button onClick={toTarjetas}> Mis tarjetas</button>
            <button onClick={toMovimientos}> Movimientos</button>
            <button onClick={toAgregarSaldo}> Agregar saldo</button>
        </div>
    );
}

export default Monedero;