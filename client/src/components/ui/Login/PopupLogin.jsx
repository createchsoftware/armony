import { useState } from "react";
import Admin from "./Admin.jsx";
import Registro from "./Registro.jsx";
import Login from "./Login.jsx";

const PopupLogin = ({ cerrar }) => {
  const [login, setLogin] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [registro, setRegistro] = useState(false);

  const toggleLogin = (st) => {
    setLogin(!login);
    st ? setAdmin(!admin) : setRegistro(!registro);
  };

  const toggleAdmin = () => {
    setLogin(!login);
    setAdmin(!admin);
  };
  const toggleRegistro = () => {
    setLogin(!login);
    setRegistro(!registro);
  };
  return (
    <>
      {login && <Login cerrar={{ change: toggleLogin, close: cerrar }} />}
      {admin && <Admin cerrar={{ change: toggleAdmin, close: cerrar }} />}
      {registro && (
        <Registro cerrar={{ change: toggleRegistro, close: cerrar }} />
      )}
    </>
  );
};

export default PopupLogin;
