import InputContrasena from "../InputContrasena";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const ValidarIdentidad = () => {
  return (
    <>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[25rem] w-[25rem] md:h-[24rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="absolute mt-5">
            <a className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Volver
            </a>
          </div>
          <h1 className="mx-auto mt-[1rem] pt-8 pb-4 md:p-5 lg:p-7 text-[#EB5765] text-2xl md:text-3xl lg:text-4xl font-bold">
            Validar Identidad
          </h1>
          <div className="border-b-2 border-[#848894] mx-12 md:mx-24" />
          <h2 className="grid place-items-center text-center mx-10 my-2 md:my-5 lg:my-7 md:text-sm lg:text-base">
            Por seguridad, tiene que ingresar su contraseña para verificar que
            usted es dueño de esta cuenta.
          </h2>
          <form action="" className="mx-auto my-[1rem] md:text-sm lg:text-base">
            <div className="ml-4">
              <label htmlFor="">Ingrese su contraseña</label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <InputContrasena
              props={{
                texto: "Ingresa tu contraseña",
                class:
                  "bg-slate-200 md:text-sm lg:text-base rounded-full w=[15rem] md:w-96 mb-3 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#EB5765] focus:border-transparent px-6",
                classEye:
                  "relative float-right justify-end right-[3rem] top-[1rem]",
              }}
            />
          </form>
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

export default ValidarIdentidad;
