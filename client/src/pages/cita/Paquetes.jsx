import Paquete from '../../components/ui/Paquete';
import ContenedorPaquetes from '../../components/ui/ContenedorPaquetes';

const paquetes = [
    {
        id: 1,
        nombre: "Paquete 1",
        descripcion: "Facial Hidratante",
        precio: 500
    },
    {
        id: 2,
        nombre: "Paquete 2",
        descripcion: "Facial Limpiador",
        precio: 500
    },
    {
        id: 3,
        nombre: "Paquete 3",
        descripcion: "Facial suavizante",
        precio: 500
    },]


function Paquetes() {
    return (
        <>
            <h1 className='flex justify-center justify-self-center text-2xl px-8 w-1/4  m-auto border-b-2 border-b-[#ec5766] font-bold mb-10'>
                Selecciona tus sesiones
            </h1>
            <div className='grid'>
                <div className='mx-12 gap-28 md:flex'>
                    <div className='grid gap-6 p-6 text-center md:w-1/4 '>
                        <img className='m-auto rounded-2xl' src="./../../../pictures/1cafeteria.jpg" alt="" />
                        <div className='p-8 text-xs text-justify text-black border-4 border-rose-400 rounded-3xl bg-rose-200'>
                            <h2 className='mb-4 text-2xl font-bold text-center md:mb-0'>Facial</h2>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam distinctio hic doloremque facere officiis dignissimos provident mollitia pariatur aut quae temporibus ipsam suscipit fugiat, quas commodi dolores qui ratione praesentium!</div>
                    </div>
                    <div className='md:w-[60%] text-sm md:text-md py-6 '>
                        <div className='flex w-2/3 gap-4 mb-6 ml-40 text-xs md:justify-around md:ml-auto md:w-1/3 md:mr-12'>
                            <div>1 Sesion</div>
                            <div>5 Sesiones</div>
                            <div>10 Sesiones</div>
                        </div>
                        {/* <div className='grid gap-4'>
                            {paquetes.map((paquete) => (
                                <Paquete key={paquete.id} paquete={paquete} />
                            ))}
                        </div> */}
                        <div className='grid gap-4'>
                            <ContenedorPaquetes paquetes={paquetes} />
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Paquetes;