// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBasketShopping, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
// ^^^ ICONOS PREPARADOS PARA EMPEZAR PAGINA DE "LISTA DE DESEOS"
import LayoutPrincipal from '../../layouts/LayoutPrincipal';

function ListaDeseo() {
    return (
        <>
            <LayoutPrincipal>
                <div className='mt-60 grid justify-center'>
                    <h5>¡Alto ahí!</h5>
                    <h1>Aquí estará la página de favoritos, o mejor dicho, lista de deseos...</h1>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className='underline' >
                        Puedes regresar a la página de inicio con éste texto.
                    </a>
                </div>
                <div>
                    <div>
                    {/* Filtro */}
                    </div>
                    <div>
                    {/* Contenido */}
                    </div>
                </div>
            </LayoutPrincipal>
        </>
    );
}

export default ListaDeseo;