import user1 from "../../../../../../public/pictures/userGuest.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const ConfirmacionCuenta = () => {
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
            Información básica
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
            Contraseña
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
        </div>
        <div className="grid grid-cols-1 mx-auto my-auto place-items-center">
          <h2 className="w-2/3 text-center text-lg text-rose-400 my-3">
            ¡Tu contraseña ha sido creada de forma exitosa!
          </h2>
          <h2 className="w-2/3 text-center text-lg text-teal-700 mt-1 mb-3">
            El proceso ha terminado y ahora podrás iniciar sesión cuando
            quieras.
          </h2>
          <h2 className="w-2/3 text-center text-sm">
            Recuerda que al tener cuenta, no solo sirve para puedas saber de ti,
            también sirve para que puedas guardar tus servicios favoritos,
            realizar compras, agregar a favoritos y sobre todo, para compartir
            tus experiencias con clientes como tú.
          </h2>
        </div>
        <div className="grid grid-cols-1 my-auto place-items-end">
          <button
            aria-label="Regresar al inicio"
            className="w-52 bg-rose-400 text-white text-xl rounded-full px-4 py-2 mr-8 hover:bg-red-200"
          >
            Regresar al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionCuenta;
