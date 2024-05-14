import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

function Seguridad() {
    return (
        <LayoutPrincipal>
            <main className='grid gap-6 my-24'>
                <section className='rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img className='w-32 m-auto my-6 -mt-24 rounded-full aspect-square' src="../../pictures/suscripcionCirculo.png" alt="" />
                    <div className='m-auto text-center '>
                        <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Seguridad</h1>
                        <h2>Configuración para ayudarte a proteger tu cuenta</h2>
                    </div>
                </section>

                <section className='w-[60%] m-auto mt-8'>
                    <h2 className='text-[#036C65] text-2xl mb-4'>Tu información de contacto</h2>
                    <div className='rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <a href='/perfil/informacion' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/personal.png" alt="" /></div>
                                <div>
                                    <h2>Tu correo electrónico</h2>
                                    <p className='text-gray-500'>Actualiza tu correo electrónico</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/informacion' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/personal.png" alt="" /></div>
                                <div>
                                    <h2>Tu contraseña</h2>
                                    <p className='text-gray-500'>Cambia tu contraseña de tu cuenta Armony</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                    </div>
                </section>

                <section className='w-[60%] m-auto mt-8'>
                    <h2 className='text-[#036C65] text-2xl mb-4'>Recomendaciones de seguridad</h2>
                    <div className='rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <a href='/perfil/informacion' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/personal.png" alt="" /></div>
                                <div>
                                    <h2>Correo electrónico de recuperación</h2>
                                    <p className='text-gray-500'>Agrega un correo de recuperación si detecta actividad inusual en tu cuenta o no puedes acceder.</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/informacion' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/personal.png" alt="" /></div>
                                <div>
                                    <h2>Teléfono de recuperación</h2>
                                    <p className='text-gray-500'>Agrega un teléfono de recuperación</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                    </div>
                </section>

            </main>
        </LayoutPrincipal>
    );
}

export default Seguridad;