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