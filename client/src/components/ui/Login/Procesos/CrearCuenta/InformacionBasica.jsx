import user1 from "../../../../../../public/pictures/userGuest.png";
import camara from "../../../../../../public/pictures/camara.png";
import Pasos from "../../../PasosDeProcesos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const InformacionBasica = () => {
  return (
    <div>
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
              paso1: "Recuperación",
              paso2: "Verificación",
              paso3: "Nueva Contraseña",
              paso4: "Confirmación",
            }}
          />
          {/*<div className="grid grid-cols-[50px_auto_20px_50px_auto_20px_50px_auto_20px_50px_auto] place-items-center px-5 mx-auto">
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
          </div>*/}
          <div className="absolute mt-5">
            <a className="ml-3">
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
                      placeholder="+52"
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
                      placeholder="686-222-3344"
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
                    placeholder="dd"
                    className="bg-slate-200 rounded-full w-[6rem] lg:w-[7.75rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  />
                  <input
                    id="month"
                    type="text"
                    placeholder="mm"
                    className="bg-slate-200 rounded-full w-[6rem] lg:w-[7.75rem] mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                  />
                  <input
                    id="year"
                    type="text"
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
                  placeholder="12345"
                  className="bg-slate-200 rounded-full w-[19rem] lg:w-[24.75rem] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent px-6"
                />
              </div>
            </form>
            <div className="relative w-[8rem] h-[8rem] lg:w-[11rem] lg:h-[11rem] left-[5.75rem] top-[6rem] md:left-[0.25rem] md:top-[10rem] -mt-20 grid place-items-center rounded-full bg-white bg-clip-border ring-2 ring-gray-400">
              <img src={user1} alt="" className="logo2 absolute h-full" />
              <div className="absolute w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem] bg-white rounded-full place-self-end ring-2 ring-gray-500">
                <img id="photo" src={camara} alt="" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-[8rem] mb-[2rem] md:my-auto">
            <div className="grid place-content-start ml-8">
              <button
                aria-label="Cancelar"
                className="bg-white text-rose-400 text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
              >
                Cancelar
              </button>
            </div>
            <div className="grid place-content-end mr-8">
              <a href="/spa/signUp/Patologia">
                <button
                  id="step-one"
                  aria-label="Continuar"
                  className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
                >
                  Continuar
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacionBasica;
