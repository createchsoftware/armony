import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import Patologias from "../../components/ui/Login/Procesos/CrearCuenta/Patologias.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

const passwordReset = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../../scripts/step2.js"></script>
        </Helmet>
      </HelmetProvider>
      <LayoutSecundario>
        <Patologias />
      </LayoutSecundario>
    </>
  );
};

export default passwordReset;
