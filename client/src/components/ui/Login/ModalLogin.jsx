import user1 from "../../../../public/pictures/userCl.png";
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
      trigger={<a className="menu-link menu-is"> Inicia Sesión </a>}
      modal
      nested
    >
      {(close) => (
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-32 -mt-20 mb-4 grid h-28 place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img
              src={user1}
              alt=""
              className="logo1 absolute top-0 left-0 h-full"
            />
          </div>
          <div className="">
            <div className="">
              <button className="" aria-label="Regresar" onClick={close}>
                <FontAwesomeIcon icon={faAngleLeft} /> Regresar
              </button>
              <Admin />
            </div>
            <h1>Accede a tu cuenta</h1>
            <form action="">
              <label htmlFor="user">Usuario</label>
              <input
                type="text"
                id="user"
                name="user"
                placeholder="Ingresa tu ID de usuario"
              />
              <label htmlFor="pass">Contraseña</label>
              <i>LogosOjos</i>
              <input
                type="text"
                id="pass"
                name="pass"
                placeholder="Ingresa tu Contraseña"
              />
              <label htmlFor="remember">Recuerdame</label>
              <input type="checkbox" name="remember" id="state" value={true} />
            </form>
            <button className="" aria-label="Iniciar Sesión">
              Inicia Sesión
            </button>
            <div></div>
            <h3> o </h3>
            <div></div>
            <button className="" aria-label="Continuar con Google">
              Continuar con Google
            </button>
            <h2>¿Olvidaste tu contraseña?</h2>
            <h2>¿No tienes cuenta?</h2>
            <h2>Restablecer contraseña --Boton</h2>
            <h2>Crear cuenta nueva</h2>
          </div>
          <div className=""></div>
        </div>
      )}
    </Popup>
  );
};

export default ModalLogin;
