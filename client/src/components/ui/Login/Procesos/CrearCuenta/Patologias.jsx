import user1 from "../../../../../../public/pictures/userGuest.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from 'react'
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Patologias = () => {

  const [array, setArray] = useState([]);

   useEffect(()=>{
      fetch("/api/step1.5")
         .then(response=> response.json())
         .then(data => {
            //console.log(typeof data);
            setArray(data);
         })
         .catch(error=>{
             console.log(error);
         });
   },[])

   console.log(array);
   



  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="min-h-[740px] max-w-[1170px] min-w-[1170px] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
        <div className="relative max-w-[110px] min-w-[110px] mx-auto -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
          <img src={user1} alt="" className="logo1 absolute h-full" />
        </div>
        <h1 className="mx-auto p-5 text-rose-400 text-3xl">
          Crear cuenta nueva
        </h1>
        <div className="grid grid-cols-[50px_auto_20px_50px_auto_20px_50px_auto_20px_50px_auto] place-items-center px-5 mx-auto">
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa1}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
            }}
            className="text-base mx-2"
          >
            Información Básica
          </a>
          <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa2}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
            }}
            className="text-base mx-1"
          >
            Patologías
          </a>
          <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa3}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
            }}
            className="text-base mx-1"
          >
            Contraseña
          </a>
          <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
          <span className="">
            <FontAwesomeIcon
              style={{ fontSize: "16px", color: "#FFFFFF" }}
              icon={fa4}
              className="relative left-6 bottom-2"
            />
            <FontAwesomeIcon
              style={{ fontSize: "36px" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
            }}
            className="text-base mx-1"
          >
            Confirmación
          </a>
        </div>
        <div className="absolute mt-5">
          <a className="ml-3">
            <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faAngleLeft} />{" "}
            Regresar
          </a>
        </div>
        <form
          id={`${array.length}`}
          action=""
          className="grid grid-cols-[32%_32%_32%] place-content-center mt-5"
        >
          
          {array.map(question=>{
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
                  <div className="grid grid-cols-[10%_80%]">
                    <div>
                      <div>
                        <input type="radio" id={`no-${question[1]}`} name={`estado${question[1]}`} className="mr-2" />
                        <label htmlFor="" className="text-xs">
                          No
                        </label>
                      </div>
                      <div>
                        <input type="radio" id={`si-${question[1]}`} name={`estado${question[1]}`} className="mr-2" />
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
              aria-label="Cancelar"
              className="bg-white text-rose-400 text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
            >
              Cancelar
            </button>
          </div>
          <div className="grid place-content-end mr-8">
            <button
              id='step2'
              aria-label="Continuar"
              className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patologias;