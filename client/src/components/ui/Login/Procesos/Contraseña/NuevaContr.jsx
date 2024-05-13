import user1 from "../../../../../../public/pictures/userCl.png";
import Pasos from "../../../PasosDeProcesos.jsx";
import InputContrasena from "../../../InputContrasena.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const NuevaContr = () => {
  return (
    <div>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[25rem] w-[25rem] md:h-[24rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="relative w-[6rem] h-[6rem] lg:w-[7rem] lg:h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <h1 className="mx-auto pt-8 pb-4 md:p-5 lg:p-7 text-rose-400 text-2xl md:text-3xl lg:text-4xl">
            Restablecer contraseña
          </h1>
          <Pasos
            props={{
              paso1: "Recuperación",
              paso2: "Verificación",
              paso3: "Nueva Contraseña",
              paso4: "Confirmación",
            }}
          />
          {/*<div className="grid grid-cols-[50px_auto_20px_50px_auto_20px_50px_auto_20px_50px_auto] place-items-center px-5 mx-auto">
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
            Recuperación
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
            Verificación
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
            Nueva Contraseña
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
          </div>*/}
          <div className="absolute mt-5">
            <a className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
          </div>
          <h2 className="grid place-items-center mx-4 my-2 md:my-4 lg:my-6 md:text-sm lg:text-base">
            Asigna una nueva contraseña a tu cuenta
          </h2>
          <form action="" className="grid grid-cols-[auto_auto] mx-auto">
            <div className="my-auto ml-2 text-sm lg:text-base">
              <label htmlFor="">Nueva contraseña</label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="relative">
              <InputContrasena
                props={{
                  texto: "Ingresa tu nueva contraseña",
                  class:
                    "bg-slate-200 md:text-sm lg:text-base rounded-full w=[15rem] md:w-96 mb-3 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
                  classEye:
                    "absolute justify-end left-[17.25rem] md:left-[22.75rem] top-[1rem]",
                }}
              />
            </div>
            <div className="my-auto ml-2 text-sm lg:text-base">
              <label htmlFor="">Confirmar contraseña</label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="relative">
              <InputContrasena
                props={{
                  texto: "Vuelve a ingresar tu nueva contraseña",
                  class:
                    "bg-slate-200 md:text-sm lg:text-base rounded-full w=[15rem] md:w-96 mb-1 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
                  classEye:
                    "absolute justify-end left-[17.25rem] md:left-[22.75rem] top-[1rem]",
                }}
              />
            </div>
          </form>
          <div className="grid grid-cols-2 my-auto">
            <div className="grid place-content-start ml-8">
              <a href="/">
                <button
                  aria-label="Cancelar"
                  className="bg-white text-rose-400 md:text-large lg:text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
                >
                  Cancelar
                </button>
              </a>
            </div>
            <div className="grid place-content-end mr-8">
              <a href="/spa/resetPassword/Confirmacion">
                <button
                  aria-label="Continuar"
                  className="bg-rose-400 text-white md:text-large lg:text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
                >
                  Continuar
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaContr;
