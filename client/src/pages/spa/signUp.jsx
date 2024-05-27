import { useEffect } from "react";
import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import CrearCuenta from "../../components/ui/Login/Procesos/CrearCuenta/InformacionBasica.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

const passwordReset = () => {
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
