import user1 from "../../../../public/pictures/userAdmin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import Login from "./PopupLogin";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
/* NO FUNCIONA
const [password, setPassword] = useState("");
const [type, setType] = useState('password');
const [icon, setIcon] = useState(faEyeSlash);

const toggleEye = () => {
  if (type === "password") {
    setIcon(faEye);
    setType("text");
  } else {
    setIcon(faEyeSlash);
    setType("password");
  }
}; */

const ModalLoginAdmin = ({ actionElement }) => {
  return (
    <Popup trigger={actionElement} modal nested>
      {(close) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-[25rem] md:w-[30rem] rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative w-[7rem] h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
              <img src={user1} alt="" className="logo1 absolute h-full" />
            </div>
            <div className="grid grid-cols-2">
              <Login
                actionElement={
                  <a
                    className="ml-5 justify-self-start"
                    aria-label="Regresar"
                    onClick={close}
                  >
                    <FontAwesomeIcon
                      style={{ fontSize: "22px" }}
                      icon={faAngleLeft}
                    />{" "}
                    Regresar
                  </a>
                }
              />
              <a
                className="mr-5 justify-self-end"
                aria-label="Cerrar"
                onClick={close}
              >
                <FontAwesomeIcon
                  style={{ fontSize: "24px" }}
                  icon={faCircleXmark}
                />
              </a>
            </div>
            <h1 className="mx-auto p-3 md:p-4 text-[#036C65] text-3xl text-center">
              Accede a tu cuenta
            </h1>
            <form className="text-sm md:text-base">
              <div className="mb-3 md:mb-4 ml-6 md:ml-10">
                <label htmlFor="user" className="pt-3">
                  Usuario
                </label>
                <input
                  className="bg-slate-200 rounded-full mb-3 mt-2 py-3 w-[22rem] md:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#036C65] focus:border-transparent px-6"
                  type="text"
                  id="user"
                  name="user"
                  placeholder="Ingresa tu ID de usuario"
                />
                <label htmlFor="pass" className="pt-3">
                  Contraseña
                </label>
                <a className="relative -bottom-[2.5rem] md:-bottom-[2.75rem] left-[15rem] md:left-[17rem]">
                  <FontAwesomeIcon
                    id="eye"
                    icon={faEyeSlash} /*onClick={toggleEye}*/
                  />
                </a>
                <input
                  className="bg-slate-200 rounded-full mb-3 mt-2 py-3 w-[22rem] md:w-[25rem] focus:outline-none focus:ring-1 focus:ring-[#036C65] focus:border-transparent px-6"
                  type="text"
                  id="pass"
                  name="pass"
                  /*onChange={(e) => setPassword(e.target.value)}*/
                  placeholder="Ingresa tu Contraseña"
                />
              </div>
            </form>
            <button
              className="flex bg-[#EB5765] text-white text-xl rounded-full px-4 py-2 mx-auto mb-8 hover:bg-red-200"
              aria-label="Iniciar Sesión"
            >
              Inicia Sesión
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ModalLoginAdmin;
