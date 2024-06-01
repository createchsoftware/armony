import membresias from '../../../public/pictures/Suscripcion.png'
import greenLeft from '../../../public/pictures/greenLeft.png'

function Membresias() {
    return (
        <>
            <img src={greenLeft} alt="" className='absolute w-[12%] left-0 ' />
            <div className='my-12 grid grid-cols-1 gap:6 md:gap-16 text-center  place-content-center md:grid-cols-2 md:text-left mx-auto font-[abeatbykai] selection:bg-[#EB5765] selection:text-white w-[80%]'>
                <img className='' src={membresias} alt="Tarjeta de suscripción para socio." />
                <div className='m-auto'>
                    <h1 className='text-6xl font-[iloveglitter] text-[#036C65]'>Conoce nuestra suscripción</h1>
                    <p className='mt-10'>
                        ¡Únete a nuestra familia de bienestar! Conviértete en socio de nuestro spa y disfruta de acceso exclusivo a tratamientos personalizados, descuentos especiales y promociones únicas. ¡Tu bienestar merece ser prioridad!                </p>
                    <a href='/suscripcion' className="mt-10 transition-all duration-300 w-48 m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200">
                        <span>Ver más</span>
                        <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                </path>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Membresias