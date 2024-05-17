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
import ReturnCitas from '../../components/ui/ReturnCita';
import ReturnMonederos from '../../components/ui/ReturnMonedero';
import ReturnPuntos from '../../components/ui/ReturnPunto';





function classNames(...clases) {
    return clases.filter(Boolean).join(' ')
}

const sortOptions = [
    { name: 'Todas', current: true },
    { name: '2 meses', current: true, value: 61 },  // 61 dias aprox 2 meses
    { name: '4 meses', current: true, value: 122 }, //122 dias aprox 4 meses
    { name: '1 año', current: true, value: 365 },  //365 dias
]

const sortOptions2 = [
    { name: 'General', current: true },
    { name: 'Monedero', current: true},  
    { name: 'Puntos', current: true}, 
    { name: 'Servicios', current: true},  
    { name: 'Productos', current: true}
]


function Movimientos() {

   

    function handleSearch(e){
        let input = e.target.value;

        let longitud = input.length;

        let arr = sortOptions2.filter(option=> option.name.slice(0,longitud).toLowerCase() == input.toLowerCase())

        let msg ='';

        if(arr.length > 0 && arr[0].name =='General'){
            setArrayM(array);  // el establecido por default
            msg=`${arr[0].name}`;
        }else{
            setArrayM(array.filter((producto)=>{

                if(arr.some(option=> producto.type.toLowerCase() == option.name.toLowerCase())){
                    return producto
                }

            }));
            
            msg = arr.map(option=> option.name).join(' ');
        }

        setLabel2(msg);

        obtenerPresent()

    }



    function handleSortOptionClick(option){

        if(option.name=='Todas'){
            setArrayF(array);
        }else{
            let fecha_hoy = Date.now();
            let fechaLimite = new Date(fecha_hoy - (1000 * 60 * 60 * 24 * option.value));
    
    
            setArrayF(array.filter((producto)=>{
                return new Date(producto.date).getTime() > fechaLimite.getTime()
            }))
        }

        obtenerPresent() // siempre se debe actualizar Present

        setLabel(option.name)
    }


    function obtenerPresent(){
        setArrayPresent(arrayM.filter((objeto_tipo)=>{

            let coincidencia = arrayF.some((objeto_fecha)=>{
                return JSON.stringify(objeto_fecha) == JSON.stringify(objeto_tipo)
            })

            if(coincidencia){
                return objeto_tipo;
            }

        }))
    }


    function handleSortOption2Click(option){
        
        if(option.name=='General'){
            setArrayM(array);  // el establecido por default
        }else{
            setArrayM(array.filter((producto)=>{
                return producto.type == option.name
            }))
    
        }

        setLabel2(option.name)

        obtenerPresent() // siempre se debe actualizar Present

    }
    

    const [array, setArray] = useState([]);
    const [arrayF, setArrayF] = useState([]);
    const [arrayM, setArrayM] = useState([]);
    const [arrayPresent, setArrayPresent] = useState([]);

    const [opcion, setSortOption] = useState({ name: 'Todas', current: true });
    const [opcion2, setSortOption2] = useState({ name: 'General', current: true });
    


    const [label, setLabel] = useState("Todas");
    const [label2, setLabel2] = useState("General");

   useEffect(()=>{
      fetch("/api/transacciones")
         .then(response=> response.json())
         .then(data => {
            if(data.array){
                setArray(data.array);
                setArrayF(data.array);
                setArrayM(data.array);
                setArrayPresent(data.array); // en un principo tendra todo, puedo volver a tener todo
            }
         })
         .catch(error=>{
             console.log(error);
         });
   },[])

   useEffect(() => {
    obtenerPresent();
}, [arrayF, arrayM]);


    return (
        <LayoutPrincipal>
            <main className='grid gap-6 mb-12 mt-24 w-[60%] m-auto'>
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
                                    por fecha
                                    <ChevronDownIcon
                                        className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                                <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                                    tipo de movimiento
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
                                <Menu.Items className="absolute right-32 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-black ring-opacity-5 focus:outline-none">
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
                                        {sortOptions2.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => { handleSortOption2Click(option) }}
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
                    <p className='place-content-center'>{arrayPresent.length} Transacciones</p>
                </div>
                <div className='rounded-xl flex justify-start place-content-center place-items-center px-12 py-4 gap-96  shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    
                    <h1 className="text-2xl text-rose-400">
                        {label}
                        {label2}
                    </h1>
                </div>


                <div className='grid gap-6'>
                    {
                        arrayPresent.map((objeto)=>{

                            if(objeto.tipo == 'cita'){
                                return(
                                    <ReturnCitas
                                      key='1' citas={objeto}/>
                                )
                            }
                
                            if(objeto.tipo == 'producto'){
                                return(
                                    <Compras
                                      key='1' compras={objeto}/>
                                )
                            }
                
                            if(objeto.tipo == 'Añadir puntos'){
                                return(
                                    <ReturnPuntos
                                      key='1' puntos={objeto}/>
                                )
                            }
                
                            if(objeto.tipo == 'Recargar Saldo'){
                                return(
                                    <ReturnMonederos
                                      key='1' monederos={objeto}/>
                                )
                            }
                
                        })

                    }
                </div>

            </main>
        </LayoutPrincipal >
    );
}

export default Movimientos;