import user1 from "../../../../../../public/pictures/userGuest.png";
import camara from "../../../../../../public/pictures/camara.png";
import Pasos from "../../../PasosDeProcesos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import '../../../../../txt.css';

const InformacionBasica = () => {

  return (
    <div>
      <HelmetProvider>
        <Helmet>
            <script src="https://kit.fontawesome.com/c9a65ccec4.js" crossOrigin="anonymous"></script>
        </Helmet>
      </HelmetProvider>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[66rem] w-[25rem] md:h-[36rem] md:w-[52rem] lg:h-[40rem] lg:w-[66rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
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
            index={1}
          />
          <div className="absolute mt-5">
            <a className="ml-3" href="/">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[auto_auto] mx-10">
            <form action="" className="mx-auto grid grid-cols-1 md:grid-cols-2">
              <div>
                <div className="grid grid-cols-1">
                  <div>
                    <label htmlFor="" className="text-sm">
                      Nombre {"("}s{")"}
                    </label>
                    <label htmlFor="" className="text-red-800">
                      *
                    </label>
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Suzana"
                    className="bg-slate-200 rounded-full w-[19rem] lg:w-[24.75rem] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                    
                  />
                  <div className="grid grid-cols-2">
                    <div>
                      <div>
                        <label htmlFor="" className="text-sm">
                          Apellido paterno
                        </label>
                        <label htmlFor="" className="text-red-800">
                          *
                        </label>
                      </div>
                      <input
                        id="lastname1"
                        type="text"
                        placeholder="Martinez"
                        className="bg-slate-200 rounded-full w-[9rem] md:w-[9.25rem] lg:w-[12rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                        
                      />
                    </div>
                    <div>
                      <div>
                        <label htmlFor="" className="text-sm">
                          Apellido materno
                        </label>
                        <label htmlFor="" className="text-red-800">
                          *
                        </label>
                      </div>
                      <input
                        id="lastname2"
                        type="text"
                        placeholder="Hererra"
                        className="bg-slate-200 rounded-full w-[9rem] md:w-[9.25rem] lg:w-[12rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                        
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="text-sm">
                    Correo
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <input
                  id="email"
                  type="text"
                  placeholder="cliente@armony.com"
                  className="bg-slate-200 rounded-full w-[19rem] lg:w-[24.75rem] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  
                />
                <div className="grid grid-cols-2">
                  <div>
                    <div>
                      <label htmlFor="" className="text-sm">
                        Lada
                      </label>
                      <label htmlFor="" className="text-red-800">
                        *
                      </label>
                    </div>
                    <input
                      id="lada"
                      type="text"
                      maxLength={3}
                      placeholder="52"
                      className="bg-slate-200 rounded-full w-[9rem] md:w-[9.25rem] lg:w-[12rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                      
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor="" className="text-sm">
                        Teléfono
                      </label>
                      <label htmlFor="" className="text-red-800">
                        *
                      </label>
                    </div>
                    <input
                      id="phone"
                      type="text"
                      maxLength={12}
                      placeholder="6862223344"
                      className="bg-slate-200 rounded-full w-[9rem] md:w-[9.25rem] lg:w-[12rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                      
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="text-sm">
                    Fecha de nacimiento
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <div className="grid grid-cols-3">
                  <input
                    id="day"
                    type="text"
                    maxLength={2}
                    placeholder="dd"
                    className="bg-slate-200 rounded-full w-[6rem] lg:w-[7.75rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                    
                  />
                  <input
                    id="month"
                    type="text"
                    maxLength={2}
                    placeholder="mm"
                    className="bg-slate-200 rounded-full w-[6rem] lg:w-[7.75rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  />
                  <input
                    id="year"
                    type="text"
                    maxLength={4}
                    placeholder="aaaa"
                    className="bg-slate-200 rounded-full w-[6rem] lg:w-[7.75rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="" className="text-sm">
                    Calle
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <input
                  id="calle"
                  type="text"
                  placeholder="Maria"
                  className="bg-slate-200 rounded-full w-[19rem] lg:w-[24.75rem] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  
                />
                <div>
                  <label htmlFor="" className="text-sm">
                    Colonia
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <input
                  id="colonia"
                  type="text"
                  placeholder="Col. Residencias"
                  className="bg-slate-200 rounded-full w-[19rem] lg:w-[24.75rem] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  
                />
                <div>
                  <label htmlFor="" className="text-sm">
                    Numero
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <input
                  id="numero"
                  type="text"
                  placeholder="#1234"
                  className="bg-slate-200 rounded-full w-[19rem] lg:w-[24.75rem] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  
                />
                <div>
                  <label htmlFor="" className="text-sm">
                    Codigo postal
                  </label>
                  <label htmlFor="" className="text-red-800">
                    *
                  </label>
                </div>
                <input
                  id="codigo_postal"
                  type="text"
                  maxLength={5}
                  placeholder="12345"
                  className="bg-slate-200 rounded-full w-[19rem] lg:w-[24.75rem] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  
                />
              </div>
            </form>
            <div className="relative w-[8rem] h-[8rem] lg:w-[11rem] lg:h-[11rem] left-[5.75rem] top-[6rem] md:left-[0.25rem] md:top-[10rem] -mt-20 grid place-items-center rounded-full bg-white bg-clip-border ring-2 ring-gray-400">
              <img src={user1} alt="" className="logo2 absolute h-full" />
              <div className="absolute w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem] bg-white rounded-full place-self-end ring-2 ring-gray-500">
                <input type="file" id="imagen"/>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-[8rem] mb-[2rem] md:my-auto">
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
                id="step-one"
                aria-label="Continuar"
                className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="toastBox"/>
    </div>
  );
};

export default InformacionBasica;
