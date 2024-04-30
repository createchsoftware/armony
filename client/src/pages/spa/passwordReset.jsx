import Navbar from "../../components/ui/Navbar.jsx";
import Recuperacion from "../../components/ui/Login/Procesos/Contraseña/Confirmacion.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const passwordReset = () => {
  return (
    <>
      <Navbar />
      <Recuperacion />
    </>
  );
};

export default passwordReset;
