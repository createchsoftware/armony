import Navbar from "../../components/ui/Navbar.jsx";
import Patologias from "../../components/ui/Login/Procesos/CrearCuenta/Patologias.jsx";
import Footer from "../../components/ui/FooterSecundario.jsx";
import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";

const passwordReset = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../../scripts/step2.js"></script>
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <Patologias />
      <Footer />
    </>
  );
};

export default passwordReset;
