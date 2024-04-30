import user1 from "../../../../../../public/pictures/userGuest.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Patologias = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="min-h-[680px] max-w-[1170px] min-w-[1170px] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
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
          <div class="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
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
          <div class="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
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
          <div class="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
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
          action=""
          className="grid grid-cols-[32%_32%_32%] place-content-center"
        >
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Tienes alguna condición médica crónica? {"("}Ejemplo: diabetes,
                hipertensión, enfermedades cardíacas, etc.{")"} Por favor,
                especifique.
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Tienes alguna intolerancia a ciertos ingredientes o productos
                químicos? Por favor, especifique.
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Tiene alguna restricción médica que debamos tener en cuenta
                durante sus tratamientos en el spa? {"("}Ejemplo: limitaciones
                de movimiento, sensibilidad a ciertas temperaturas, etc.{")"}
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Ha sido diagnosticado con alguna afección de la piel?
                {"("}Ejemplo: eczema, psoriasis, acné severo, etc.{")"} Por
                favor, especifique.
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Esta tomando actualmente algún medicamento? Si es así, por
                favor especifique nombre, dosis y frecuencia.
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Hay alguna otra condición de salud o información relevante que
                crea que deberíamos saber para proporcionarle un servicio seguro
                y personalizado?
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Ha experimentado alguna lesión reciente o cirugía? Si es así,
                por favor proporcione detalles.
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Ha experimentado alguna reacción alérgica o adversa a
                tratamientos en spas anteriores o a productos específicos? Por
                favor, especifique.
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Tiene alguna preferencia especial o requerimiento específico
                para sus tratamientos en el spa relacionado con su salud o
                bienestar?
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
          <div className="my-auto">
            <div className="mr-2">
              <label htmlFor="" className="text-xs">
                ¿Tiene alergias conocidas? Por favor, especifique.
              </label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <div className="grid grid-cols-[10%_80%]">
              <div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    No
                  </label>
                </div>
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label htmlFor="" className="text-xs">
                    Sí
                  </label>
                </div>
              </div>
              <input
                id="q1"
                type="text"
                className="bg-slate-200 rounded-full w-auto mb-1 mx-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
              />
            </div>
          </div>
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
