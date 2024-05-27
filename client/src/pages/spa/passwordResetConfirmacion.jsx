import { useEffect } from "react";
import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import Confirmacion from "../../components/ui/Login/Procesos/Contraseña/Confirmacion.jsx";

const passwordResetConfirmacion = () => {
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
        <Confirmacion />
      </LayoutSecundario>
    </>
  );
};

export default passwordResetConfirmacion;
