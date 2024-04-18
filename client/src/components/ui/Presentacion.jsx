import presentacion2 from '../../../public/pictures/presentacion2.png';
import greenLeft2 from '../../../public/pictures/greenLeft2.png';

function Presentacion() {
    return (
        <>
            <div className='p-4 bg-gradient-to-r w-2/3 md:w-1/3  mt-16 from-[#FAD0C4] to-[#FF9A9E] rounded-r-full left-0 z-100' id="info">
                <h1 className=" text-4xl md:text-6xl font-[iloveglitter] text-[#036C65]">En armony spa...</h1>
            </div>
            <img src={greenLeft2} alt="" className='absolute w-[12%] left-0 translate-y-[-8rem] z-[-1]' />
            <div className="selection:text-white selection:bg-[#EB5765] m-auto w-[70%] grid place-content-center ">
                <div className="items-center gap-0 text-center md:grid md:grid-cols-2 place-content-center">
                    <div className='md:p-16 bg-gradient-[#F6EECF] mt-0  from-[#F6EECF] to-[#DDF3FA] rounded-xl'>
                        <p className='font-[abeatbyKai] mt-6  md:text-2xl text-[rgb(3,108,101)]'>El que te veas hermosa y te sientas bien es nuetras prioridad, por ello,
                            ven y consiéntete con nuestro equipo de terapeutas y estilistas expertos
                            que te proporcionarán desde tratamientos faciales rejuvenecedores y masajes
                            relajantes, hasta un nuevo corte de cabello y maquillaje para esas ocasiones
                            específicas.</p>
                        <div className='mt-4 m-auto w-24 h-24 bg-[#edd5d7] rounded-full p-6'>
                            <img className='aspect-square w-28 ' src="../../../pictures/logoArmony.png" alt="" id="logo2" />
                        </div>
                    </div>
                    <img src={presentacion2} alt="" />
                </div>
            </div>
        </>
    )
}

export default Presentacion;

{/* 
import presentacion from '../../../public/pictures/presentacion.png'

function Presentacion() {
    return (
        <div className='spa-armony'>
            <h1 id="titulo-spa">En armony spa...</h1>
            <div className="spa-present">
                <section className="spa1">
                    <h3 id="text-spa">
                        El que te veas hermosa y te sientas bien es nuetras prioridad, por ello,
                        ven y consiéntete con nuestro equipo de terapeutas y estilistas expertos
                        que te proporcionarán desde tratamientos faciales rejuvenecedores y masajes
                        relajantes, hasta un nuevo corte de cabello y maquillaje para esas ocasiones
                        específicas.
                    </h3>
                    <div id="logo-circ">
                        <img src="../../../pictures/logoArmony.png" alt="" id="logo2" />
                    </div>
                </section>
                <section className="spa2">
                    <img src="../../../pictures/ArmonySpa.png" alt="" id="fondo1" />
                </section>
            </div>
        </div>
    )
}

export default Presentacion;
*/}