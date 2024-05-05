import Navbar from "../../components/ui/Navbar.jsx";
import Contrasena from "../../components/ui/Login/Procesos/CrearCuenta/Contrasena.jsx";
import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const passwordReset = () => { 
  return (
    <>
      <Navbar />
      <Contrasena/>
    </>
  );
};

export default passwordReset;