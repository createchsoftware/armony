import user1 from "../../../../../../public/pictures/userGuest.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputContrasena from "../../../InputContrasena.jsx";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Contrasena = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="h-[470px] max-w-[765px] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
        <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
          <img src={user1} alt="" className="logo1 absolute h-full" />
        </div>
        <h1 className="mx-auto p-5 text-rose-400 text-3xl">
          Crear cuenta nueva
        </h1>
        <div className="grid grid-cols-[50px_auto_20px_50px_auto_20px_50px_auto_20px_50px_auto] place-items-center px-5 mx-auto">
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa1}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
            }}
            className="text-base mx-2"
          >
            Información Básica
          </a>
          <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa2}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
            }}
            className="text-base mx-1"
          >
            Patologías
          </a>
          <div className="flex-grow border-t border-[#036C65] pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa3}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px", color: "#036C65" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
              color: "#036C65",
            }}
            className="text-base mx-1"
          >
            Contraseña
          </a>
          <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa4}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
            }}
            className="text-base mx-1"
          >
            Confirmación
          </a>
        </div>
        <div className="absolute mt-5">
          <a className="ml-3">
            <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faAngleLeft} />{" "}
            Regresar
          </a>
        </div>
        <div className="grid grid-cols-2 mt-5 mb-2">
          <div className="ml-10 mr-4">
            <h3 className="mx-auto mb-3 text-red-500">
              Requisitos de la contraseña
            </h3>
            <h4 className="text-xs"> • Al menos 8 caracteres</h4>
            <h4 className="text-xs"> • Una letra mayúscula</h4>
            <h4 className="text-xs"> • Una letra minúscula</h4>
            <h4 className="text-xs"> • Un número</h4>
            <h4 className="text-xs"> • Al menos un carácter especial</h4>
            <h4 className="text-xs">
              {" "}
              • La contraseña no debe coincidir con su ID de correo electrónico
              y debe distinguir entre mayúsculas y minúsculas
            </h4>
          </div>
          <div>
            <form action="" className="grid grid-cols-1 place-content-start">
              <div>
                <label htmlFor="">Nueva contraseña</label>
                <label htmlFor="" className="text-red-800">
                  *
                </label>
              </div>
              <div className="relative">
                <InputContrasena
                  props={{
                    texto: "Ingresa tu Contraseña",
                    class:
                      "bg-slate-200 rounded-full w-[365px] mb-3 mt-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
                    classEye:
                      "absolute top-[2.5rem] md:top-[1rem] left-[15rem] md:left-[20.75rem]",
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Confirmar contraseña</label>
                <label htmlFor="" className="text-red-800">
                  *
                </label>
              </div>
              <div className="relative">
                <InputContrasena
                  props={{
                    texto: "Ingresa tu Contraseña",
                    class:
                      "bg-slate-200 rounded-full w-[365px] mb-3 mt-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
                    classEye:
                      "absolute top-[2.5rem] md:top-[1rem] left-[15rem] md:left-[20.75rem]",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-[5%_auto] ml-8">
          <input type="checkbox" name="acept" id="state" value={true} />
          <h4 className="text-xs">
            Al hacer click en "Registrarme", aceptas nuestras{" "}
            <a href="" className="text-blue-600">
              Condiciones
            </a>
            , la{" "}
            <a href="" className="text-blue-600">
              Politica de Privacidad
            </a>{" "}
            y la{" "}
            <a href="" className="text-blue-600">
              Politica de Cookies
            </a>
          </h4>
        </div>
        <div className="grid grid-cols-2 my-auto">
          <div className="grid place-content-start ml-8">
            <button
              aria-label="Cancelar"
              className="bg-white text-rose-400 text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
            >
              Cancelar
            </button>
          </div>
          <div className="grid place-content-end mr-8">
            <button
              aria-label="Continuar"
              className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contrasena;
