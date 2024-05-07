import Navbar from "../../components/ui/Navbar.jsx";
import CrearCuenta from "../../components/ui/Login/Procesos/CrearCuenta/InformacionBasica.jsx";
import Footer from "../../components/ui/FooterSecundario.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

const passwordReset = () => {
  return (
    <>
    <HelmetProvider>
        <Helmet>
            <script src="../../../scripts/step1.js"></script>
        </Helmet>
    </HelmetProvider>
      <Navbar />
      <CrearCuenta />
      <Footer />
    </>
  );
};

export default passwordReset;
