import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Spa from "./pages/spa";
import Tienda from "./pages/Tienda";
import Perfil from "./pages/Perfil";
import InformacionPersonal from "./pages/perfil/InformacionPersonal";
import Seguridad from "./pages/perfil/Seguridad";
import Monedero from "./pages/perfil/Monedero";
import Direcciones from "./pages/perfil/Direcciones";
import Suscripciones from "./pages/perfil/Suscripciones";
import Tarjetas from "./pages/perfil/Tarjetas";
import Error from "./pages/Error";
import PasswordReset from "./pages/spa/passwordReset";
import SignUp from "./pages/spa/signUp";
import ServiciosSpa from "./pages/spa/spaServicios";
import ServiciosEstetica from "./pages/spa/esteticaServicios";
import Agendar from "./pages/spa/agendar";
import Favoritos from "./pages/perfil/ListaDeseo";
import Test from "./components/ui/Test";
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
          <Route path="/spa/signUp" element={<SignUp />} />
          <Route path="/spa/serviciosSpa" element={<ServiciosSpa />} />
          <Route
            path="/spa/serviciosEstetica"
            element={<ServiciosEstetica />}
          />
          <Route path="/spa/agendar" element={<Agendar />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/informacion" element={<InformacionPersonal />} />
          <Route path="/perfil/seguridad" element={<Seguridad />} />
          <Route path="/perfil/monedero" element={<Monedero />} />
          <Route path="/perfil/direcciones" element={<Direcciones />} />
          <Route path="/perfil/suscripciones" element={<Suscripciones />} />
          <Route path="/perfil/tarjetas" element={<Tarjetas />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<Error />} />

          {/* Tests */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
