import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Error = () => {
    return(
        <>
            <div className="grid h-screen w-100 justify-center">
                <h1 className="text-center content-center text-2xl">
                    ERROR 404
                </h1>
                <h2 className="text-center content-center text-l">
                    ¡Oh vaya! Parece que está vacío por aquí.
                </h2>
                <a href="/" className='text-black text-center content-center underline'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Regresar
                </a>
            </div>
        </>
    )
}
export default Error;