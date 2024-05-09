import Navbar from "../../components/ui/Navbar.jsx";
import Contrasena from "../../components/ui/Login/Procesos/CrearCuenta/Contrasena.jsx";
import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";

const passwordReset = () => { 
  return (
    <>
        <HelmetProvider>
        <Helmet>
            <script src="../../../scripts/step3.js"></script>
        </Helmet>
    </HelmetProvider>
      <Navbar />
      <Contrasena/>
    </>
  );
};

export default passwordReset;