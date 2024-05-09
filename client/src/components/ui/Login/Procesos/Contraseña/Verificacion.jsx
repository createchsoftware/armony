import user1 from "../../../../../../public/pictures/userCl.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faEye,
  faEyeSlash,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Verificacion = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="h-[470px] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
        <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
          <img src={user1} alt="" className="logo1 absolute h-full" />
        </div>
        <h1 className="mx-auto p-7 text-rose-400 text-4xl">
          Restablecer contraseña
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
            Recuperación
          </a>
          <div className="flex-grow border-t border-[#036C65] pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa2}
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
        <h2 className="mx-auto my-5 w-4/5">
          {" "}
          {/* Hacer que el correo del texto se funcional */}
          Ingrese el código de verificación enviado a cl******my.com para
          continuar con el proceso
        </h2>
        <form action="" className="flex mx-auto text-4xl">
          <input
            id="cd-1"
            type="text"
            placeholder="0"
            className="bg-slate-200 w-16 h-[72px] rounded-xl mb-5 mt-2 mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
          />
          <input
            id="cd-2"
            type="text"
            placeholder="0"
            className="bg-slate-200 w-16 h-[72px] rounded-xl mb-5 mt-2 mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
          />
          <input
            id="cd-3"
            type="text"
            placeholder="0"
            className="bg-slate-200 w-16 h-[72px] rounded-xl mb-5 mt-2 mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
          />
          <input
            id="cd-4"
            type="text"
            placeholder="0"
            className="bg-slate-200 w-16 h-[72px] rounded-xl mb-5 mt-2 mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
          />
          <input
            id="cd-5"
            type="text"
            placeholder="0"
            className="bg-slate-200 w-16 h-[72px] rounded-xl mb-5 mt-2 mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
          />
          <input
            id="cd-6"
            type="text"
            placeholder="0"
            className="bg-slate-200 w-16 h-[72px] rounded-xl mb-5 mt-2 mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
          />
        </form>
        <a href="" className="text-teal-700 text-center">
          Reenviar código de verificación
        </a>
        <div className="grid grid-cols-2 my-auto">
          <div className="grid place-content-start ml-8">
          <a href="/"><button
              aria-label="Cancelar"
              className="bg-white text-rose-400 text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
            >
              Cancelar
            </button></a>
          </div>
          <div className="grid place-content-end mr-8">
          <a href="/spa/resetPassword/NuevaContrasena"><button
              aria-label="Continuar"
              className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
            >
              Continuar
            </button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verificacion;
