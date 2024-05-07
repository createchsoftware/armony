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
import Agenda from "./pages/perfil/Agenda";
import Suscripciones from "./pages/perfil/Suscripciones";
import Tarjetas from "./pages/perfil/Tarjetas";
import Error from "./pages/Error";
import PasswordReset from "./pages/spa/passwordReset";
import SignUp from "./pages/spa/signUp";
import Favoritos from "./pages/perfil/ListaDeseo";
import Test from "./components/ui/Test";
import Favicon from "react-favicon";
import EditarPerfil from "./pages/perfil/EditarPerfil";
import Historial from "./pages/perfil/Historial";
import Compras from "./components/ui/Compras";
import Paquetes from "./pages/cita/Paquetes";
import Calendario from "./pages/cita/Calendario";
import Cita from "./pages/Cita";
import ServiciosEstetica from "./components/ui/servicios/ServiciosEstetica";
import ServiciosSpa from "./components/ui/servicios/ServiciosSpa";
import SignUpPatologia from  "./pages/spa/signUpPatologia";
import SignUpContrasena from "./pages/spa/signUpContrasena";
import AgendarServicios from "./components/ui/servicios/agendar/AgendarServicios";

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
                    <Route path="/spa/signUp/Patologia" element={<SignUpPatologia />} />
                    <Route path="/spa/signUp/Contrasena" element={<SignUpContrasena />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/perfil/informacion" element={<InformacionPersonal />} />
                    <Route path="/perfil/seguridad" element={<Seguridad />} />
                    <Route path="/perfil/monedero" element={<Monedero />} />
                    <Route path="/perfil/direcciones" element={<Direcciones />} />
                    <Route path="/perfil/suscripciones" element={<Suscripciones />} />
                    <Route path="/perfil/tarjetas" element={<Tarjetas />} />
                    <Route path="/perfil/agenda" element={<Agenda />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                    <Route path="/perfil/editar-perfil" element={<EditarPerfil />} />
                    <Route path="/perfil/historial" element={<Historial />} />
                    <Route path="/perfil/compras" element={<Compras />} />
                    <Route path="/spa/agendar/paquetes" element={<Paquetes />} />
                    <Route path="/spa/agendar/calendario" element={<Calendario />} />
                    <Route path="/spa/agendar/" element={<Cita />} />
                    <Route path="/spa/servicios/estetica" element={<ServiciosEstetica />} />
                    <Route path="/spa/servicios/spa" element={<ServiciosSpa />} />
                    <Route path="/spa/servicios/agendar-servicios" element={<AgendarServicios />} />
                    <Route path="*" element={<Error />} />
                    {/* Tests */}
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;