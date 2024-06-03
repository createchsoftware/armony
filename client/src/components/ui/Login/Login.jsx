import user1 from "../../../../public/pictures/userCl.png";
import gl from "../../../../public/pictures/googlelogo.png";
import Soon from "../Proximamente";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import InputContrasenaLogin from "../InputContrasenaLogin";
import { faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import '../../../txt.css';

const Login = ({ cerrar }) => {

  

  const [soon, setSoon] = useState(false);

  const toggleSoon = () => {
    setSoon(!soon);
  };
  // ^^^ POP-UP EMERGENTE DE "PROXIMAMENTE"

  const changeAdmin = () => {
    {
      cerrar.change(true);
    }
  };
  const changeReg = () => {
    {
      cerrar.change(false);
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
        <div className="relative w-[25rem] md:w-[27rem] lg:w-[30rem] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md md:-bottom-5">
          <div className="relative w-[6rem] h-[6rem] md:w-[7rem] md:h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <div className="grid grid-cols-2">
            <a
              className="text-sm items-center lg:text-base ml-5 justify-self-start relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
              aria-label="Regresar"
              onClick={cerrar.close}
            >
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
            <a
              className="text-sm lg:text-base mr-5 justify-self-end relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
              aria-label="¿Eres Administrador?"
              onClick={changeAdmin}
            >
              ¿Eres Administrador?
            </a>
          </div>
          <h1 className="mx-auto p-3 md:p-1 lg:p-4 text-[#EB5765] text-2xl lg:text-3xl">
            Accede a tu cuenta
          </h1>
          <form>
            <div className="text-sm lg:text-base mb-3 md:mb-1 lg:mb-4 ml-6 md:ml-10">
              <label htmlFor="user" className="pt-3">
                Usuario
              </label>
              <input
                className="bg-slate-200 rounded-full text-sm lg:text-base mb-2 lg:mb-3 mt-1 lg:mt-2 py-2 lg:py-3 w-[22rem] lg:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#EB5765] focus:border-transparent px-6"
                type="text"
                id="user"
                name="user"
                placeholder="Ingresa tu ID de usuario"
              />
              <label htmlFor="pass" className="text-sm lg:text-base pt-3">
                Contraseña
              </label>
              
              <InputContrasenaLogin
                props={{
                  id: "pass",
                  texto: "Ingresa tu Contraseña",
                  class:
                    "bg-slate-200 rounded-full text-sm lg:text-base mb-2 lg:mb-3 mt-1 lg:mt-2 py-2 lg:py-3 w-[22rem] lg:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#EB5765] focus:border-transparent px-6",
                  classEye:
                    "relative cursor-pointer -bottom-[2.25rem] lg:-bottom-[2.75rem] left-[15.25rem] lg:left-[17rem] hover:text-black",
                }}
              />
              
              <div>
                <input
                  type="checkbox"
                  name="remember"
                  id="state"
                  className="mb-1"
                  value={true}
                />
                <label htmlFor="remember" className="ml-2 text-sm lg:text-base">
                  Recuérdame
                </label>
              </div>
            </div>
          </form>

          <HelmetProvider>
            <Helmet>
              <script src="../../../scripts/login.js"></script>
              <script src="https://kit.fontawesome.com/c9a65ccec4.js" crossorigin="anonymous"></script>
            </Helmet>
          </HelmetProvider>

          <button
            type="button"
            id="iniciar-sesion-fet"
            className="bg-[#EB5765] text-white text-lg lg:text-xl rounded-full duration-200 px-4 py-2 mx-auto hover:bg-red-200"
            aria-label="Iniciar Sesión"
          >
            Inicia Sesión
          </button>

          <div className="relative flex py-1 lg:py-2 place-items-center mx-auto w-2/5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink text-sm lg:text-base mx-4 text-gray-400">
              o
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <img
            src={gl}
            className="absolute size-6 bottom-[5.5rem] md:bottom-[4.5rem] lg:bottom-[6.25rem] left-[7.25rem] md:left-[8rem] lg:left-[9rem]"
          />
          <button
            className="mb-5 md:mb-3 lg:mb-5 bg-blue-400 text-white duration-200 text-xs lg:text-sm pl-10 pr-4 py-3 mx-auto hover:bg-blue-300"
            aria-label="Continuar con Google"
            onClick={setSoon}
          >
            Continuar con Google
          </button>
          <div className="grid grid-cols-[55%_45%] md:grid-cols-2 text-sm md:text-base">
            <h2 className="ml-5 text-sm lg:text-base justify-self-start">
              ¿Olvidaste tu contraseña?
            </h2>
            <h2 className="mr-5 text-sm lg:text-base justify-self-end">
              ¿No tienes cuenta?
            </h2>
          </div>
          <div className="grid grid-cols-2 mb-5 md:mb-3 lg:mb-5 text-sm md:text-base text-[#036C65]">
            <a
              href="/spa/resetPassword/Recuperacion"
              onClick={cerrar.close}
              className="ml-7 text-sm lg:text-base justify-self-start relative cursor-pointer before:bg-[#036C65] before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
            >
              Restablecer contraseña
            </a>
            <a
              onClick={changeReg}
              className="mr-4 text-sm lg:text-base justify-self-end relative cursor-pointer before:bg-[#036C65] before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
            >
              Crear cuenta nueva
            </a>
          </div>
        </div>
        {soon && (
          <div className="soon-fondo">
            <div className="soon-fx" onClick={toggleSoon}>
              <Soon />
            </div>
          </div>
        )}
        <div id="toastBox"/>
      </div>
      
    </>
  );
};

export default Login;
