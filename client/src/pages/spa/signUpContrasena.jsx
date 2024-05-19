import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import Contrasena from "../../components/ui/Login/Procesos/CrearCuenta/Contrasena.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

const passwordReset = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../../scripts/step3.js"></script>
        </Helmet>
      </HelmetProvider>
      <LayoutSecundario>
        <Contrasena />
      </LayoutSecundario>
    </>
  );
};

export default passwordReset;
