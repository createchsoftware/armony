import { useEffect } from "react";
import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import ConfirmacionCuenta from "../../components/ui/Login/Procesos/CrearCuenta/ConfirmacionCuenta.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SignUpConfirmacion = () => {
  async function checkLogin() {
    let respuestaJson = null;
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      respuestaJson = await respuesta.json();

      if (respuestaJson.logueado == true) {
        window.location.href = "/spa";
      }
    } catch (error) {}
  }

  useEffect(() => checkLogin(), []);
  return (
    <>
      <LayoutSecundario>
        <ConfirmacionCuenta />
      </LayoutSecundario>
    </>
  );
};

export default SignUpConfirmacion;
