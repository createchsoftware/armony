import user1 from "../../../../public/pictures/userAdmin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputContrasena from "../InputContrasena.jsx";
import { faAngleLeft, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Admin = ({ cerrar }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
        <div className="relative w-[25rem] md:w-[30rem] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative w-[7rem] h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <div className="grid grid-cols-2">
            <a
              className="ml-5 justify-self-start"
              aria-label="Regresar"
              onClick={cerrar.change}
            >
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
            <a className="mr-5 justify-self-end" aria-label="Cerrar">
              <FontAwesomeIcon
                style={{ fontSize: "24px" }}
                icon={faCircleXmark}
                onClick={cerrar.close}
              />
            </a>
          </div>
          <h1 className="mx-auto p-3 md:p-4 text-[#036C65] text-3xl text-center">
            Accede a tu cuenta
          </h1>
          <form className="text-sm md:text-base">
            <div className="mb-3 md:mb-4 ml-6 md:ml-10">
              <label htmlFor="user" className="pt-3">
                Usuario
              </label>
              <input
                className="bg-slate-200 rounded-full mb-3 mt-2 py-3 w-[22rem] md:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#036C65] focus:border-transparent px-6"
                type="text"
                id="user"
                name="user"
                placeholder="Ingresa tu ID de usuario"
              />
              <label htmlFor="pass" className="pt-3">
                Contraseña
              </label>
              <InputContrasena
                props={{
                  texto: "Ingresa tu Contraseña",
                  class:
                    "bg-slate-200 rounded-full mb-3 mt-2 py-3 w-[22rem] md:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#036C65] focus:border-transparent px-6",
                  classEye:
                    "relative -bottom-[2.5rem] md:-bottom-[2.75rem] left-[15rem] md:left-[17rem]",
                }}
              />
            </div>
          </form>
          <button
            className="flex bg-[#EB5765] text-white text-xl rounded-full px-4 py-2 mx-auto mb-8 hover:bg-red-200"
            aria-label="Iniciar Sesión"
          >
            Inicia Sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
