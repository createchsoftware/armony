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
import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";


function Monedero() {

    function toTarjetas() {
        window.location.href = '/perfil/tarjetas';
    }

    function toMovimientos() {
        window.location.href = '/perfil/movimientos';
    }

    function toAgregarSaldo() {
        window.location.href = '/perfil/monedero/agregarSaldo';
    }


    const [monedero, setMonedero] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        fetch("/api/monedero")
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    setNombre(data.data[0].nombre);
                    setMonedero(data.data[0].monedero);
                }


            })
            .catch(error => {
                console.log(error);
            });
    }, [])



    return (
        <LayoutPrincipal>
            <main className='grid gap-12 my-24'>
                <section className='rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img className='w-32 m-auto my-6 -mt-24 rounded-full aspect-square' src="../../../public/pictures/monedero.png" alt="" />
                    <div className='m-auto text-center '>
                        <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Monedero</h1>
                        <h2>Dinero obtenido en la cuenta</h2>
                    </div>
                </section>

                <section className='rounded-2xl text-center mt-24  m-auto w-[50%] grid gap-8 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <div className="bg-gradient-to-r py-4 w-[60%] -mt-36 m-auto from-[#FFB5A8] to-[#FFE4E1] border-2 rounded-2xl border-gray-600">
                        <img className="w-12 m-auto mb-4" src="../../../public/pictures/logoArmony.png" alt="" />
                        <div className="text-2xl text-center">
                            <h2>Monedero</h2>
                            <p>$0.00</p>
                        </div>
                        <div className="bg-gradient-to-r from-[#EB5765] h-10 my-6  border-y-2  border-gray-600 to-[#D6ADB1]">

                        </div>
                    </div>

                    <h2>NOMBRE DE USUARIO</h2>

                    <section className='rounded-2xl text-center grid-cols-2  m-auto w-[80%] grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <a href="/perfil/tarjetas" className="rounded-xl hover:bg-opacity-80 flex gap-4 items-center px-4 py-4 text-white bg-[#EB5765]">
                            <img className="w-8" src="../../../public/pictures/tarjetas.png" alt="" />
                            <p>Mis tarjetas</p>
                        </a>
                        <a href="/perfil/historial" className="rounded-xl hover:bg-opacity-80 flex gap-4 items-center px-4 py-4 text-white bg-[#EB5765]">
                            <img className="w-8" src="../../../public/pictures/movimientos.png" alt="" />
                            <p>Movimientos</p>
                        </a>
                        <a href="#" className="w-1/2 m-auto py-1 hover:bg-opacity-80 px-2 col-span-2 rounded-full text-white bg-[#EB5765]">
                            <p>+ Agregar saldo</p>
                        </a>
                    </section>

                </section>



            </main>
        </LayoutPrincipal >
        // <div>
        //     <h1>Monedero</h1>
        //     <p>Nombre {nombre}</p>
        //     <p>monedero {monedero}</p>

        //     <button onClick={toTarjetas}> Mis tarjetas</button>
        //     <button onClick={toMovimientos}> Movimientos</button>
        //     <button onClick={toAgregarSaldo}> Agregar saldo</button>
        // </div>
    );
}

export default Monedero;