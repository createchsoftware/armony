import user1 from "../../../../public/pictures/userGuest.png";
import gl from "../../../../public/pictures/googlelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Registro = ({ cerrar }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
        <div className="relative w-[25rem] md:w-[27rem] lg:w-[30rem] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md md:-bottom-5">
          <div className="relative w-[7rem] h-[7rem] mx-auto -mt-20 grid place-items-center rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <div className="grid grid-cols-2">
            <a
              className="text-sm lg:text-base ml-5 justify-self-start relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
              aria-label="Regresar"
              onClick={cerrar.change}
            >
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
            <a className="mr-5 justify-self-end duration-150 cursor-pointer hover:text-black" aria-label="Cerrar">
              <FontAwesomeIcon
                style={{ fontSize: "24px" }}
                icon={faCircleXmark}
                onClick={cerrar.close}
                /*  color: "#87B87F" */
              />
            </a>
          </div>
          <h1 className="mx-auto p-3 lg:p-4 text-[#EB5765] text-2xl lg:text-3xl">
            Crear cuenta nueva
          </h1>
          <div className="grid place-items-center mx-7 lg:mx-16">
            <a
              href="/spa/signUp"
              onClick={cerrar.close}
              className="mt-5 bg-[#036C65] text-white text-xs px-4 py-4 duration-200 hover:bg-[rgb(69,181,156)]"
              aria-label="Crear cuenta"
            >
              Crear cuenta con correo electrónico y contraseña
            </a>
          </div>
          <div className="relative flex py-2 place-items-center mx-auto w-2/5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">o</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <img
            src={gl}
            className="absolute size-6 bottom-[2.75rem] left-[6.5rem] md:left-[7.5rem] lg:left-[9rem]"
          />
          <button
            className="mb-8 bg-blue-400 text-white text-sm pl-10 pr-4 py-3 mx-auto duration-200 hover:bg-blue-300"
            aria-label="Continuar con Google"
          >
            Continuar con Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Registro;
