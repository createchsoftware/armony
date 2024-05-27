import Paquete from '../../components/ui/Paquete';
import ContenedorPaquetes from '../../components/ui/ContenedorPaquetes';
import { useState } from 'react';

const paquetes = [
    {
        id: 1,
        nombre: "Paquete 1",
        descripcion: "Facial Hidratante",
        precios: [500, 2000, 4000]
    },
    {
        id: 2,
        nombre: "Paquete 2",
        descripcion: "Facial Antiarrugas",
        precios: [600, 2500, 5000]
    },
    {
        id: 3,
        nombre: "Paquete 3",
        descripcion: "Facial Antimanchas",
        precios: [700, 3000, 6000]
    }
];


function Paquetes({ next }) {
    const [selectedPriceIndex, setSelectedPriceIndex] = useState(null);

    const getPriceClass = (priceIndex) => {
        let baseClass = "p-2 border-2 border-black rounded-full cursor-pointer text-center shadow-[0_0px_5px_rgb(0,0,0,0.2)] shadow-purple-600";
        if (selectedPriceIndex === priceIndex) {
            return `${baseClass} opacity-100 bg-purple-600 text-white`; // Cambia de color y opacidad al seleccionarse
        }
        return `${baseClass} `; // Opacidad de 50 para las no seleccionadas
    };

    const handleClickPrice = (index) => {
        setSelectedPriceIndex(index);
        next();
    };

    const servicio = localStorage.getItem("nombre");
    const descripcion = localStorage.getItem("descripcion");
    const imagen = localStorage.getItem("imagen");

    return (
        <>
            <h1 className='flex justify-center justify-self-center text-2xl px-8 w-1/3 m-auto border-b-2 border-b-[#ec5766] font-bold'>
                Selecciona tus sesiones
            </h1>
            <div className='grid'>
                <div className='mx-12 gap-28 md:flex '>
                    <div className='grid gap-4 p-0 text-center md:w-1/3'>
                        <img className='w-3/4 m-auto rounded-2xl aspect-square' src={imagen} alt={servicio} />
                        <div className='p-8 text-xs text-justify text-black border-4 border-rose-400 rounded-3xl bg-rose-200'>
                            <h2 className='mb-4 text-xl font-bold text-center md:mb-0'>{servicio}</h2>
                            <p className='mt-4'>{descripcion}</p>
                        </div>
                    </div>
                    <div className='md:w-[60%] text-sm md:text-md py-6  grid'>
                        <div className='grid gap-4 text-xl place-items-center '>
                            <div>
                                <div className="flex gap-32 font-[abeatbykai]">
                                    <div className='grid gap-6'>
                                        <div>1 Sesión</div>
                                        <div className={getPriceClass(1)} onClick={() => handleClickPrice(1)}>
                                            {'$ ' + 122}
                                        </div>
                                    </div>
                                    <div className='grid gap-6'>
                                        <div>5 Sesiones</div>
                                        <div className={getPriceClass(2)} onClick={() => handleClickPrice(2)}>
                                            {'$ ' + 122}
                                        </div>
                                    </div>
                                    <div className='grid gap-6'>
                                        <div>10 Sesiones</div>
                                        <div className={getPriceClass(3)} onClick={() => handleClickPrice(3)}>
                                            {'$ ' + 122}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default Paquetes;

// import Paquete from '../../components/ui/Paquete';
// import ContenedorPaquetes from '../../components/ui/ContenedorPaquetes';
// import { useState } from 'react';

// const paquetes = [
//     {
//         id: 1,
//         nombre: "Paquete 1",
//         descripcion: "Facial Hidratante",
//         precios: [500, 2000, 4000]
//     },
//     {
//         id: 2,
//         nombre: "Paquete 2",
//         descripcion: "Facial Antiarrugas",
//         precios: [600, 2500, 5000]
//     },
//     {
//         id: 3,
//         nombre: "Paquete 3",
//         descripcion: "Facial Antimanchas",
//         precios: [700, 3000, 6000]
//     }
// ];


// function Paquetes() {

//     const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);

//     const getPriceClass = (priceIndex) => {
//         let baseClass = "p-2 border-2  border-black rounded-full cursor-pointer shadow-[0_0px_5px_rgb(0,0,0,0.2)] shadow-purple-600 hover:bg-slate-50";
//         if (selectedPriceIndex == priceIndex) {
//             return `${baseClass} opacity-30`;
//         }
//         return baseClass;
//     }

//     const handleClickPrice = (priceIndex) => {
//         if (selectedPriceIndex === priceIndex) {
//             setSelectedPriceIndex(null);
//         } else {
//             setSelectedPriceIndex(priceIndex);
//         }
//     }

//     return (
//         <>
//             <h1 className='flex justify-center justify-self-center text-2xl px-8 w-1/3  m-auto border-b-2 border-b-[#ec5766] font-bold'>
//                 Selecciona tus sesiones
//             </h1>
//             <div className='grid '>
//                 <div className='mx-12 gap-28 md:flex '>
//                     <div className='grid gap-0 p-0 text-center md:w-1/4 '>
//                         <img className='m-auto rounded-2xl' src="./../../../pictures/1cafeteria.jpg" alt="" />
//                         <div className='p-8 text-xs text-justify text-black border-4 border-rose-400 rounded-3xl bg-rose-200'>
//                             <h2 className='mb-4 text-2xl font-bold text-center md:mb-0'>Facial</h2>
//                             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam distinctio hic doloremque facere officiis dignissimos!</div>
//                     </div>
//                     <div className='md:w-[60%] text-sm md:text-md py-6 '>
//                         <div className='flex gap-4 mb-6 ml-40 text-xs md:justify-between md:ml-auto md:w-2/5'>
//                             <div>1 Sesion</div>
//                             <div>5 Sesiones</div>
//                             <div>10 Sesiones</div>
//                         </div>
//                         {/* <div className='grid gap-4'>
//                             {paquetes.map((paquete) => (
//                                 <Paquete key={paquete.id} paquete={paquete} />
//                             ))}
//                         </div> */}
//                         <div className='grid gap-4 place-items-center'>
//                             <div>
//                                 <div className="flex gap-8">
//                                     <div>
//                                         <div>1 Sesión</div>
//                                         <div className='p-2 border-2  border-black rounded-full cursor-pointer text-center shadow-[0_0px_5px_rgb(0,0,0,0.2)] shadow-purple-600 hover:bg-slate-50' onClick={(e) => handleClickPrice()}>
//                                             {'$ ' + 122}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div>5 sesiones</div>
//                                         <div className='p-2 border-2  border-black rounded-full text-center  cursor-pointer shadow-[0_0px_5px_rgb(0,0,0,0.2)] shadow-purple-600 hover:bg-slate-50' onClick={(e) => handleClickPrice()}>
//                                             {'$ ' + 122}
//                                         </div>
//                                     </div>
//                                     <div className='grid place-content-start'>
//                                         <div>10 sesiones</div>
//                                         <div className='p-2 border-2  border-black text-center rounded-full cursor-pointer shadow-[0_0px_5px_rgb(0,0,0,0.2)] shadow-purple-600 hover:bg-slate-50' onClick={(e) => handleClickPrice()}>
//                                             {'$ ' + 122}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//             </div>
//         </>
//     );
// }

// export default Paquetes;