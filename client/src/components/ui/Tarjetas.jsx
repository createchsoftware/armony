import oro from '../../../public/pictures/rangoOro.png'
import platino from '../../../public/pictures/nuevoPlatino.png'
import vip from '../../../public/pictures/nuevoVIP.png'
import greenRight from '../../../public/pictures/greenRight.png'
import greenLeft from '../../../public/pictures/greenLeft.png'
import rangos from '../../../public/pictures/rangos.png'

function Tarjetas() {
    return (
        <>
            <img src={greenLeft} alt="" className='absolute w-[12%] left-0 translate-y-[-6rem]' />
            <img src={greenRight} alt="" className='absolute w-[12%] right-0 translate-y-[60rem] ' />
            <div className="selection:text-white selection:bg-[#EB5765] m-auto mt-10 w-[70%] grid place-content-center ">
                {/* <h1 className="justify-self-center text-4xl md:text-6xl font-[iloveglitter] text-[#036C65]">¡Hazte socio!</h1> */}
                <div className="items-center gap-0 text-center md:grid md:grid-cols-2 place-content-center">
                    <div>
                        <img src={rangos} alt="Rangos, los tres rangos disponibles que se pueden alcanzar." className='w-5/6' />
                    </div>
                    <div className='p-8 mt-0 bg-gradient-to-b from-[#F6CFEE] via-[#FFF1DD] to-[#DDF3FA] rounded-xl'>
                        <h1 className="text-4xl md:text-6xl font-[iloveglitter] font-bold text-[#036C65]">Conoce el potencial de los rangos</h1>
                        <p className='font-[abeatbyKai] text-l mt-6 text-[#036C65]'>Si te gusta nuestro servicio, tal vez te interese un rango que te de mucho más.</p>
                        <p className='font-[abeatbyKai] text-xl font-bold mt-6 text-[#EB5765]'>¡Tu bienestar merece ser prioridad!</p>
                    </div>
                </div>
                <div className="p-8 mt-12 md:mt-0">
                    <h1 className="text-center text-[#036C65] font-[iloveglitter] text-4xl md:text-6xl">Esto es lo que tenemos para tí.</h1>
                </div>
                <div className=" font-[abeatbyKai] grid  justify-center grid-cols-1  gap-6 md:gap-8 place-content-around md:grid-cols-3  ">
                    <div className='border-4 border-[#B49947]  rounded-[30px]'>
                        <div className="grid justify-center h-full grid-cols-2 gap-4 p-4 border-[1rem]  border-[#F1DA88] rounded-3xl place-content-center md:grid-cols-1 md:gap-8 md:place-content-start ">
                            <h1 className="col-span-2 font-bold text-xl text-center text-[#F1DA88] drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[black] ">Rango oro</h1>
                            <div className="grid w-full m-auto md:col-span-2">
                                <img className='w-2/3 rounded-2xl justify-self-center' src={oro} alt="Rango oro" />
                            </div>
                            <div className="grid gap-1 text-center divide-black divide- md:gap-4 md:col-span-2">
                                <p className='bg-[#616C8926] py-2 text-xl rounded-xl'>1,000 puntos</p>
                                <hr className="border-2" />
                                <p>Envío prioritario</p>
                                <hr className="border-2" />
                                <p>Promociones exclusivas</p>
                            </div>
                        </div>
                    </div>

                    <div className='border-4 border-gray-500 rounded-[30px]'>
                        <div className="grid h-full justify-center grid-cols-2 gap-4 p-4 border-[1rem] rounded-3xl  border-gray-300 place-content-center md:grid-cols-1 md:gap-8 md:place-content-start">
                            <h1 className="col-span-2 font-bold text-xl text-center text-gray-300 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-[black] ">Rango platino</h1>
                            <div className="grid w-full m-auto md:col-span-2">
                                <img className='w-2/3 rounded-2xl justify-self-center' src={platino} alt="Rango platino" />
                            </div>
                            <div className="grid gap-1 text-center divide-black divide- md:gap-4 md:col-span-2">
                                <p className='bg-[#616C8926] py-2 text-xl rounded-xl'>2,000 puntos</p>
                                <hr className="border-2" />
                                <p>Regalos exclusivos</p>
                                <hr className="border-2" />
                                <p>Descuentos generosos</p>
                                <hr className="border-2" />
                                <p>Acceso anticipado a ventas</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-4 border-purple-950 rounded-[30px] '>
                        <div className="grid justify-center h-full grid-cols-2 gap-4 p-4 border-[1rem] rounded-3xl  border-purple-800 place-content-center md:grid-cols-1 md:gap-8 md:place-content-start">
                            <h1 className="col-span-2 font-bold text-center text-purple-800 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-[black]">Rango VIP</h1>
                            <div className="grid w-full m-auto md:col-span-2">
                                <img className='w-2/3 rounded-2xl justify-self-center' src={vip} alt="Rango VIP" />
                            </div>
                            <div className="grid gap-1 text-center divide-black divide- md:gap-4 md:col-span-2">
                                <p className='bg-[#616C8926] py-2 text-xl rounded-xl'>5,000 puntos</p>
                                <hr className="border-2" />
                                <p>Invitaciones a eventos VIP de élite.</p>
                                <hr className="border-2" />
                                <p>Acceso anticipado a ventas.</p>
                                <hr className="border-2" />
                                <p>Contenido premium ilimitado.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="/rangos" className=" my-12 mb-36 transition-all duration-300 w-48 m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"><span>Ver más</span><div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></a>
            </div >
        </>
    );

}

export default Tarjetas;