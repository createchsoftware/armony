import { Helmet, HelmetProvider } from "react-helmet-async";
import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { Fragment, useEffect, useState } from 'react';
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

function TarjetaNueva() {

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
            <HelmetProvider>
                <Helmet>
                    <script src="../../../scripts/addCard.js"></script>
                </Helmet>
            </HelmetProvider>

            <LayoutPrincipal>
                <section className='rounded-2xl flex justify-between mt-24 w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm text-center gap-x-4' href="/perfil/tarjetas">
                        <IoIosArrowBack className='' />
                        Volver
                    </a>
                    <h2 className="text-2xl text-center">Tarjetas</h2>
                    <h2 className="text-2xl text-center"></h2>
                </section>

                <div className="flex gap-6 p-6 w-[90%] my-12">

                    <div className='grid w-1/2 gap-2 px-12 mt-12'>
                        {array.map((objeto) => (<TarjetasPagoEstatica tarjetas={objeto} />))}
                    </div>

                    <div className="w-1/2">
                        <a className='flex items-baseline content-center text-sm text-center gap-x-4' href="/perfil/tarjetas">
                            <IoIosArrowBack className='' />
                            Volver
                        </a>

                        <form action="" className="grid gap-4">

                            <div className="grid gap-2 mt-6">
                                <label for='titular'>Tipo de tarjeta</label>
                                <div className="flex gap-6">
                                    <img src="../../../public/pictures/Visa.png" className="w-24 hover:opacity-40 hover:drop-shadow-lg" alt="" />
                                    <img src="../../../public/pictures/MasterCard.png" className="w-24 hover:opacity-40" alt="" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <label for='titular'>Titular de la tarjeta</label>
                                <input type="text" className="rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none" id='titular' name='titular' />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="">Numero de la tarjeta</label>
                                <input type="text" className="rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none" id='numero' name='numero' />
                            </div>

                            <div className="flex items-center gap-12">
                                <div>
                                    <label >Fecha de vencimiento</label>
                                    <div className="flex gap-3">
                                        <input type="text" className="rounded-xl w-24 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none" id='mes' name='mes' />
                                        <input type="text" className="rounded-xl w-24 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none" id='año' name='año' />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <label for="cvv">Código de seguridad</label>
                                    <input type="text" className="rounded-xl w-32 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none" id='cvv' name='cvv' />
                                </div>
                            </div>



                            <div className="grid gap-2">
                                <label for="tipo">Tipo</label>
                                <input type="text" className="rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none" id='tipo' name='tipo' placeholder='debido/credito' />
                            </div>

                            <div className="flex gap-3">
                                <input type="checkbox" id='recordar' name='recordar' />
                                <label for="recordar">Recordar tarjeta</label>
                            </div>

                            <div className="flex gap-3">
                                <input type="checkbox" id='principal' name='principal' />
                                <label for="principal">Poner como tarjeta principal</label>
                            </div>

                            <div className="flex justify-between">
                                <a href="/perfil/tarjetas" id='' className="bg-[#EB5765] text-center bg-opacity-15 w-1/3 px-6 py-2 text-[#EB5765] rounded-full hover:bg-[#EB5765] hover:text-white">Cancelar</a>
                                <button id='add-Tarjeta' className="bg-[#EB5765] w-1/3 px-6 py-2 text-white rounded-full hover:bg-opacity-80 hover:text-white">Agregar tarjeta</button>

                            </div>
                        </form>
                    </div>
                </div>
            </LayoutPrincipal>
        </>

    );
}

export default TarjetaNueva;