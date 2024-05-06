import user1 from "../../../../../../public/pictures/userCl.png";
import Pasos from "../../../PasosDeProcesos.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Recuperacion = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="h-[470px] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
        <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
          <img src={user1} alt="" className="logo1 absolute h-full" />
        </div>
        <h1 className="mx-auto p-7 text-rose-400 text-4xl">
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
        <div className="absolute mt-5">
          <a className="ml-3">
            <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faAngleLeft} />{" "}
            Regresar
          </a>
        </div>
        <h2 className="mx-auto my-6">
          Ingresa tu correo asociado a tu cuenta para restablecer tu contraseña
        </h2>
        <form action="" className="mx-auto">
          <label htmlFor="">Correo</label>
          <label htmlFor="" className="text-red-800">
            *
          </label>
          <input
            id="email"
            type="text"
            placeholder="Ej: cliente@armony.com"
            className="bg-slate-200 rounded-full w-96 mb-1 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
          />
        </form>
        <div className="relative flex py-2 place-items-center mx-auto w-2/5">
          <div className="flex-grow border-t border-gray-400 pl-5 mx-0"></div>
          <span className="flex-shrink mx-4 text-gray-400">o</span>
          <div className="flex-grow border-t border-gray-400 pr-5 mx-0"></div>
        </div>
        <a href="" className="text-teal-700 text-center">
          Restablecer mediante teléfono
        </a>
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

export default Recuperacion;
