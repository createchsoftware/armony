import { useEffect } from "react";
import LayoutSecundario from "../../layouts/LayoutSecundario.jsx";
import NuevaContr from "../../components/ui/Login/Procesos/Contraseña/NuevaContr.jsx";

const passwordResetNuevaContr = () => {
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
        <NuevaContr />
      </LayoutSecundario>
    </>
  );
};

export default passwordResetNuevaContr;
