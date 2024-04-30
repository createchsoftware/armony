import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'

function Productos({ productos }) {
    return (
        <div className="w-2/3 m-auto md:w-auto">
            <ul className='grid grid-cols-1 gap-2 md:grid-cols-4 md:ml-28'>
                {
                    productos.map(producto => (
                        <li key={productos.id} className='grid place-content-between justify-between  border-4 bg-white border-[#E2B3B7] p-6 rounded-xl'>
                            <img className='m-auto rounded-lg w-36 md:w-48 aspect-square'
                                src={'https://www.gravatar.com/avatar/8ddae1579d3e5b9bb2ebb9be0f7ace48?s=64&d=identicon&r=PG&f=y&so-version=2'}
                                alt={producto.nombre}
                            />
                            <div>
                                <p className='mt-4  text-[#0BC26A] text-lg'>{'$' + producto.precio + ' MXN'}</p>
                                <h3 className='mt-2 text-lg'>{producto.name}</h3>
                                <p className='mt-2 text-xs text-justify'>
                                    {producto.descripcion}
                                </p>
                            </div>
                            <div className='mt-4'>
                                <button className=" text-sm w-48 transition-all duration-300  hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200"><span>Agregar al carrito</span> <IconoAgregarAlCarrito /> <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Productos