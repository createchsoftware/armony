// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
import flowes from '../../../public/pictures/flowers.png'
import Rating from '@mui/material/Rating';

function Comentarios() {
    return (
        <div className='py-16 bg-[image:var(--image-url)] bg-cover' style={{ '--image-url': `url(${flowes})`, }} >
            <div div className="w-[80%] m-auto  grid gap-6 selection:bg-[#EB5765] selection:text-white">
                <div className="">
                    <h1 className="text-center font-[iloveglitter] text-6xl text-white ">Comentarios destacados de nuestras clientas</h1>
                </div>
                <div className="font-[abeatbykai] text-xl text-[#036C65] grid items-center grid-cols-1 gap-4 md:grid-cols-3 place-content-center p-6">
                    <div className="p-6 border-4 border-[#036C65]  rounded-xl  bg-[#FFE4E1]  divide-[#EB5765]">
                        <div class="">
                            <Rating name="read-only" value={5} readOnly />
                        </div>
                        <div className="text-justify">
                            <p className="mt-4">Es un lugar muy limpio y lindo, perfecto para relajarse. El personal es super amable. Me hiso sentir muy comoda.</p>
                            <hr className="h-1 bg-[#EB5765] m-4" />
                            <p className="text-center">Alessandra Barajas</p>
                        </div>
                    </div>
                    <div className="p-6 border-4 bg-[#FFE4E1]  border-[#036C65] rounded-xl divide-[#EB5765]">
                        <div class="">
                            <Rating name="read-only" value={5} readOnly />
                        </div>
                        <div className="text-justify">
                            <p className="mt-4">Recomiendo al 100% los tratamientos que realizan. Despues de haber recibido uno me siento rejuvenecida.</p>
                            <hr className="h-1 bg-[#EB5765] m-4" />
                            <p className="text-center">Fernanda Rodriguez</p>
                        </div>
                    </div>
                    <div className="p-6 border-4 bg-[#FFE4E1]  border-[#036C65] rounded-xl divide-[#EB5765]">
                        <div class="">
                            <Rating name="read-only" value={5} readOnly />
                        </div>
                        <div className="text-justify">
                            <p className="mt-4">Un ambiente super agradable y muy buena atencion. Definitivamente volveria.</p>
                            <hr className="h-1 bg-[#EB5765] m-4" />
                            <p className="text-center">Corina Ortiz</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white md:col-start-2 md:col-end-3 divide-[#EB5765]">
                        <div class="">
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

        </div >
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