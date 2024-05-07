

function HorasDisponibles({ horasDisponibles }) {
    return (
        <div className="horas-disponibles">
            <h2>Horas Disponibles</h2>
            <ul>
                <li key={index}>{horasDisponibles}</li>
            </ul>
        </div>
    );
}

export default HorasDisponibles;