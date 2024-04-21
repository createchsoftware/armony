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

const ModalSignUpProcess = ({ show, handleClose }) => {
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
        /* Procesos */
      </div>
    </Modal>
  );
};

export default ModalSignUpProcess;
