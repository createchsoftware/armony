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


    async function EliminarTarjeta(Arreglo_de_datos) {
        console.log("Hiciste click");

        const respuesta = await fetch('/api/deleteCard', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Arreglo_de_datos)
        });

        if (!respuesta.ok) {
            console.log("UPPS!!, el servidor no respondio");
            return; // salir de la funcion lo antes posible
        }


        const respuestaJson = await respuesta.json();

        if (respuestaJson.exito) {
            console.log("tu tarjeta fue eliminada exitosamente");
            window.location.reload();
            //hay que actualizar el arreglo
        }

        if (respuestaJson.fallo) {
            console.log("Hubo un error a la hora de eliminar tu tarjeta");
        }

    }

    const [array, setArray] = useState([]);


    useEffect(() => {
        fetch("/api/tarjetas/1.5")
            .then(response => response.json())
            .then(data => {
                setArray(data.array);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    console.log(array);   //  <---------- los datos del backend aqui estan, los pueden ver en el navegador


    return (
        <>
            <LayoutPrincipal>
                <main className='grid gap-12 my-24'>
                    <section className='rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa"> <IoIosArrowBack className='' />
                            Volver</a>
                        <img className='w-32 m-auto my-6 -mt-24 rounded-full aspect-square' src="../../pictures/suscripcionCirculo.png" alt="" />
                        <div className='m-auto text-center '>
                            <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Tarjetas</h1>
                            <h2>Todas las tarjetas que hay registradas en tu cuenta</h2>
                        </div>
                    </section>

                    <section className='w-[60%] m-auto'>
                        <div className='grid gap-6'>

                            {
                                array.map((objeto) => (
                                    <TarjetasPago tarjetas={objeto} funcion={EliminarTarjeta} texto_btn={'Eliminar Tarjeta'}
                                    />))
                            }
                            <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
                                <hr />
                                <div className="flex justify-end w-full">
                                    <a onClick={null} href='/perfil/tarjetas/registroTarjeta' className='flex items-center justify-between gap-4 px-10 py-1 hover:cursor-pointer hover:underline'>
                                        <p className='text-[#056761] text-lg'>Agregar tarjeta</p>
                                        <svg viewBox="0 0 32.00 32.00" className='w-5 stroke-2' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSketch="http://www.bohemiancoding.com/sketch/ns" fill="#056761" transform="rotate(0)">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="2"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="2"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <title>plus-circle</title>
                                                <desc>Created with Sketch Beta.</desc>
                                                <defs></defs>
                                                <g id="Page-1" strokeWidth="2" fill="none" fillRule="evenodd" sketchType="MSPage">
                                                    <g id="Icon-Set" sketchType="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#056761">
                                                        <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle" sketchType="MSShapeGroup"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </a>


                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </LayoutPrincipal >
        </>

    );
}

export default Tarjetas;