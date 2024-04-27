import Navbar from "../../components/ui/Navbar.jsx";
import CrearCuenta from "../../components/ui/Login/Procesos/CrearCuenta/Contrasena.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const passwordReset = () => {
  return (
    <>
      <Navbar />
      <CrearCuenta />
    </>
  );
};

export default passwordReset;
