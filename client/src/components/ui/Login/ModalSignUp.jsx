import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mui/base/Modal";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const ModalSignUp = ({ show, handleClose }) => {
  //const [show, setShow] = useState(false);
  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose}>
      <div>
        <button className="" aria-label="Regresar" onClick={handleClose}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div>
          <img src="" alt="" className="userLogo" />
        </div>
        <button className="" aria-label="">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <h1>Crear cuenta nueva</h1>
        <button className="" aria-label="Iniciar Sesión">
          Crear cuenta nueva con correo y contraseña
        </button>
        <div></div>
        <h3> o </h3>
        <div></div>
        <button className="" aria-label="Continuar con Google">
          Continuar con Google
        </button>
      </div>
    </Modal>
  );
};

export default ModalSignUp;
