import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const ConfirmacionContrasena = () => {
  return (
    <>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[25rem] w-[25rem] md:h-[24rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <h1 className="mx-auto mt-[1rem] pt-8 pb-4 md:p-5 lg:p-7 text-[#EB5765] text-xl md:text-2xl lg:text-3xl font-bold">
            Contraseña cambiada exitosamente
          </h1>
          <div className="border-b-2 border-[#848894] mx-12 md:mx-24" />
          <h2 className="grid place-items-center text-center text-[#EB5765] mx-10 my-4 md:my-5 lg:my-7 md:text-base lg:text-xl">
            ¡Tu contraseña ha sido cambiada con éxito!
          </h2>
          <h2 className="grid place-items-center text-center mx-10 my-4 md:my-5 lg:my-7 md:text-base lg:text-xl">
            Has cambiado tu contraseña.
          </h2>
          <h2 className="grid place-items-center text-center mx-10 md:mx-24 my-4 md:my-5 lg:my-7 md:text-base lg:text-xl">
            Ahora para acceder a tu cuenta tendrás que usar el nuevo correo que
            ingresaste. Igualmente puedes seguir usando tu ID de usuario.
          </h2>
          <div className="grid place-content-center mt-2 lg:mt-0">
            <a href="/spa/resetPassword/Verificacion">
              <button
                aria-label="Finalizar"
                className="bg-[#EB5765] text-white md:text-large lg:text-xl rounded-full w-[7rem] py-2 mx-auto hover:bg-red-200"
              >
                Finalizar
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmacionContrasena;
