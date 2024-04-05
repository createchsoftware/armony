import presentacion from '../../../public/pictures/presentacion.png'
function Presentacion() {
    return (
        <div className='mx-32 font-[abeatbykai] selection:bg-[#EB5765] selection:text-white flex'>
            <body className='w-1/2 px-10'>
                <header className='flex items-center gap-20 justify-left'>
                    <div className="text-2xl">
                        <a href="#" className="m-1.5 p-1.5">
                            <img className="w-48 w-30" src="https://camo.githubusercontent.com/204dc7eb356bf51bfa051c1e9b4e3d24c0bc9da4a4e5fb25c801e8797a12a154/68747470733a2f2f66696c65732e636174626f782e6d6f652f6a3175386f632e706e67" alt="" />
                        </a>
                    </div>
                    <div className='text-4xl font-black'>
                        <h1>realza tu belleza interior.</h1>
                    </div>
                </header>
                <p className='text-2xl font-bold text-[#036C65] mt-12'>
                    Nos especializamos en brindarte servicios y productos que resalten tu belleza interior.
                </p>
                <p className='mt-8'>
                    En armony nos dedicamos a ofrecer una experiencia integral de bienestar y belleza, que incluye servicios de spa, tratamientos de belleza, atención clínica, oportunidades de emprendimiento y una tienda colectiva de regalos. Nuestro compromiso es proporcionar un enfoque integral para el cuidado personal, la relajación y el desarrollo personal. Te invitamos a descubrir todo lo que armony tiene para ofrecer, y a sumergirte en un mundo de serenidad, belleza y crecimiento personal. ¡Bienvenido a armony, donde la armonía es nuestra filosofía de vida!
                </p>
            </body>
            <aside className='w-1/2 '>
                <img src={presentacion} alt="" />
            </aside>
        </div>
    )
}

export default Presentacion