import user1 from "../../../../../../public/pictures/userGuest.png";
import camara from "../../../../../../public/pictures/camara.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const InformacionBasica = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="h-[560px] max-w-[765px] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
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
              style={{ fontSize: "36px", color: "#036C65" }}
              icon={faCircle}
            ></FontAwesomeIcon>
          </span>
          <a
            href=""
            style={{
              fontFamily: "ABeeZee",
              color: "#036C65",
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
        <div className="grid grid-cols-[55%_auto] ml-10">
          <form action="" className="mx-auto">
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
                className="bg-slate-200 rounded-full w-[392px] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
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
                    className="bg-slate-200 rounded-full w-48 mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
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
                    className="bg-slate-200 rounded-full w-48 mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
                  />
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
                className="bg-slate-200 rounded-full w-[392px] mb-1 mx-0 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
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
                    className="bg-slate-200 rounded-full w-48 mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
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
                    className="bg-slate-200 rounded-full w-48 mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
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
                  className="bg-slate-200 rounded-full w-auto mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
                />
                <input
                  id="month"
                  type="text"
                  placeholder="mm"
                  className="bg-slate-200 rounded-full w-auto mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
                />
                <input
                  id="year"
                  type="text"
                  placeholder="aaaa"
                  className="bg-slate-200 rounded-full w-auto mb-1 mr-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
                />
              </div>
            </div>
          </form>
          <div className="relative max-w-[180px] min-w-[180px] min-h-[180px] max-h-[180px] left-[15%] top-[45%] -mt-20 grid place-items-center rounded-full bg-white bg-clip-border ring-2 ring-gray-400">
            <img src={user1} alt="" className="logo2 absolute h-full" />
            <div className="absolute max-w-[50px] max-h-[50px] bg-white rounded-full place-self-end ring-2 ring-gray-500">
              <img src={camara} alt="" />
            </div>
          </div>
        </div>
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

export default InformacionBasica;
