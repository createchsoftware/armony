import Navbar from "../../components/ui/Navbar.jsx";
import ConfirmacionCuenta from "../../components/ui/Login/Procesos/CrearCuenta/ConfirmacionCuenta.jsx";
import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SignUpConfirmacion = () => { 
  
  return (
    <>
      <Navbar />
      <ConfirmacionCuenta/>
    </>
  );
};

export default SignUpConfirmacion;