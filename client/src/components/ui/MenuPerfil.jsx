import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPen, faBagShopping, faCalendarDays, faMoneyBill ,faClockRotateLeft, faCreditCard, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
function MenuPerfil({cerrarsesion}){
    return (
        <div className="menu-perfil">
            <ul className="menu-nav-perfil">
                <li className="menu-item-perfil">
                    <a href="/perfil" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faUser} className='text-black' />
                        <p className='ml-5'>Mi perfil</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/informacion" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faUserPen} className='text-black' />
                        <p className='ml-4'>Editar perfil</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="#" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faBagShopping} className='text-black' />
                        <p className='ml-6'>Mis pedidos</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="#" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faCalendarDays} className='text-black' />
                        <p className='ml-5'>Agenda</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/monedero" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faMoneyBill} className='text-black' />
                        <p className='ml-5'>Monedero</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="#" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faClockRotateLeft} className='text-black' />
                        <p className='ml-5'>Historial</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a href="/perfil/tarjetas" className="menu-link-perfil">
                        <FontAwesomeIcon icon={faCreditCard} className='text-black' />
                        <p className='ml-5'>Tarjetas</p>
                    </a>
                </li>
                <li className="menu-item-perfil">
                    <a className="menu-link-perfil" onClick={cerrarsesion}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-black' />
                        <p className='ml-5'>Cerrar sesión</p>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default MenuPerfil;