import user1 from "../../../../../../public/pictures/userCl.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const ProcesoPassword1 = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col w-1/2 rounded-lg ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
        <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
          <img src={user1} alt="" className="logo1 absolute h-full" />
        </div>
        <a className="ml-3">
          <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faAngleLeft} />{" "}
          Regresar
        </a>
        <h1 className="mx-auto p-5 text-rose-400 text-4xl">
          Restablecer contraseña
        </h1>
        <div className="w-11/12 grid grid-cols-[6%_auto_3%_6%_auto_3%_6%_auto_3%_6%_auto] place-items-center mx-auto">
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
          <a href="" className="text-sm">
            Recuperación
          </a>
          <div className="flex-grow border-t border-gray-400 px-1 mx-0"></div>
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
          <a href="" className="text-sm">
            Verificación
          </a>
          <div className="flex-grow border-t border-gray-400"></div>
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
          <a href="" className="text-sm">
            Nueva Contraseña
          </a>
          <div className="flex-grow border-t border-gray-400"></div>
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
          <a href="" className="text-sm">
            Confirmación
          </a>
        </div>
        <h2 className="mx-auto my-5">
          Ingresa tu correo asociado a tu cuenta para restablecer tu contraseña
        </h2>
        <form action="" className="mx-auto">
          <label htmlFor="">Correo</label>
          <label htmlFor="" className="text-red-800">
            *
          </label>
          <input
            type="text"
            placeholder="Ej: cliente@armony.com"
            className="bg-slate-200 rounded-full mb-5 mt-2 mx-3 py-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
          />
        </form>
        <div className="relative flex py-2 place-items-center mx-auto w-2/5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">o</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <a href="" className="mb-5 text-teal-700 text-center">
          Restablecer mediante teléfono
        </a>
        <div className="grid grid-cols-2 my-10">
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

export default ProcesoPassword1;
