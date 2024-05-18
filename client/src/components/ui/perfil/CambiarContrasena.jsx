import InputContrasena from "../InputContrasena";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const CambiarContrasena = () => {
  return (
    <>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[40rem] w-[25rem] md:h-[28rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="absolute mt-5">
            <a className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Volver
            </a>
          </div>
          <h1 className="mx-auto mt-[1rem] pt-8 pb-4 md:p-5 text-[#EB5765] text-2xl md:text-3xl lg:text-4xl font-bold">
            Cambiar Contraseña
          </h1>
          <div className="border-b-2 border-[#848894] mx-12 md:mx-24" />
          <h2 className="grid place-items-center text-center mx-10 my-2 md:my-5 md:text-sm lg:text-base">
            Para validar tu nueva contraseña, debe cambiar a una contraseña que
            no coincida con la actual.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-2">
            <div className="ml-10 mr-4">
              <h3 className="mx-auto mb-3 text-red-500">
                Requisitos de la contraseña
              </h3>
              <h4 className="text-xs"> • Al menos 8 caracteres</h4>
              <h4 className="text-xs"> • Una letra mayúscula</h4>
              <h4 className="text-xs"> • Una letra minúscula</h4>
              <h4 className="text-xs"> • Un número</h4>
              <h4 className="text-xs"> • Al menos un carácter especial</h4>
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
                  <InputContrasena
                    props={{
                      id: "contraseña",
                      texto: "Ingresa tu Contraseña",
                      class:
                        "bg-slate-200 md:text-sm lg:text-base rounded-full w-[17rem] lg:w-[21rem] mb-3 mt-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
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
                  <InputContrasena
                    props={{
                      id: "nueva-contraseña",
                      texto: "Ingresa tu Contraseña",
                      class:
                        "bg-slate-200 md:text-sm lg:text-base rounded-full w-[17rem] lg:w-[21rem] mb-3 mt-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6",
                      classEye:
                        "absolute top-[1rem] left-[15rem] lg:left-[19rem]",
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 my-auto">
            <div className="grid place-content-start ml-8">
              <a href="/">
                <button
                  aria-label="Cancelar"
                  className="bg-[#D9D9D9] text-[#EB5765] md:text-large lg:text-xl rounded-full w-[7rem] py-2 mx-auto hover:bg-[#EEEEEE]"
                >
                  Cancelar
                </button>
              </a>
            </div>
            <div className="grid place-content-end mr-8">
              <a href="/spa/resetPassword/Verificacion">
                <button
                  aria-label="Continuar"
                  className="bg-[#EB5765] text-white md:text-large lg:text-xl rounded-full w-[7rem] py-2 mx-auto hover:bg-red-200"
                >
                  Listo
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CambiarContrasena;
