import user1 from "../../../../public/pictures/userAdmin.png";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import Login from "./ModalLogin";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const ModalLoginAdmin = () => {
  return (
    <Popup
      trigger={
        <a
          className="mr-5 justify-self-end"
          aria-label="¿Eres Administrador?"
          onClick={close}
        >
          ¿Eres Administrador?
        </a>
      }
      modal
      nested
    >
      {(close) => (
        <div className="relative flex w-4/5 flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-52 -mt-20 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute top-0 h-full" />
          </div>
          <div className="grid grid-cols-2">
            <a
              className="ml-5 justify-self-start"
              aria-label="Regresar"
              onClick={close}
            >
              <FontAwesomeIcon icon={faAngleLeft} /> Regresar
            </a>
            <a
              className="mr-5 justify-self-end"
              aria-label="Cerrar"
              onClick={close}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </a>
          </div>
          <h1 className="mx-auto p-5 text-green-900 text-3xl">
            Accede a tu cuenta
          </h1>
          <form action="" className="">
            <div>
              <label htmlFor="user" className=" py-3 ml-10">
                Usuario
              </label>
              <input
                className="bg-slate-200 rounded-full my-3 ml-9 mr-9 py-3 w-10/12 placeholder: px-6"
                type="text"
                id="user"
                name="user"
                placeholder="Ingresa tu ID de usuario"
              />
            </div>
            <label htmlFor="pass" className="pt-3 mb-3 ml-10">
              Contraseña
            </label>
            <a className="relative -bottom-12 left-80">
              <FontAwesomeIcon icon={faEyeSlash} />
            </a>
            <input
              className="bg-slate-200 rounded-full my-3 ml-9 mr-9 py-3 w-10/12 placeholder: px-6"
              type="text"
              id="pass"
              name="pass"
              placeholder="Ingresa tu Contraseña"
            />
            <input
              type="checkbox"
              name="remember"
              id="state"
              className="mb-3 ml-10"
              value={true}
            />
            <label htmlFor="remember" className="ml-2">
              Recuerdame
            </label>
          </form>
          <button
            className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto mb-8 hover:bg-red-200"
            aria-label="Iniciar Sesión"
          >
            Inicia Sesión
          </button>
        </div>
      )}
    </Popup>
  );
};

export default ModalLoginAdmin;
