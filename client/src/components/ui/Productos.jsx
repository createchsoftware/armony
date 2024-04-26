import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'

function Productos({ productos }) {
    return (
        <div className="">
            <ul className='grid grid-cols-4 gap-4 w-[80%] m-auto'>
                {
                    productos.map(producto => (
                        <li key={productos.id} className='flex items-center flex-col justify-center   border-4 bg-white border-[#E2B3B7] p-6 rounded-xl'>
                            <img className='w-48 aspect-square'
                                src={producto.thumbnail}
                                alt={producto.title}
                            />
                            <div>
                                <p className='mt-4  text-[#0BC26A] text-lg'>{'$' + producto.price + ' MXN'}</p>
                                <h3 className='mt-2 text-lg'>{producto.title}</h3>
                                <p className='mt-2 text-xs'>{producto.description}</p>
                            </div>
                            <div className='mt-4'>
                                <button className=" text-sm w-48 transition-all duration-300  hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200"><span>Agregar al carrito</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Productos