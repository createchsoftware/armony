import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import LayoutPrincipal from "../layouts/LayoutPrincipal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Paquetes from "./cita/Paquetes";
import Calendario from "./cita/Calendario";
import Pago from "../components/ui/Pago";
import Agenda from "../components/ui/Agenda";
import Servicios from "../components/ui/servicios/agendar/AgendarServicios";
import FinalizacionPago from "../components/ui/FinalizacionPagoServ";
import Ticket from "../components/ui/TicketServicio";
import "./cita/Transiciones.css";

const steps = [
  "Servicios",
  "Paquetes",
  "Especialista",
  "Agenda",
  "Pago",
  "Confirmación",
  "Ticket",
];

export default function Cita() {
 

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const [completed, setCompleted] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const nextButtonText =
    activeStep === steps.length - 1 ? "Finalizar" : "Siguiente";

    useEffect(() => {
      if(localStorage.getItem('citaModify')!==null){
        setActiveStep(2);
        let cita=localStorage.getItem('citaModify')
        localStorage.setItem("Evaluando",true);

        localStorage.setItem("idcita",cita.ID_Cita);
    localStorage.setItem('servicio',1);
    localStorage.setItem("Especialista",cita.ID_Empleado);
    localStorage.setItem("hora",cita.hora_Inicio);
    localStorage.setItem("Fecha seleccionada",cita.fecha);
     }
    }, [ localStorage.getItem('citaModify')]);
    
    useEffect(() => {
      //cuando el usuario llegue al paso 4  se ajecutara
      if (activeStep === 0) {
        localStorage.removeItem("citaModify");
      }
    }, [activeStep]);

  // const citasAgregadas = [];
  // localStorage.setItem('citas', JSON.stringify(citasAgregadas));
  // useEffect(() => {
  //   localStorage.clear();
  // }, []); // Se ejecutará una vez al montar el component

 
 // Actualiza el activeStep basado en el estado pasado a través de location.state

  async function checkLogin() {
    let respuestaJson = null;
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      respuestaJson = await respuesta.json();

      if (respuestaJson.logueado != true) {
        window.location.href = "/spa";
      }
    } catch (error) {
      window.location.href = "/spa";
    }
  }

  useEffect(() => checkLogin(), []);

  useEffect(() => {
    //cuando el usuario llegue al paso 4  se ajecutara
    if (activeStep === 3) {
      paso4();
    }
  }, [activeStep]);

  useEffect(() => {
    //cuando el usuario llegue al paso 4  se ajecutara
    if (activeStep === 5) {
      paso6();
    }
  }, [activeStep]);

  const paso4 = () => {
    agregadoCitas(); // se guardara su servicio en un array
    removeLSCitas(); //despues se eliminaran del localstorage para posteriormente volverlos a declarar
    // LocalBase()
  };
  const paso6 = () => {
    removeLSPago();
  };

  const restart = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const saveScrollPosition = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [activeStep]);

  const handleNext = () => {
    saveScrollPosition();
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    saveScrollPosition();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    // setActiveStep(0);
    // setCompleted({});
    window.location.href = '/spa';
  };

  const handleStep = (step) => () => {
    saveScrollPosition();
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleClick = () => {
    handleComplete();
    if (isLastStep() || activeStep === 6) {
      window.location.href = "/spa";
    }
    //     setTimeout(() => {
    //     iterateArray();
    // }, 1000);
  };

  const handleAgenda = () => {
    window.location.href = "/perfil/agenda";
  }

  // const iterateArray = () => {
  //   let myArray = JSON.parse(localStorage.getItem('citas')) || [];
  //   console.log(myArray)
  // };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const removeLSCitas = () => {
    localStorage.removeItem("servicio");
    localStorage.removeItem("nombre");
    localStorage.removeItem("precio");
    localStorage.removeItem("tiempo");
    localStorage.removeItem("imagen");
    localStorage.removeItem("paquete");
    localStorage.removeItem("sesiones");
    localStorage.removeItem("Especialista");
    localStorage.removeItem("hora");
    localStorage.removeItem("Fecha seleccionada");
    localStorage.removeItem("NombreEspecialista");


  };

  const removeLSPago = () => {
    localStorage.removeItem("tarjeta");
    localStorage.removeItem("cliente");
    localStorage.removeItem("total");
  };
  const agregadoCitas = () => {
    const newProduct = {
      idServicio: localStorage.getItem("servicio"),
      nombreServicio: localStorage.getItem("nombre"),
      precioServicio: localStorage.getItem("precio"),
      tiempoServicio: localStorage.getItem("tiempo"),
      ImagenServicio: localStorage.getItem("imagen"),
      //"Servicio":localStorage.getItem("paquete"),
      // localStorage.getItem("sesiones") ,
      IdEspecialista: localStorage.getItem("Especialista"),
      horaDisp: localStorage.getItem("hora"),
      FechaServicio: localStorage.getItem("Fecha seleccionada"),
      nombreEsp: localStorage.getItem("NombreEspecialista"),
    };
    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    citas.push(newProduct);
    localStorage.setItem("citas", JSON.stringify(citas));
    localStorage.getItem("citas");
  };

  const LocalBase = () => {
    console.log(
      localStorage.getItem("servicio") +
      " " +
      localStorage.getItem("nombre") +
      " " +
      localStorage.getItem("precio") +
      " " +
      localStorage.getItem("tiempo") +
      " " +
      localStorage.getItem("imagen") +
      " " +
      localStorage.getItem("paquete") +
      " " +
      localStorage.getItem("sesiones") +
      " " +
      localStorage.getItem("Especialista") +
      " " +
      localStorage.getItem("hora") +
      " " +
      localStorage.getItem("Fecha seleccionada") +
      " " +
      localStorage.getItem("NombreEspecialista")
    );
  };
  const stepComponents = [
    <Servicios key={0} next={handleClick} />,
    <Paquetes key={1} next={handleClick} />,
    <Calendario next={handleClick} key={2} />,
    <Agenda restart={restart} next={handleClick} key={3} />,
    <Pago next={handleClick} key={4} />,
    <FinalizacionPago next={handleClick} key={5} />,
    <Ticket key={6} />,
  ];

  return (
    <LayoutPrincipal>
      <div className="p-24">
        <Box sx={{ width: "100%" }}>
          <Stepper
            nonLinear
            activeStep={activeStep}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#036C65", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
              {
                color: "white", // Just text label (COMPLETED)
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#036C65", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
              {
                color: "white", // Just text label (ACTIVE)
              },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "white", // circle's number (ACTIVE)
              },
              // custom circle width
              "& .MuiStepIcon-root": {
                width: "2rem",
                height: "2rem",
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton
                  disabled={!completed[index] && index > activeStep}
                  color={{ backgroundColor: "red" }}
                  onClick={handleStep(index)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <TransitionGroup>
            <CSSTransition key={activeStep} timeout={900} classNames="fade">
              <div className="p-8">{stepComponents[activeStep]}</div>
            </CSSTransition>
          </TransitionGroup>

          <div>
            {allStepsCompleted() ? (
              navigate("/perfil/agenda")
            ) : (
              // <React.Fragment>
              //   <Typography sx={{ mt: 2, mb: 1 }}>Pasos completados</Typography>
              //   <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              //     <Box sx={{ flex: "1 1 auto" }} />
              //     <Button onClick={handleReset}>Empezar de nuevo</Button>
              //   </Box>
              // </React.Fragment>
              <React.Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    Step {activeStep + 1}
                                </Typography> */}
                <div
                  className={
                    activeStep !== 6
                      ? "grid grid-cols-2 content-between"
                      : "grid grid-cols-3 content-between"
                  }
                >
                  <button
                    hidden={
                      activeStep === 5 || activeStep === 6
                    }
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={`${activeStep === 0
                      ? "hover:bg-transparent opacity-30 hover:text-rose-400"
                      : "hover:bg-red-50"
                      } px-4 py-2 mx-auto text-xl bg-white rounded-full ring-1 text-rose-400 ring-rose-400`}
                    sx={{ mr: 1 }}
                  >
                    Regresar
                  </button>
                  <button
                    hidden={activeStep === 5}
                    onClick={activeStep === 6 ? restart : handleCancel}
                    className={
                      "px-4 py-2 mx-auto text-xl text-white rounded-full bg-[#036C65] hover:bg-[#45b59c] duration-200"
                    }
                  >
                    {activeStep === 6 ? "Agendar otra cita" : "Cancelar"}
                  </button>
                  <button
                    hidden={activeStep !== 6}
                    onClick={handleAgenda}
                    className={
                      "px-4 py-2 mx-auto text-xl text-white rounded-full bg-[#036C65] hover:bg-[#45b59c] duration-200 "
                    }
                  >
                    Ver agenda
                  </button>
                  <button
                    hidden={
                      activeStep === 3 || activeStep === 4 || activeStep === 5 || activeStep === 0 || activeStep === 1 || activeStep === 2
                    }
                    // hidden={activeStep === 5 || activeStep === 4}
                    onClick={handleClick}
                    // disabled={activeStep === steps.length - 1}
                    className="px-4 py-2 mx-auto text-xl text-white duration-200 rounded-full bg-rose-400 hover:bg-red-200"
                  >
                    {nextButtonText}
                  </button>
                  {/* {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Paso {activeStep + 1} ya completado
                                            </Typography>
                                        ) : (
                                            <button onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1
                                                    ? 'Finalizar'
                                                    : 'Completar paso'}
                                            </button>
                                        ))} */}
                </div>
              </React.Fragment>
            )}
          </div>
        </Box>
      </div>
    </LayoutPrincipal>
  );
}
