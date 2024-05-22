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
import Compras from '../../components/ui/Compras';

function classNames(...clases) {
    return clases.filter(Boolean).join(' ')
}

const sortOptions = [
    { name: 'Todas', current: true },
    { name: '2 meses', current: true, value: 61 },  // 61 dias aprox 2 meses
    { name: '4 meses', current: true, value: 122 }, //122 dias aprox 4 meses
    { name: '1 año', current: true, value: 365 },  //365 dias
]


function Pedidos() {

    function handleSortOptionClick(option) {


        if (option.name == 'Todas') {
            setArrayF(array);
            setArrayF2(array2);
        } else {
            let fecha_hoy = Date.now();
            let fechaLimite = new Date(fecha_hoy - (1000 * 60 * 60 * 24 * option.value));


            setArrayF(array.filter((producto) => {
                return new Date(producto.date).getTime() > fechaLimite.getTime()
            }))

            setArrayF2(array2.filter((producto) => {
                return new Date(producto.date).getTime() > fechaLimite.getTime()
            }))
        }

        setLabel(option.name)

    }


    function handleSearch(e) {
        let input = e.target.value.toLowerCase();

        let ark;
        let ark2;

        if (label == 'Todas') {
            ark = array.filter(producto => producto.nombre.toLowerCase().includes(input));
            ark2 = array2.filter(producto => producto.nombre.toLowerCase().includes(input));
        }
        else {

            let option = sortOptions.find(opcion => opcion.name == label);

            let fecha_hoy = Date.now();
            let fechaLimite = new Date(fecha_hoy - (1000 * 60 * 60 * 24 * option.value));
            ark = array.filter(producto => producto.nombre.toLowerCase().includes(input) && new Date(producto.date).getTime() > fechaLimite.getTime());
            ark2 = array2.filter(producto => producto.nombre.toLowerCase().includes(input) && new Date(producto.date).getTime() > fechaLimite.getTime());
        }



        if (ark.length > 0 || input == '') {
            setArrayF(ark);
        }
        else {
            setArrayF([]);
        }
        if (ark2.length > 0 || input == '') {
            setArrayF2(ark2);
        }
        else {
            setArrayF2([]);
        }
    }


    const [array, setArray] = useState([]);
    const [array2, setArray2] = useState([]);
    const [arrayF, setArrayF] = useState([]);
    const [arrayF2, setArrayF2] = useState([]);

    const [opcion, setSortOption] = useState({ name: 'Todas', current: true });


    const [label, setLabel] = useState("Todas");

    useEffect(() => {
        fetch("/api/pedidos")
            .then(response => response.json())
            .then(data => {
                if (data.arreglo1) {
                    setArray(data.arreglo1);
                    setArrayF(data.arreglo1);
                }
                if (data.arreglo2) {
                    setArray2(data.arreglo2);
                    setArrayF2(data.arreglo2);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    function ret1() {
        if (arrayF.length > 0) { return (<h2>En camino</h2>); }
    }

    function ret() {
        if (arrayF2.length > 0 && arrayF.length > 0) { return (<hr />); }
    }

    function ret2() {
        if (arrayF2.length > 0) { return (<h2>Entregados</h2>); }
    }


    return (
        <LayoutPrincipal>
            <main className='grid gap-6 mb-12 mt-36 w-[60%] m-auto'>

                <section className='rounded-2xl p-9 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa/perfil"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img className='w-32 m-auto my-12 rounded-full -mt-28 aspect-square' src="../../pictures/agendaFondo.png" alt="" />
                    <img className='m-auto mb-8 -mt-44 w-28 aspect-square' src="../../pictures/pedidos.png" alt="" />
                    <div className='m-auto text-center '>
                        <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Pedidos</h1>
                        <h2 className='text-xl'>Calendario de citas pendientes</h2>
                    </div>
                </section>

                <div className='flex justify-between gap-4 '>
                    <div className='max-w-md border-gray-400 border-1'>
                        <div className="relative flex items-center w-full h-12 overflow-hidden bg-white border-b-2 rounded-lg focus-within:shadow-lg border-gray">
                            <div className="grid w-12 h-full text-gray-300 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <input
                                className="w-full h-full pr-2 text-sm text-gray-700 outline-none peer"
                                type="text"
                                id="search"
                                placeholder="Buscar..."
                                onChange={(e) => { handleSearch(e) }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                                    Ordenar por
                                    <ChevronDownIcon
                                        className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => { handleSortOptionClick(option) }}
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900 cursor-pointer' : 'text-gray-500',
                                                            active ? 'bg-gray-100 cursor-pointer' : 'cursor-pointer',
                                                            'block px-4 py-2 text-sm cursor-pointer'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <p className='place-content-center'>{arrayF.length + arrayF2.length} Compras</p>
                </div>
                <div className='rounded-xl flex justify-start place-content-center place-items-center px-12 py-4 gap-96  shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <h1 className="text-2xl text-rose-400">
                        {label}
                    </h1>
                </div>


                <div className='grid gap-6'>
                    {ret1()}
                    {
                        arrayF.map((objeto) => (
                            <Compras key={objeto.id} compras={objeto} />))
                    }
                    {ret()}
                    {ret2()}
                    {
                        arrayF2.map((objeto) => (
                            <Compras key={objeto.id} compras={objeto} />))
                    }


                </div>

            </main>
        </LayoutPrincipal >
    );
}

export default Pedidos;