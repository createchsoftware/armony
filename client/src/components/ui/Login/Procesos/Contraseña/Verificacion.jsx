import { useState } from "react";
import user1 from "../../../../../../public/pictures/userCl.png";
import Pasos from "../../../PasosDeProcesos";
import Soon from "../../../Proximamente";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Verificacion = () => {
  const [soon, setSoon] = useState(false);

  const toggleSoon = () => {
    setSoon(!soon);
  };
  return (
    <div>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[25rem] w-[25rem] md:h-[24rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="relative w-[6rem] h-[6rem] lg:w-[7rem] lg:h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <h1 className="mx-auto pt-8 pb-4 md:p-5 lg:p-7 text-rose-400 text-2xl md:text-3xl lg:text-4xl">
            Restablecer contraseña
          </h1>
          <Pasos
            props={{
              paso1: "Recuperación",
              paso2: "Verificación",
              paso3: "Nueva Contraseña",
              paso4: "Confirmación",
            }}
            index={2}
          />
          <div className="absolute mt-5">
            <a className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
          </div>
          <h2 className="grid place-items-center mx-4 my-2 md:mt-4 lg:mt-6 md:text-sm lg:text-base text-center md:text-left">
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
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
            />
            <input
              id="cd-2"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
            />
            <input
              id="cd-3"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
            />
            <input
              id="cd-4"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
            />
            <input
              id="cd-5"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
            />
            <input
              id="cd-6"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
            />
          </form>
          <a
            onClick={toggleSoon}
            className="text-teal-700 md:text-sm lg:text-base text-center"
          >
            Reenviar código de verificación
          </a>
          <div className="grid grid-cols-2 my-auto">
            <div className="grid place-content-start ml-8">
              <a href="/spa">
                <button
                  aria-label="Cancelar"
                  className="bg-white text-rose-400 md:text-large lg:text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
                >
                  Cancelar
                </button>
              </a>
            </div>
            <div className="grid place-content-end mr-8">
              
                <button
                  aria-label="Continuar"
                  className="bg-rose-400 text-white md:text-large lg:text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
                >
                  Continuar
                </button>
            
            </div>
          </div>
        </div>
      </div>
      {soon && (
        <div className="soon-fondo">
          <div className="soon-fx" onClick={toggleSoon}>
            <Soon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Verificacion;
