import Navbar from "../../components/ui/Navbar.jsx";
import CrearCuenta from "../../components/ui/Login/Procesos/CrearCuenta/InformacionBasica.jsx";
import Footer from "../../components/ui/FooterSecundario.jsx";

const passwordReset = () => {
  return (
    <>
      <Navbar />
      <CrearCuenta />
      <Footer />
    </>
  );
};

export default passwordReset;
