import { useState } from "react";
import LayoutSecundario from "../../../layouts/LayoutSecundario.jsx";
import ValidarIdentidad from "../../../components/ui/perfil/ValidarIdentidad.jsx";
import Correo from "../../../components/ui/perfil/CambiarCorreo.jsx";
import Confirmacion from "../../../components/ui/perfil/ConfirmacionCorreo.jsx";

const CambiarCorreo = () => {
  const [validar, setValidar] = useState(true);
  const [correo, setCorreo] = useState(false);
  const [conf, setConf] = useState(false);

  const step1 = () => {
    setCorreo(!correo);
    setValidar(!validar);
  };

  const step2 = () => {
    setCorreo(!correo);
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
      <>
        <LayoutSecundario>
          {validar && (
            <ValidarIdentidad volver={redirect} close={redirect} next={step1} />
          )}
          {correo && <Correo volver={step1} close={redirect} next={step2} />}
          {conf && <Confirmacion close={redirect} />}
        </LayoutSecundario>
      </>
    </>
  );
};

export default CambiarCorreo;
