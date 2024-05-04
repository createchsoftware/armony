import Paquete from '../../components/ui/Paquete';

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
    },
    {
        id: 4,
        nombre: "Paquete 4",
        descripcion: "Facial purificante",
        precio: 500
    },
    {
        id: 5,
        nombre: "Paquete 5",
        descripcion: "Facial rejuvenecedor",
        precio: 500
    },]


function Paquetes() {
    return (
        <div className='grid m-12'>
            <div className='gap-6 md:flex '>
                <div className='text-center md:w-1/3 md:p-12'>
                    <img className='m-auto rounded-2xl' src="./../../../public/pictures/1cafeteria.jpg" alt="" />
                    <h1 className='m-4 text-2xl font-bold'>Facial</h1>
                    <p className='p-8 m-8 text-justify text-white border-2 border-black md:m-4 rounded-3xl bg-rose-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam distinctio hic doloremque facere officiis dignissimos provident mollitia pariatur aut quae temporibus ipsam suscipit fugiat, quas commodi dolores qui ratione praesentium!</p>
                </div>
                <div className='md:w-[60%] text-sm md:text-md py-6 '>
                    <h1 className='mb-6 text-3xl font-semibold text-center'>Paquetes</h1>
                    <div className='flex w-2/3 gap-4 mb-6 ml-40 text-xs md:justify-around md:ml-auto md:w-1/3 md:mr-12'>
                        <div>1 Sesion</div>
                        <div>5 Sesiones</div>
                        <div>10 Sesiones</div>
                    </div>
                    <div className='grid gap-4'>
                        {paquetes.map((paquete) => (
                            <Paquete key={paquete.id} paquete={paquete} />
                        ))}
                    </div>
                </div>

            </div>
            <div className="flex justify-center gap-2 my-12">
                <div className="grid place-content-center">
                    <button
                        aria-label="Cancelar"
                        className="px-4 py-2 mx-auto text-xl bg-white rounded-full text-rose-400 hover:bg-red-50 ring-2 ring-rose-400"
                    >
                        Regresar
                    </button>
                </div>
                <div className="grid place-content-end">
                    <button
                        aria-label="Continuar"
                        className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-[#036C65] hover:bg-opacity-70"
                    >
                        Cancelar
                    </button>
                </div>
                <div className="grid place-content-end">
                    <button
                        aria-label="Continuar"
                        className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Paquetes;