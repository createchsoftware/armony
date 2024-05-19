import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import CrearCuenta from "../../components/ui/Login/Procesos/CrearCuenta/InformacionBasica.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

const passwordReset = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../../scripts/step1.js"></script>
        </Helmet>
      </HelmetProvider>
      <LayoutSecundario>
        <CrearCuenta />
      </LayoutSecundario>
    </>
  );
};

export default passwordReset;
