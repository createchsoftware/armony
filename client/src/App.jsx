import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
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
                    <Route path="/spa/perfil" element={<Perfil />} />
                    <Route path="/spa/perfil/informacion" element={<InformacionPersonal />} />
                    <Route path="/spa/perfil/seguridad" element={<Seguridad />} />
                    <Route path="/spa/perfil/monedero" element={<Monedero />} />
                    <Route path="/spa/perfil/direcciones" element={<Direcciones />} />
                    <Route path="/spa/perfil/suscripciones" element={<Suscripciones />} />
                    <Route path="/spa/perfil/tarjetas" element={<Tarjetas />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </>
    );
}
 
export default App;