import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation , faPersonDigging } from '@fortawesome/free-solid-svg-icons';

function Proximamente(){

    return (
        <div className="soon">
            <h1 className="soon-title">
                <FontAwesomeIcon icon={faTriangleExclamation} id='alarm' />
                ¡Próximamente!
                <FontAwesomeIcon icon={faTriangleExclamation} id='alarm' />
            </h1>
            <h4 className="soon-desc">
                Esto está en construcción. <br />
                ¡Prohibido el paso! <br />
                <FontAwesomeIcon icon={faPersonDigging} id='alarm' />
            </h4>
        </div>
    );
}

export default Proximamente;