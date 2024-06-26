import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import LayoutPrincipal from "../layouts/LayoutPrincipal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Pago from "../components/ui/PagoDeSuscripcion";
import RevisionSuscripcion from "../components/ui/RevisionSuscripcion";
import FinalizacionPago from "../components/ui/FinalizacionPagoSus";
//import Ticket from "../components/ui/TicketServicio";
import "./cita/Transiciones.css";

const steps = [
  "Revisión",
  "Pago",
  "Confirmación"
  // ,
  // "Ticket"
];

export default function Cita({ producto }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

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
    setActiveStep(0);
    setCompleted({});
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
    LocalBase();
  };

  const handleFinish = () => {
    window.location.href = "/perfil/suscripciones"
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const LocalBase = () => {
    console.log(
      localStorage.getItem("servicio") +
      " " +
      localStorage.getItem("paquete") +
      " " +
      localStorage.getItem("sesiones") +
      " " +
      localStorage.getItem("Especialista") +
      " " +
      localStorage.getItem("hora") +
      " " +
      localStorage.getItem("Fecha seleccionada")
    );
  };

  const stepComponents = [
    <RevisionSuscripcion key={3} />,
    <Pago next={handleClick} key={4} />,
    <FinalizacionPago next={handleFinish} key={5} />
    // ,
    // <Ticket key={6} />,
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
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>Pasos completados</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Empezar de nuevo</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    Step {activeStep + 1}
                                </Typography> */}
                <div className={activeStep === 0 ? "grid content-end place-content-end w-[85%] mx-auto" : "grid grid-cols-2"}>
                  <button
                    hidden={activeStep === 0 || activeStep === 1 || activeStep === 2 || isLastStep()}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={`${activeStep === 0
                      ? "hover:bg-transparent opacity-30 pr-8 hover:text-rose-400"
                      : "hover:bg-red-50"
                      } px-4 py-2 mx-auto text-xl bg-white rounded-full ring-1 text-rose-400 ring-rose-400`}
                    sx={{ mr: 1 }}
                  >
                    Regresar
                  </button>
                  <button
                    hidden={activeStep === 0 || activeStep === 1 || activeStep === 2 || isLastStep()}
                    onClick={handleCancel}
                    disabled={activeStep === steps.length - 1}
                    className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-[#036C65] hover:bg-opacity-70"
                  >
                    Cancelar
                  </button>
                  {isLastStep() ? (
                    <a
                      hidden
                      href="/suscripcion"
                      className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
                    >
                      Finalizar
                    </a>
                  ) : (
                    <button
                      hidden={activeStep === 1 || activeStep === 2}
                      onClick={handleClick}
                      disabled={activeStep === steps.length - 1}
                      className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
                    >
                      Siguiente
                    </button>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </Box>
      </div>
    </LayoutPrincipal>
  );
}
