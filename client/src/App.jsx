import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Spa from "./pages/spa";
import Tienda from "./pages/Tienda";
import Error from "./pages/Error";
import PasswordReset from "./pages/spa/passwordReset";
import SingUp from "./pages/spa/signUp";
import Favicon from "react-favicon";

function App() {
  return (
    <>
      <Favicon url="/favicon.ico" />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/spa/tienda" element={<Tienda />} />
          <Route path="/spa/resetPassword" element={<PasswordReset />} />
          <Route path="/spa/signUp" element={<SingUp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
