import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { useEffect, useState } from 'react'
//import { products } from '../../data/productos.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {
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
                        <a href="/perfil" className='flex w-max items-center ml-6 text-black relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold'>
                            <FontAwesomeIcon icon={faAngleLeft} />
                            <p className='ml-2'>Volver</p>
                        </a>
                        <div className='w-32 m-auto my-6 -mt-24 rounded-full aspect-square place-content-center shadow-lg bg-white'>
                            <div className=' w-[85%] bg-[#AAE0FF] rounded-full aspect-square m-auto place-content-center'>
                                <img className='m-auto w-[65%]' src="../../pictures/tarjetas.png" alt="" />
                            </div>
                        </div>
                        <div className='m-auto text-center '>
                            <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Tarjetas</h1>
                            <h2>Todas las tarjetas que hay registradas en tu cuenta</h2>
                        </div>
                    </section>

                    <section className='w-[60%] m-auto rounded-2xl p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <div className='grid'>
                            { array.length === 0 ? (
                                <p className='m-auto mb-4'>No hay tarjetas registradas.</p>
                            ):(
                                array.map((objeto) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <TarjetasPago tarjetas={objeto} funcion={EliminarTarjeta} texto_btn={'Eliminar'}
                                    />))
                            )}
                        </div>
                        { array.length === 0 && <hr /> }
                        <div className='grid justify-end'>
                            <a href="/perfil/tarjetas/registroTarjeta" className='flex gap-2 items-center text-xl mr-12 w-max mt-8 relative before:bg-[#056761] before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold'>
                                <p className='text-[#056761]'>Agregar tarjeta</p>
                                <FontAwesomeIcon icon={faCirclePlus} className='text-[#056761]' />
                            </a>
                        </div>
                    </section>
                </main>
            </LayoutPrincipal >
        </>
    );
}

export default Tarjetas;