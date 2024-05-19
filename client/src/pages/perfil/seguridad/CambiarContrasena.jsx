import { useState } from "react";
import LayoutSecundario from "../../../layouts/LayoutSecundario.jsx";
import ValidarIdentidad from "../../../components/ui/perfil/ValidarIdentidad.jsx";
import Contrasena from "../../../components/ui/perfil/CambiarContrasena.jsx";
import Confirmacion from "../../../components/ui/perfil/ConfirmacionContrasena.jsx";

const CambiarContrasena = () => {
  const [validar, setValidar] = useState(true);
  const [pass, setPass] = useState(false);
  const [conf, setConf] = useState(false);

  const step1 = () => {
    setPass(!pass);
    setValidar(!validar);
  };

  const step2 = () => {
    setPass(!pass);
    setConf(!conf);
  };

  const redirect = () => {
    window.location.href = "/perfil/seguridad";
    {
      /* CAMBIAR REDIRECCIONAMIENTO */
    }
  };

  return (
    <>
      <LayoutSecundario>
        {validar && (
          <ValidarIdentidad volver={redirect} close={redirect} next={step1} />
        )}
        {pass && <Contrasena volver={step1} close={redirect} next={step2} />}
        {conf && <Confirmacion close={redirect} />}
      </LayoutSecundario>
    </>
  );
};

export default CambiarContrasena;
