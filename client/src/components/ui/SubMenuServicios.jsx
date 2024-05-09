
function MenuServicios() {
    return (
        <div className="menu-servicio">
            <ul className="menu-serv">
                <li className="menu-item-serv">
                    <a href="/spa/servicios/spa" className="menu-link-serv">
                        Spa
                    </a>
                </li>
                <li className="menu-item-serv">
                    <a href="/spa/servicios/estetica" className="menu-link-serv" id="estetica">
                        Estética
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default MenuServicios;