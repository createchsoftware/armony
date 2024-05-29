import user1 from "../../../../../../public/pictures/userGuest.png";
import Pasos from "../../../PasosDeProcesos";
import InputContrasenaLogin from "../../../InputContrasenaLogin.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft , faTriangleExclamation , faPersonDigging} from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import '../../../../../txt.css'

const Contrasena = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
            <script src="https://kit.fontawesome.com/c9a65ccec4.js" crossorigin="anonymous"></script>
        </Helmet>
      </HelmetProvider>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[40rem] w-[25rem] md:h-[28rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="relative w-[6rem] h-[6rem] lg:w-[7rem] lg:h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <h1 className="mx-auto pt-8 pb-4 md:p-5 lg:p-7 text-rose-400 text-2xl md:text-3xl lg:text-4xl">
            Crear cuenta nueva
          </h1>
          <Pasos
            props={{
              paso1: "Información",
              paso2: "Patologías",
              paso3: "Contraseña",
              paso4: "Confirmación",
            }}
            index={3}
          />
          <div className="absolute mt-5">
            <a className="ml-3" href="/spa/signUp/Patologia">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 mb-2">
            <div className="ml-10 mr-4">
              <h3 className="mx-auto mb-3 text-red-500">
                Requisitos de la contraseña
              </h3>
              <h4 id='menor' className="text-xs"> • Al menos 8 caracteres</h4>
              <h4 id="mayor" className="text-xs"> • No mas de 20 caracteres</h4>
              <h4 id="mayuscula" className="text-xs"> • Una letra mayúscula</h4>
              <h4 id="minuscula" className="text-xs"> • Una letra minúscula</h4>
              <h4 id="numero" className="text-xs"> • Un número</h4>
              <h4 id="especial" className="text-xs"> • Al menos un carácter especial</h4>
              <h4 className="text-xs">
                {" "}
                • La contraseña no debe coincidir con su ID de correo
                electrónico y debe distinguir entre mayúsculas y minúsculas
              </h4>
            </div>
            <div>
              <form action="" className="grid grid-cols-1 ml-[2rem] md:ml-0">
                <div>
                  <label className="my-auto ml-2 text-sm lg:text-base">
                    Nueva contraseña
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <div className="relative">
                  <InputContrasenaLogin
                    props={{
                      id: "contraseña",
                      texto: "Ingresa tu Contraseña",
                      class:
                        "contrasena-texto bg-slate-200 md:text-sm lg:text-base rounded-full w-[17rem] lg:w-[21rem] mb-3 mt-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
                      classEye:
                        "absolute top-[1rem] left-[15rem] lg:left-[19rem]",
                    }}
                  />
                </div>
                <div>
                  <label className="my-auto ml-2 text-sm lg:text-base">
                    Confirmar contraseña
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <div className="relative">
                  <InputContrasenaLogin
                    props={{
                      id: "nueva-contraseña",
                      texto: "Ingresa tu Contraseña",
                      class:
                        "contrasena-texto bg-slate-200 md:text-sm lg:text-base rounded-full w-[17rem] lg:w-[21rem] mb-3 mt-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
                      classEye:
                        "absolute top-[1rem] left-[15rem] lg:left-[19rem]",
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
                id="cancelar"
                aria-label="Cancelar"
                className="bg-white text-rose-400 text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
              >
                Cancelar
              </button>
            </div>
            <div className="grid place-content-end mr-8">
              <button
                id="step3"
                aria-label="Continuar"
                className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
        <div className="soon" id='oculto'>

        </div>
        <div id="toastBox"/>
      </div>
    </div>
  );
};

export default Contrasena;
