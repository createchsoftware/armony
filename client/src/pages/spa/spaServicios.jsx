import Navbar from "../../components/ui/Navbar.jsx";
import Servicios from "../../components/ui/servicios/ServiciosSpa.jsx";
import Comentarios from "../../components/ui/Comentarios.jsx";
import Foot from "../../components/ui/Foot.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const servicios = () => {
  return (
    <>
      <Navbar />
      <Servicios />
      <Comentarios />
      <Foot />
    </>
  );
};

export default servicios;
