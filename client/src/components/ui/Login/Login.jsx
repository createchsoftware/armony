import user1 from "../../../../public/pictures/userCl.png";
import gl from "../../../../public/pictures/googlelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import InputContrasena from "../InputContrasena.jsx";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Login = ({ cerrar }) => {
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
        <div className="relative w-[25rem] md:w-[30rem] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative  w-[7rem] h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <div className="grid grid-cols-2">
            <a
              className="ml-5 justify-self-start"
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
              className="mr-5 justify-self-end"
              aria-label="¿Eres Administrador?"
              onClick={changeAdmin}
            >
              ¿Eres Administrador?
            </a>
          </div>
          <h1 className="mx-auto p-3 md:p-4 text-[#EB5765] text-3xl">
            Accede a tu cuenta
          </h1>
          <form className="text-sm md:text-base">
            <div className="mb-3 md:mb-4 ml-6 md:ml-10">
              <label htmlFor="user" className="pt-3">
                Usuario
              </label>
              <input
                className="bg-slate-200 rounded-full mb-3 mt-2 py-3 w-[22rem] md:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#EB5765] focus:border-transparent px-6"
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
                    "bg-slate-200 rounded-full mb-3 mt-2 py-3 w-[22rem] md:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#EB5765] focus:border-transparent px-6",
                  classEye:
                    "relative -bottom-[2.5rem] md:-bottom-[2.75rem] left-[15rem] md:left-[17rem]",
                }}
              />
              <div>
                <input
                  type="checkbox"
                  name="remember"
                  id="state"
                  className="mb-3"
                  value={true}
                />
                <label htmlFor="remember" className="ml-2">
                  Recuerdame
                </label>
              </div>
            </div>
          </form>

          <HelmetProvider>
            <Helmet>
              <script src="../../../scripts/login.js"></script>
            </Helmet>
          </HelmetProvider>

          <button
            type="button"
            id="iniciar-sesion-fet"
            className="bg-[#EB5765] text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
            aria-label="Iniciar Sesión"
          >
            Inicia Sesión
          </button>

          <div className="relative flex py-2 place-items-center mx-auto w-2/5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">o</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <img
            src={gl}
            className="absolute size-6 bottom-[5.75rem] md:bottom-[6.25rem] left-[6.5rem] md:left-[9rem]"
          />
          <button
            className="mb-5 bg-blue-400 text-white text-sm pl-10 pr-4 py-3 mx-auto hover:bg-blue-300"
            aria-label="Continuar con Google"
          >
            Continuar con Google
          </button>
          <div className="grid grid-cols-[55%_45%] md:grid-cols-2 text-sm md:text-base">
            <h2 className="ml-5 justify-self-start">
              ¿Olvidaste tu contraseña?
            </h2>
            <h2 className="mr-5 justify-self-end">¿No tienes cuenta?</h2>
          </div>
          <div className="grid grid-cols-2 mb-5 text-sm md:text-base text-[#036C65]">
            <a
              href="/spa/resetPassword/Recuperacion"
              onClick={cerrar.close}
              className="ml-7 justify-self-start"
            >
              Restablecer contraseña
            </a>
            <a onClick={changeReg} className="mr-4 justify-self-end">
              Crear cuenta nueva
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
