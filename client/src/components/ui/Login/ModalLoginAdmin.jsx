import user1 from "../../../../public/pictures/userAdmin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import Login from "./ModalLogin";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const toggleEye = () => {
  const eye = document.getElementById("eye")[0];
  const pass = document.getElementById("pass")[0];
  eye.addEventListener("click", () => {
    let type = "";
    let st = false;
    if (st === false) {
      st = true;
      type = "text";
    } else {
      st = false;
      type = "password";
    }
    pass.setAttribute("type", type);
  });
};

const ModalLoginAdmin = () => {
  return (
    <Popup
      trigger={
        <a
          className="mr-5 justify-self-end"
          aria-label="¿Eres Administrador?"
          onClick={close}
        >
          ¿Eres Administrador?
        </a>
      }
      modal
      nested
    >
      {(close) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative max-w-[470px] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
              <img src={user1} alt="" className="logo1 absolute top-0 h-full" />
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
                />
              </a>
            </div>
            <h1 className="mx-auto p-5 text-emerald-800 text-3xl">
              Accede a tu cuenta
            </h1>
            <form>
              <div className="my-5">
                <label htmlFor="user" className="pt-3 ml-10">
                  Usuario
                </label>
                <input
                  className="bg-slate-200 rounded-full mb-5 mt-2 mx-9 py-3 w-10/12 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent px-6"
                  type="text"
                  id="user"
                  name="user"
                  placeholder="Ingresa tu ID de usuario"
                />
                <label htmlFor="pass" className="pt-3 ml-10">
                  Contraseña
                </label>
                <a className="relative -bottom-11 left-[260px]">
                  <FontAwesomeIcon
                    id="eye"
                    icon={faEyeSlash}
                    onClick={toggleEye}
                  />
                </a>
                <input
                  className="bg-slate-200 rounded-full mb-5 mt-2 mx-9 py-3 w-10/12 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent px-6"
                  type="password"
                  id="pass"
                  name="pass"
                  placeholder="Ingresa tu Contraseña"
                />
                {/**
                 * 
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
                */}
              </div>
            </form>
            <button
              className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto mb-8 hover:bg-red-200"
              aria-label="Iniciar Sesión"
            >
              Inicia Sesión
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ModalLoginAdmin;
