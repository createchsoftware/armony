import Navbar from "../../components/ui/Navbar.jsx";
import Confirmacion from "../../components/ui/Login/Procesos/Contraseña/Confirmacion.jsx";
import Footer from "../../components/ui/FooterSecundario.jsx";
const passwordResetConfirmacion = () => {
  return (
    <>
      <Navbar />
      <Confirmacion />
      <Footer />
    </>
  );
};

export default passwordResetConfirmacion;
