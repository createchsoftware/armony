// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
import flowes from '../../../public/pictures/flowers.png'
import Rating from '@mui/material/Rating';
import '../../rating.css'

function Comentarios() {
    return (
        <>
            <div className=' bg-[image:var(--image-url)] bg-cover' style={{ '--image-url': `url(${flowes})`, }} >
                <div className='h-32 mb-0 bg-gradient-to-b from-white to-transparent'></div>
                <div className="w-[80%] m-auto  grid gap-6 selection:bg-[#EB5765] selection:text-white">
                    <div className="">
                        <h1 className="text-center font-[iloveglitter] text-5xl md:text-6xl text-white mt-12">Comentarios destacados de nuestras clientas</h1>
                    </div>
                    <div className="font-[abeatbykai] md:text-lg text-xs text-[#036C65] grid items-center grid-cols-1 gap-4 md:grid-cols-3 place-content-center p-6">
                        <div className="p-6 border-4 border-[#036C65]  rounded-xl  bg-[#FFE4E1]  divide-[#EB5765]">
                            <div className='flex justify-center gap-6'>
                                <Rating name="read-only" value={5} readOnly color='#EB5765' />
                                <svg fill="#036C65" width="25px" height="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="10.24"></g><g id="SVGRepo_iconCarrier"><path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path></g></svg>
                            </div>
                            <div className="text-justify">
                                <p className="mt-4">Es un lugar muy limpio y lindo, perfecto para relajarse. El personal es super amable. Me hiso sentir muy comoda.</p>
                                <hr className="h-1 bg-[#EB5765] m-4" />
                                <p className="text-center">Alessandra Barajas</p>
                            </div>
                        </div>
                        <div className="p-6 border-4 bg-[#FFE4E1]  border-[#036C65] rounded-xl divide-[#EB5765]">
                            <div className='flex justify-center gap-6'>
                                <Rating name="read-only" value={5} readOnly color='#EB5765' />
                                <svg fill="#036C65" width="25px" height="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="10.24"></g><g id="SVGRepo_iconCarrier"><path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path></g></svg>
                            </div>
                            <div className="text-justify">
                                <p className="mt-4">Recomiendo al 100% los tratamientos que realizan. Despues de haber recibido uno me siento rejuvenecida.</p>
                                <hr className="h-1 bg-[#EB5765] m-4" />
                                <p className="text-center">Fernanda Rodriguez</p>
                            </div>
                        </div>
                        <div className="p-6 border-4 bg-[#FFE4E1]  border-[#036C65] rounded-xl divide-[#EB5765]">
                            <div className='flex justify-center gap-6'>
                                <Rating name="read-only" value={5} readOnly color='#EB5765' />
                                <svg fill="#036C65" width="25px" height="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="10.24"></g><g id="SVGRepo_iconCarrier"><path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path></g></svg>
                            </div>
                            <div className="text-justify">
                                <p className="mt-4">Un ambiente super agradable y muy buena atencion, gran variedad de servicios. Definitivamente volveria.</p>
                                <hr className="h-1 bg-[#EB5765] m-4" />
                                <p className="text-center">Corina Ortiz</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-white md:col-start-2 md:col-end-3 divide-[#EB5765]">
                            <div>
                                <p>Calificación global</p>
                                <Rating name="read-only" value={5} readOnly />
                            </div>
                            <div className="">
                                <p className='text-sm'>111 calificaciones generales</p>
                                <hr className="h-1 bg-[#EB5765] m-4" />
                                <p>Calificacion de
                                    Spa - Salon & Beauty</p>
                                <Rating name="read-only" value={5} readOnly size="small" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-0 h-64 bg-gradient-to-b from-[transparent] to-[#036C65]'></div>
            </div >
        </>
    );
}

export default Comentarios

// function Comentarios({ comentarios }) {
//     return (
//         <div>
//             {comentarios.map((comentario) => (
//                 <Comentario key={comentario.id} comentario={comentario} />
//             ))}
//         </div>
//     );
// }