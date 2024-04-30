import Servicio from './Servicio.jsx'

function Test() {
    const servicios = [
        {
            nombre: 'Masaje relajante',
            descripcion: 'Un masaje relajante es un masaje que tiene como objetivo principal relajar la musculatura y eliminar las tensiones acumuladas en el cuerpo.',
            precio: 500,
            imagen: '../../../pictures/2wellness.jpg',
            categoria: 'Masajes'
        },
        {
            nombre: 'Masaje reductivo',
            descripcion: 'El masaje reductivo es un tratamiento que se realiza con movimientos fuertes y rápidos sobre las áreas con mayor concentración de tejido adiposo.',
            precio: 600,
            imagen: 'https://via.placeholder.com/150',
            categoria: 'Masajes'
        },
        {
            nombre: 'Masaje de drenaje linfático',
            descripcion: 'El drenaje linfático manual es una técnica de masoterapia que se engloba en el campo de la fisioterapia y la estética.',
            precio: 700,
            imagen: 'https://via.placeholder.com/150',
            categoria: 'Masajes'
        },
        {
            nombre: 'Facial de diamante',
            descripcion: 'El facial de diamante es un tratamiento de belleza que se realiza con puntas de diamante y que ayuda a exfoliar la piel.',
            precio: 800,
            imagen: 'https://via.placeholder.com/150',
            categoria: 'Faciales'
        },
        {
            nombre: 'Facial de oro',
            descripcion: 'El facial de oro es un tratamiento de belleza que se realiza con partículas de oro y que ayuda a rejuvenecer la piel.',
            precio: 900,
            imagen: 'https://via.placeholder.com/150',
            categoria: 'Faciales'
        },
        {
            nombre: 'Facial de colágeno',
            descripcion: 'El facial de colágeno es un tratamiento de belleza que se realiza con colágeno y que ayuda a hidratar la piel.',
            precio: 1000,
            imagen: 'https://via.placeholder.com/150',
            categoria: 'Faciales'
        },
    ];

    return (

        <div className='grid grid-cols-4 gap-6'>
            {
                servicios.map(servicio => (
                    <Servicio
                        key={servicio.nombre}
                        nombre={servicio.nombre}
                        descripcion={servicio.descripcion}
                        precio={servicio.precio}
                        imagen={servicio.imagen}
                        categoria={servicio.categoria}
                    />
                ))
            }
        </div>
    )
}

export default Test