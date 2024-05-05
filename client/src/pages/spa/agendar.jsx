import Navbar from "../../components/ui/Navbar.jsx";
import Pasos from "../../components/ui/PasosDeProcesos.jsx";
import Agendar from "../../components/ui/servicios/agendar/AgendarServicios.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1 } from "@fortawesome/free-solid-svg-icons";

const agendar = () => {
  return (
    <>
      <Navbar />
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="w-[40rem] mx-auto my-5">
        <Pasos
          props={{
            paso1: "Servicios",
            paso2: "Especialista",
            paso3: "Agenda",
            paso4: "Pago",
          }}
        />
      </div>
      <Agendar />
    </>
  );
};

export default agendar;
