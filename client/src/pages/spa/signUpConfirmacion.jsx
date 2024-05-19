import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import ConfirmacionCuenta from "../../components/ui/Login/Procesos/CrearCuenta/ConfirmacionCuenta.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SignUpConfirmacion = () => {
  return (
    <>
      <LayoutSecundario>
        <ConfirmacionCuenta />
      </LayoutSecundario>
    </>
  );
};

export default SignUpConfirmacion;
