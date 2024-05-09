import Navbar from "../../components/ui/Navbar.jsx";
import Servicios from "../../components/ui/servicios/ServiciosEstetica.jsx";
import Comentarios from "../../components/ui/Comentarios.jsx";
import Foot from "../../components/ui/Foot.jsx";

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
