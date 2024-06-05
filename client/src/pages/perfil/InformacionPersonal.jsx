import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'

function InformacionPersonal() {
    async function checkLogin() {
        let respuestaJson = null;
        try {
          const respuesta = await fetch("/api/logueado", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          respuestaJson = await respuesta.json();
    
          if (respuestaJson.logueado != true) {
            window.location.href = "/spa";
          }
        } catch (error) {
          window.location.href = "/spa";
        }
      }
    
      useEffect(() => checkLogin(), []);

    const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
    const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION
    const [apellidoP, setPaterno] = useState(false); //<<< PARA EL INICIO DE SESION
    const [apellidoM, setMaterno] = useState(false); //<<< PARA EL INICIO DE SESION
    const [codigoP, setPostal] = useState(false); //<<< PARA EL INICIO DE SESION
    const [telefono, setTelefono] = useState(false); //<<< PARA EL INICIO DE SESION
    const [calle, setCalle] = useState(false); //<<< PARA EL INICIO DE SESION
    const [numero, setNumero] = useState(false); //<<< PARA EL INICIO DE SESION
    const [colonia, setColonia] = useState(false); //<<< PARA EL INICIO DE SESION
    const [fechaNac, setNacimiento] = useState(false); //<<< PARA EL INICIO DE SESION
    const [imagen, setImagen] = useState(false); //<<< PARA EL INICIO DE SESION
    const [clave, setClave] = useState(false); //<<< PARA EL INICIO DE SESION
    const [patologias, setPatologias] = useState([]);
    const [rango, setRango] = useState(0); //<<< MUESTRA EL RANGO DEL USUARIO
    const [sus, setSus] = useState(false); //<<< CARACTERISTICA GRAFICA DE QUE EL USUARIO ES SOCIO




    async function recibido() {
        const respuesta = await fetch('/api/logueado', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!respuesta.ok) {
            setNombre(null);
            setCorreo(null);
            setPaterno(null);
            setMaterno(null);
            setTelefono(null);
            setPostal(null);
            setNumero(null);
            setCalle(null);
            setColonia(null);
            setNacimiento(null);
            setImagen(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setClave(respuestaJson.clave);
            setNombre(respuestaJson.nombre);
            setCorreo(respuestaJson.email);
            setPaterno(respuestaJson.apellidoP);
            setMaterno(respuestaJson.apellidoM);
            setTelefono(respuestaJson.telefono);
            setPostal(respuestaJson.codigoP);
            setNumero(respuestaJson.numero);
            setCalle(respuestaJson.calle);
            setColonia(respuestaJson.colonia);
            setNacimiento(respuestaJson.fechaNac);
            setImagen(respuestaJson.imagen);

        }
        else {
            setNombre(null);
            setCorreo(null);
            setPaterno(null);
            setMaterno(null);
            setTelefono(null);
            setPostal(null);
            setNumero(null);
            setCalle(null);
            setColonia(null);
            setNacimiento(null);
            setImagen(null);
        }
    }

    async function Rango() {
        const respuesta3 = await fetch("/api/perfil/rangos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!respuesta3.ok) {
          return;
        }
    
        const respuesta3Json = await respuesta3.json();
    
        if (respuesta3Json.informacion) {
          setRango(respuesta3Json.informacion[0]);
        }
    }

    async function Patologias() {
        const respuesta2 = await fetch('/api/patologias', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!respuesta2.ok) {
            console.log('hubo un problema en la comunicacion back con front');
        }

        const respuesta2Json = await respuesta2.json();

        if (respuesta2Json.patologias) {
            setPatologias(respuesta2Json.patologias);
        }

    }

        
    
    



    function retornar() {
        if (patologias.length == 0) {
            return (
                <div className='flex gap-x-4'>
                    <p className='text-[#9D9999]'>No hay patologias</p>
                </div>
            );
        }
        else {
            return patologias.map(objeto => (
                <div key={objeto.nombre} className='flex gap-x-4'>
                    <p className='text-[#9D9999]'>{objeto.nombre}</p>
                    <p>{objeto.titulo}</p>
                    <p>{objeto.descripcion}</p>
                </div>
            ));

        }
    }

    useEffect(() => {
        recibido();
        Rango();
        Patologias();
      
    }, []);

    useEffect(() => {
       // console.log(clave)
        const Prod = async () => {
            try {
                if (clave) {
                    const response = await fetch(`/api/admin/cliente/StatusSus/${clave}`)
                    const data = await response.json();
                    setSus(data)
                    
                }
            } catch (error) {
                console.error("hubo error :", error)
            }
        }
        Prod()
    }, [clave])

    return (
        <>
            <LayoutPrincipal>
                <main className='grid p-12 m-12 md:flex'>
                    <div className='grid gap-6 md:w-[80%] m-auto'>
                        <section className='grid text-center rounded-2xl w-[100%] p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <a className='flex w-max items-baseline text-md gap-x-4 relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold' href="/perfil">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg> Volver
                            </a>
                            <div className='w-32 m-auto my-6 -mt-24 bg-white rounded-full shadow-lg aspect-square place-content-center'>
                                <div className=' w-[85%] bg-[#AAE0FF] rounded-full aspect-square m-auto place-content-center'>
                                    <img className='m-auto w-[65%]' src="../../../pictures/iconoInfoPersonal.png" alt="" />
                                </div>
                            </div>
                            <div className='m-auto text-center '>
                                <h1 className=''>Información personal</h1>
                                <h2>Observa y edita tu información de la cuenta</h2>
                            </div>
                        </section>
                        <div>
                            <div className='flex '>
                                <div className='w-[60%] place-content-end'>
                                    <section className=' grid gap-6 rounded-2xl  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                                        <h2 className='text-[#EB5765] font-bold text-2xl'>Datos de la cuenta:</h2>
                                        <div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>Usuario:</p>
                                                <p>{`${nombre} ${apellidoP}`}</p>
                                            </div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>E-mail:</p>
                                                <p>{correo}</p>
                                            </div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>Clave:</p>
                                                <p>{clave}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section className=' grid gap-6 rounded-2xl p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                                        <h2 className='text-[#EB5765] font-bold text-2xl'>Datos pesonales:</h2>
                                        <div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>nombre y apellidos:</p>
                                                <p>{`${apellidoP} ${apellidoM} ${nombre}`}</p>
                                            </div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>Telefono:</p>
                                                <p>{telefono}</p>
                                            </div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>Fecha de nacimiento:</p>
                                                <p>{fechaNac}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section className=' grid gap-6 rounded-2xl  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                                        <h2 className='text-[#EB5765] font-bold text-2xl'>Domicilio:</h2>
                                        <div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>Calle:</p>
                                                <p>{calle}</p>
                                            </div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>Colonia</p>
                                                <p>{colonia}</p>
                                            </div>
                                            <div className='flex gap-x-4'>
                                                <p className='text-[#9D9999]'>Codigo Postal:</p>
                                                <p>{codigoP}</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <aside className='w-[40%] my-8 '>
                                    <div className='grid grid-cols-1 gap-6 text-center '>
                                        <div className='relative w-40 m-auto mb-4 align-middle items-center justify-center'>
                                            {sus && (
                                                <img
                                                    src="../../../pictures/marcoSuscripcion.png"
                                                    alt=""
                                                    className="absolute object-cover w-full h-full m-auto"
                                                />
                                            )}
                                            <div className="flex w-full h-full items-center justify-center">
                                                <img className='w-[85%] m-auto aspect-square rounded-full' src={imagen !== null ? `../../../pictures/avatares/${imagen}`: "../../../pictures/userDefault.png"} alt="" />
                                            </div>
                                        </div>
                                        {rango === 1 ? (
                                            <>
                                                <h1 className="font-bold text-2xl text-center text-[#F1DA88] drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[black] ">Rango oro</h1>
                                                <img className='m-auto md:w-1/3' src={`../../../pictures/rangoOro.png`} alt="" />
                                            </>
                                        ) : (
                                            rango === 2 ? (
                                                <>
                                                    <h1 className="font-bold text-2xl text-center text-gray-500 drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[black] ">Rango platino</h1>
                                                    <img className='m-auto md:w-1/3' src={`../../../pictures/nuevoPlatino.png`} alt="" />
                                                </>
                                            ) : (
                                                rango === 3 ? (
                                                    <>
                                                        <h1 className="font-bold text-2xl text-center text-purple-950 drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[black] ">Rango VIP</h1>
                                                        <img className='m-auto md:w-1/3' src={`../../../pictures/rangoVIP2.png`} alt="" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <h1 className="font-bold text-2xl text-center text-[#F584A7] drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-[black] ">Sin rango</h1>
                                                        <img className='m-auto md:w-1/3 opacity-15' src={`../../../pictures/rangoOro.png`} alt="" />
                                                    </>
                                                )
                                            )
                                        )}
                                        {/* <img className='w-48 m-auto' src="../../../pictures/membresiaEjemplo.png" alt="" /> */}
                                        <a href="/perfil/editar-perfil" className="m-auto px-12 py-2  font-medium text-white whitespace-no-wrap bg-[#EB5765] border border-gray-200 rounded-full duration-200 shadow-sm hover:cursor-pointer hover:bg-[#F584A7] focus:outline-none focus:shadow-none">
                                            Editar
                                        </a>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <section className=' grid gap-6 rounded-2xl w-[60%]  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765] font-bold text-2xl'>Patologias:</h2>
                            <div>
                                {
                                    retornar()
                                }
                            </div>
                        </section>
                    </div>
                </main>
            </LayoutPrincipal>
        </>
    )
}

export default InformacionPersonal
