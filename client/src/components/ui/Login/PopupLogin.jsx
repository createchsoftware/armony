import user1 from "../../../../public/pictures/userCl.png";
import gl from "../../../../public/pictures/googlelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import PopupAdmin from "./PopupLoginAdmin";
import PopupRegistro from "./PopupRegistrarse";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const ModalLogin = ({ actionElement }) => {
  return (
    <Popup trigger={actionElement} modal nested>
      {(close) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
          <div className="relative max-w-[470px] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
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
              <PopupAdmin
                className="justify-self-stretch"
                actionElement={
                  <a
                    className="mr-5 justify-self-end"
                    aria-label="¿Eres Administrador?"
                  >
                    ¿Eres Administrador?
                  </a>
                }
              />
            </div>
            <h1 className="mx-auto p-5 text-rose-400 text-3xl">
              Accede a tu cuenta
            </h1>
            <form>
              <div className="my-5">
                <label htmlFor="user" className=" py-3 ml-10">
                  Usuario
                </label>
                <input
                  className="bg-slate-200 rounded-full mb-5 mt-2 mx-9 py-3 w-10/12 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
                  type="text"
                  id="user"
                  name="user"
                  placeholder="Ingresa tu ID de usuario"
                />
                <label htmlFor="pass" className="pt-3 mb-3 ml-10">
                  Contraseña
                </label>
                <a className="relative -bottom-11 left-[260px]">
                  <FontAwesomeIcon id="eye" icon={faEyeSlash} />
                </a>
                <input
                  className="bg-slate-200 rounded-full mb-5 mt-2 mx-9 py-3 w-10/12 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
                  type="password"
                  id="pass"
                  name="pass"
                  placeholder="Ingresa tu Contraseña"
                />
                <input
                  type="checkbox"
                  name="remember"
                  id="state"
                  className="mb-3 ml-10"
                  value={true}
                />
                <label htmlFor="remember" className="ml-2">
                  Recuerdame
                </label>
              </div>
            </form>
            <button
              className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
              aria-label="Iniciar Sesión"
            >
              Inicia Sesión
            </button>
            <div class="relative flex py-2 place-items-center mx-auto w-2/5">
              <div class="flex-grow border-t border-gray-400"></div>
              <span class="flex-shrink mx-4 text-gray-400">o</span>
              <div class="flex-grow border-t border-gray-400"></div>
            </div>
            <img src={gl} className="absolute size-6 bottom-28 left-36" />
            <button
              className="mb-8 bg-blue-400 text-white text-sm pl-10 pr-4 py-3 mx-auto hover:bg-blue-300"
              aria-label="Continuar con Google"
            >
              Continuar con Google
            </button>
            <div className="grid grid-cols-2">
              <h2 className="ml-5 justify-self-start">
                ¿Olvidaste tu contraseña?
              </h2>
              <h2 className="mr-5 justify-self-end">¿No tienes cuenta?</h2>
            </div>
            <div className="grid grid-cols-2 mb-5 text-teal-700">
              <a href="/spa/resetPassword" className="ml-7 justify-self-start">
                Restablecer contraseña
              </a>
              <PopupRegistro
                actionElement={
                  <a className="mr-4 justify-self-end">Crear cuenta nueva</a>
                }
              />
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ModalLogin;
