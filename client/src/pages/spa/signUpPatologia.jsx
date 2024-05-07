import Navbar from "../../components/ui/Navbar.jsx";
import Patologias from "../../components/ui/Login/Procesos/CrearCuenta/Patologias.jsx";
import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const passwordReset = () => { 
  return (
    <>
      <Navbar />
      <Patologias/>
    </>
  );
};

export default passwordReset;