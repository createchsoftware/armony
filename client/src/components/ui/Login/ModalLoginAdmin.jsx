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

const ModalLoginAdmin = ({ show, handleClose }) => {
  //const [show, setShow] = useState(false);
  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  return (
    <Popup
      trigger={
        <button className="" aria-label="¿Eres Administrador?" onClick={close}>
          ¿Eres Administrador?
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div>
          <Login />
          <div>
            <img src="" alt="" className="userLogo" />
          </div>
          <button className="" aria-label="">
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <h1>Accede como Administrador</h1>
          <form action="">
            <label htmlFor="user">Usuario</label>
            <input
              type="text"
              id="user"
              name="user"
              placeholder="Ingresa tu ID de empleado"
            />
            <label htmlFor="pass">Contraseña</label>
            <i>LogosOjos</i>
            <input
              type="text"
              id="pass"
              name="pass"
              placeholder="Ingresa tu Contraseña"
            />
          </form>
          <button className="" aria-label="Iniciar Sesión">
            Inicia Sesión
          </button>
        </div>
      )}
    </Popup>
  );
};

export default ModalLoginAdmin;
