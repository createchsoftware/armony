import React from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'

function InformacionPersonal() {
    return (
        <>
            <LayoutPrincipal>
                <main className='grid p-12 m-12 md:flex'>
                    <div className='grid gap-6 md:w-3/5'>
                        <section className=' flex justify-around rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <a className='flex items-baseline text-md gap-x-4' href="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg> Volver</a>
                            <h1 className=''>Informacion Personal</h1>
                        </section>
                        <section className=' grid gap-6 rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765]'>Datos de la cuenta:</h2>
                            <div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Usuario:</p>
                                    <p>User</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>E-mail:</p>
                                    <p>correo@armony.com</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Clave:</p>
                                    <p>#126644</p>
                                </div>
                            </div>
                        </section>
                        <section className=' grid gap-6 rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765]'>Datos de la cuenta:</h2>
                            <div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Usuario:</p>
                                    <p>User</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>E-mail:</p>
                                    <p>correo@armony.com</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Clave:</p>
                                    <p>#126644</p>
                                </div>
                            </div>
                        </section>
                        <section className=' grid gap-6 rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765]'>Datos de la cuenta:</h2>
                            <div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Usuario:</p>
                                    <p>User</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>E-mail:</p>
                                    <p>correo@armony.com</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Clave:</p>
                                    <p>#126644</p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <aside className='w-2/5 m-auto my-8'>
                        <div className='grid gap-6 text-center '>
                            <img className='m-auto rounded-full md:w-1/3' src="../../../pictures/5school.png" alt="" />
                            <h2 className='text-[#EB5765]'>Rango platino</h2>
                            <img className='w-48 m-auto' src="../../../pictures/membresiaEjemplo.png" alt="" />
                            <a href="#_" className="m-auto px-12 py-2  font-medium text-white whitespace-no-wrap bg-[#EB5765] border border-gray-200 rounded-full shadow-sm hover:cursor-pointer hover:bg-[#eb7580] focus:outline-none focus:shadow-none">
                                Editar
                            </a>
                        </div>
                    </aside>
                </main>
            </LayoutPrincipal>
        </>
    )
}

export default InformacionPersonal
