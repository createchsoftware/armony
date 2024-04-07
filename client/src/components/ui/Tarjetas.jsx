import membresias from '../../../public/pictures/membresias2.png'
import membresia1 from '../../../public/pictures/membresia1.png'
import membresia2 from '../../../public/pictures/membresia2.png'
import membresia3 from '../../../public/pictures/membresia3.png'
import greenRight from '../../../public/pictures/greenRight.png'
import greenLeft from '../../../public/pictures/greenLeft.png'

function Tarjetas() {
    return (
        <>
            <img src={greenLeft} alt="" className='absolute w-[12%] left-0 translate-y-[-6rem]' />
            <img src={greenRight} alt="" className='absolute w-[12%] right-0 translate-y-[60rem] ' />
            <div className="selection:text-white selection:bg-[#EB5765] m-auto w-[70%] grid place-content-center ">
                <div className="items-center gap-0 text-center md:grid md:grid-cols-2 place-content-center">
                    <img src={membresias} alt="" />
                    <div className='p-8 bg-gradient-[#F6EECF] mt-0  bg-gradient-to-b from-[#F6EECF] to-[#DDF3FA] rounded-xl'>
                        <h1 className="text-4xl md:text-6xl font-[iloveglitter] text-[#036C65]">Conoce nuestras membresías</h1>
                        <p className='font-[abeatbyKai] mt-6 text-[#036C65]'>Si te gusta nuestro servicio, tal vez te interese una membresia que te de mucho mas.
                            ¡Tu bienestar merece ser prioridad!</p>
                    </div>
                </div>
                <div className="p-8 mt-12 md:mt-0">
                    <h1 className="text-center text-[#036C65] font-[iloveglitter] text-4xl md:text-6xl">Esto es lo que tenemos para tí.</h1>
                </div>
                <div className=" font-[abeatbyKai] grid  justify-center grid-cols-1  gap-6 md:gap-8 place-content-around md:grid-cols-3  ">
                    <div className='border-4 border-[#BCA0AE]  rounded-[30px]'>
                        <div className="grid justify-center h-auto grid-cols-2 gap-4 p-8 border-[1rem]  border-[#CDC0C4] rounded-3xl place-content-center md:grid-cols-1 md:gap-8  md:h-[40vw] md:place-content-start ">
                            <h1 className="col-span-2 font-bold text-center drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[black]   ">Membresia VIP</h1>
                            <div className="w-full m-auto md:col-span-2">
                                <img className=' aspect-video rounded-2xl' src={membresia1} alt="" />
                            </div>
                            <div className="grid gap-1 text-center divide-black divide- md:gap-4 md:col-span-2">
                                <p>Precio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                            </div>
                        </div>
                    </div>

                    <div className='border-4 border-[#B49947] rounded-[30px]'>
                        <div className="grid h-full justify-center grid-cols-2 gap-4 p-8 border-[1rem] rounded-3xl  border-[#F1DA88] place-content-center md:grid-cols-1 md:gap-8 md:place-content-start">
                            <h1 className="col-span-2 font-bold text-center text-[#F1DA88] drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-[black] ">Membresia Golden</h1>
                            <div className="w-full m-auto md:col-span-2">
                                <img className=' aspect-video rounded-2xl' src={membresia2} alt="" />
                            </div>
                            <div className="grid gap-1 text-center divide-black divide- md:gap-4 md:col-span-2">
                                <p>Precio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-4 border-[#848484] rounded-[30px] '>

                        <div className="grid justify-center h-full grid-cols-2 gap-4 p-8 border-[1rem] rounded-3xl  border-[#C9CEDB] place-content-center md:grid-cols-1 md:gap-8 md:place-content-start">
                            <h1 className="col-span-2 font-bold text-center text-[#C9CEDB] drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-[black]">Membresia Platino</h1>
                            <div className="w-full m-auto md:col-span-2">
                                <img className=' aspect-video rounded-2xl' src={membresia3} alt="" />
                            </div>
                            <div className="grid gap-1 text-center divide-black divide- md:gap-4 md:col-span-2">
                                <p>Precio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                                <hr className="border-2" />
                                <p>Beneficio</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button class=" my-12 mb-36 transition-all duration-300 w-48 m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"><span>Ver más</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
            </div >
        </>
    );

}

export default Tarjetas;

// function Tarjetas({ data }) {
//     return (
//         <div className="tarjetas">
//             {data.map((item) => (
//                 <Tarjeta key={item.id} item={item} />
//             ))}
//         </div>
//     );
// }

// export default Tarjetas;

// <div className="selection:text-white selection:bg-[#EB5765] m-auto w-[80%] border-black border-2 grid place-content-center ">
// <div className="p-8">
//     <h1 className="text-center text-[#036C65] font-[iloveglitter] text-6xl">Esto es lo que tenemos para tí.</h1>
// </div>
// <div className=" font-[abeatbyKai] grid  justify-center grid-cols-1  gap-6 md:gap-16 place-content-around md:grid-cols-3 ">
//     <div className="grid justify-center h-auto grid-cols-2 gap-4 p-8 border-8  border-[#CDC0C4] place-content-center md:grid-cols-1 md:gap-4  md:h-[600px] md:place-content-start ">
//         <h1 className="col-span-2 font-bold text-center">Membresia VIP</h1>
//         <div className="w-24 m-auto md:col-span-2 md:w-48">
//             <img className=' aspect-video rounded-2xl' src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" />
//         </div>
//         <div className="border-2 md:col-span-2">
//             <p>Precio</p>
//             <hr />
//             <p>Beneficio</p>
//         </div>
//     </div>
//     <div className="grid justify-center h-auto grid-cols-2 gap-4 p-8 border-8  border-[#F1DA88] place-content-center md:grid-cols-1 md:gap-4 md:place-content-start">
//         <h1 className="col-span-2 font-bold text-center ">Membresia Golden</h1>
//         <div className="m-auto border-4 md:col-span-2 w-36">
//             <img className=' aspect-video rounded-2xl' src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" />
//         </div>
//         <div className="border-2 md:col-span-2">
//             <p>Precio</p>
//             <hr />
//             <p>Beneficio</p>
//         </div>
//     </div>
//     <div className="grid justify-center h-auto grid-cols-2 gap-4 p-8 border-8  border-[#C9CEDB] place-content-center md:grid-cols-1 md:gap-4 md:place-content-start">
//         <h1 className="col-span-2 font-bold text-center ">Membresia Platino</h1>
//         <div className="m-auto border-4 md:col-span-2 w-36">
//             <img className=' aspect-video rounded-2xl' src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" />
//         </div>
//         <div className="border-2 md:col-span-2">
//             <p>Precio</p>
//             <hr />
//             <p>Beneficio</p>
//         </div>
//     </div>
// </div>
// </div >