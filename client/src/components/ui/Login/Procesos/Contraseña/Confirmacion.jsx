import user1 from "../../../../../../public/pictures/userCl.png";
import Pasos from "../../../PasosDeProcesos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Confirmacion = () => {
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
          <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa3}
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
            Nueva Contraseña
          </a>
          <div className="flex-grow border-t border-[#036C65] pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa4}
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
            Confirmación
          </a>
          </div>*/}
          <div className="grid grid-cols-1 mx-5 mb-3 md:mx-auto md:my-auto place-items-center">
            <h2 className="mt-5 lg:mt-0 text-center">
              ¡Tu contraseña se restableció de forma exitosa!
            </h2>
            <h2 className="text-gray-500 mt-5 md:mt-10 text-center">
              El proceso ha terminado y ahora podrás volver a iniciar sesión.
            </h2>
            <h2 className="text-gray-500 text-center">
              ¡No olvides tu contraseña!
            </h2>
          </div>
          <div className="grid place-content-center">
            <a href="/">
              <button
                aria-label="Finalizar"
                className="w-[13rem] h-[2.75rem] lg:w-[15rem] lf:h-[3.5rem] bg-rose-400 text-white text-lg lg:text-xl rounded-full px-4 py-2 mx-auto my-auto md:my-10 hover:bg-red-200"
              >
                Regresar a Armony
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;
