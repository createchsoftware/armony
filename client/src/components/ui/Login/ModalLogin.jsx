import user1 from "../../../../public/pictures/userCl.png";
import gl from "../../../../public/pictures/googlelogo.png";
import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import Admin from "./ModalLoginAdmin";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const ModalLogin = () => {
  return (
    <Popup
      trigger={<a href="#" className="menu-link menu-is">Inicia sesión</a>}
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
            <Admin className="justify-self-stretch" />
          </div>
          <h1 className="mx-auto p-5 text-rose-400 text-3xl">
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
            className="bg-rose-400 text-white text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
            aria-label="Iniciar Sesión"
          >
            Inicia Sesión
          </button>
          <div className="relative flex py-2 place-items-center mx-auto w-2/5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">o</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <img src={gl} className="absolute size-6 bottom-28 left-44" />
          <button
            className="bg-blue-400 text-white text-sm pl-10 pr-4 py-3 mx-auto hover:bg-blue-300"
            aria-label="Continuar con Google"
          >
            Continuar con Google
          </button>
          <div className="grid grid-cols-2 mt-8">
            <h2 className="ml-5 justify-self-start">
              ¿Olvidaste tu contraseña?
            </h2>
            <h2 className="mr-5 justify-self-end">¿No tienes cuenta?</h2>
          </div>
          <div className="grid grid-cols-2 mb-5 text-green-900">
            <a className="ml-7 justify-self-start">Restablecer contraseña</a>
            <a className="mr-4 justify-self-end">Crear cuenta nueva</a>
          </div>
          <div className=""></div>
        </div>
      )}
    </Popup>
  );
};

export default ModalLogin;
