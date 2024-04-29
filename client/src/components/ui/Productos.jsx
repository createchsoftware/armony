import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'

function Productos({ productos }) {
    return (
        <div className="w-2/3 m-auto md:w-auto">
            <ul className='grid grid-cols-1 gap-2 md:grid-cols-4 md:ml-28'>
                {
                    productos.map(producto => (
                        <li key={productos.id} className='grid place-content-between justify-between h-auto border-4 bg-white border-[#E2B3B7] p-6 rounded-xl'>
                            <img className='m-auto rounded-lg aspect-square'
                                src={producto.thumbnail}
                                alt={producto.title}
                            />
                            <div>
                                <p className='mt-4  text-[#0BC26A] text-lg'>{'$' + producto.price + ' MXN'}</p>
                                <h3 className='mt-2 text-lg'>{producto.title}</h3>
                                <p className='mt-2 text-xs text-justify'>
                                    {producto.description.length > 70 ? producto.description.substring(0, 60) + "..." : producto.description}
                                </p>
                            </div>
                            <div className='mt-4'>
                                <button class=" text-xs transition-all duration-300 px-2 m-auto hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agregar al carrito</span> <IconoAgregarAlCarrito /> <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Productos