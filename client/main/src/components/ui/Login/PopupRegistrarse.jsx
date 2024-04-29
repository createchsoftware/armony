import user1 from "../../../../public/pictures/userGuest.png";
import gl from "../../../../public/pictures/googlelogo.png";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const PopupRegistrarse = ({ actionElement }) => {
  return (
    <Popup trigger={actionElement} modal nested>
      {(close) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
          <div className="relative max-w-[470px] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center rounded-full bg-white bg-clip-border shadow-lg">
              <img src={user1} alt="" className="logo1 absolute h-full" />
            </div>
            <div className="grid grid-cols-2">
              <a
                className="ml-5 justify-self-start"
                aria-label="Regresar"
                onClick={close}
              >
                <FontAwesomeIcon
                  style={{ fontSize: "22px" }}
                  icon={faAngleLeft}
                />{" "}
                Regresar
              </a>
              <a
                className="mr-5 justify-self-end"
                aria-label="Cerrar"
                onClick={close}
              >
                <FontAwesomeIcon
                  style={{ fontSize: "24px" }}
                  icon={faCircleXmark}
                  /*  color: "#87B87F" */
                />
              </a>
            </div>
            <h1 className="mx-auto p-5 text-rose-400 text-3xl">
              Crear cuenta nueva
            </h1>
            <div className="grid place-items-center mx-16">
              <a
                href="/spa/signUp"
                className="mt-5 bg-teal-700 text-white text-xs px-4 py-4 hover:bg-teal-500"
                aria-label="Crear cuenta"
              >
                Crear cuenta con correo electrónico y contraseña
              </a>
            </div>
            <div className="relative flex py-2 place-items-center mx-auto w-2/5">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">o</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <img src={gl} className="absolute size-6 bottom-11 left-36" />
            <button
              className="mb-8 bg-blue-400 text-white text-sm pl-10 pr-4 py-3 mx-auto hover:bg-blue-300"
              aria-label="Continuar con Google"
            >
              Continuar con Google
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopupRegistrarse;
