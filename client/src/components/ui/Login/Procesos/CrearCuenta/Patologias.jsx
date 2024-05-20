import user1 from "../../../../../../public/pictures/userGuest.png";
import Pasos from "../../../PasosDeProcesos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Patologias = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    fetch("/api/step1.5")
      .then((response) => response.json())
      .then((data) => {
        //console.log(typeof data);
        setArray(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(array);

  return (
    <div>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[90rem] w-[25rem] md:h-[55rem] md:w-[48rem] lg:h-[50rem] lg:w-[70rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
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
            index={2}
          />
          <div className="absolute mt-5">
            <a className="ml-3" href="/spa/signUp">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
          </div>
          <form
            id={`${array.length}`}
            action=""
            className="grid grid-cols-[92%] md:grid-cols-[48%_48%] lg:grid-cols-[32%_32%_32%] place-content-center mt-5"
          >
            {array.map((question) => {
              return (
                <>
                  <div className="my-1">
                    <div className="mr-2">
                      <label htmlFor="" className="text-xs">
                        {question[0]}
                      </label>
                      <label htmlFor="" className="text-red-800">
                        *
                      </label>
                    </div>
                    <div className="grid grid-cols-[12%_78%]">
                      <div>
                        <div>
                          <input
                            type="radio"
                            id={`no-${question[1]}`}
                            name={`estado${question[1]}`}
                            className="mr-2"
                          />
                          <label htmlFor="" className="text-xs">
                            No
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id={`si-${question[1]}`}
                            name={`estado${question[1]}`}
                            className="mr-2"
                          />
                          <label htmlFor="" className="text-xs">
                            Sí
                          </label>
                        </div>
                      </div>
                      <input
                        id={`q${question[1]}`}
                        type="text"
                        className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </form>
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
                id="step2"
                aria-label="Continuar"
                className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patologias;
