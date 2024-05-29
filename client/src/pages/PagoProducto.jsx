import Carousel from 'react-multi-carousel';
import Ofertas from '../components/ui/Ofertas';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import LayoutPrincipal from "../layouts/LayoutPrincipal";
import { Navigate, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Pago from "../components/ui/PagoDeProducto";
import RevisionProductos from "../components/ui/RevisionProductos";
import FinalizacionPago from "../components/ui/FinalizacionPagoServ";
import Ticket from "../components/ui/TicketProducto";
import "./cita/Transiciones.css";
import { useLocation } from 'react-router-dom';
import FinalizacionPagoProd from '../components/ui/FinalizacionPagoProd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowProps } from 'react-multi-carousel/lib/types'
import { faDiamond, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const steps = [
  "Productos",
  "Pago",
  "Confirmación",
  "Ticket"
];

export default function Cita({ producto }) {

  const notify = () => toast("Producto agregado al carrito");
  const location = useLocation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

  const [descuentos, setDescuentos] = useState([]);

  //useEffect para obtener los productos con descuento
  useEffect(() => {
    fetch("/api/admin/productos/descuento")
      .then((response) => response.json())
      .then((data) => {
        // Acceder al array de objetos en la posición 0 del array dentro de data
        console.log(data.data);
        setDescuentos(data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

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
    navigate(-1);
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
  const revisionProductosContent = (
    <>
      <div className='p-8 mt-12 border-2 shadow-md rounded-xl border-gray'>
        <h1 className='text-3xl ml-[8%]'>Productos similares</h1>
        <section className='my-4 w-[90%] bg-white m-auto p-6 rounded-xl border-8 border-[#E2B3B7]'>
          <hr />
          <div className='mx-auto p-6 md:p-0 selection:bg-[#EB5765] selection:text-white'>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlay
              autoPlaySpeed={3000}
              centerMode={false}
              className="z-0"
              containerclassName="container-with-dots z-0"
              dotListclassName=""
              focusOnSelect={false}
              infinite
              itemclassName=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024
                  },
                  items: 4,
                  partialVisibilityGutter: 40
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0
                  },
                  items: 1,
                  partialVisibilityGutter: 30
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464
                  },
                  items: 2,
                  partialVisibilityGutter: 30
                }
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderclassName=""
              slidesToSlide={1}
              swipeable
              customLeftArrow={<FontAwesomeIcon
                icon={faAngleLeft}
                size="lg"
                className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 -left-3 text-3xl text-primary-900 aspect-square bg-[#e6e6e6] rounded-full text-[#036C65] p-4 hover:opacity-90 overflow-visible z-50"
              />}
              customRightArrow={<FontAwesomeIcon
                size="lg"
                icon={faAngleRight}
                className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 -right-3 text-3xl text-primary-900 bg-[#e6e6e6] rounded-full aspect-square text-[#036C65] p-4 hover:opacity-90 overflow-visible z-50"
              />}
            >
              {descuentos.map(oferta => (
                <Ofertas key={oferta.id} producto={oferta} />
              ))}
            </Carousel>
          </div>
        </section>
      </div>
    </>
  );


  //si el producto es null o undefined, hacer stepComponents[activeStep]
  //si el producto no es null o undefined, hacer stepComponents[activeStep] con el producto

  const stepComponents = [
    location.state.producto ? (
      <RevisionProductos restart={restart} next={handleClick} back={handleBack} key={3} producto={location.state.producto} />
    ) : (
      <RevisionProductos restart={restart} next={handleClick} key={3} />
    ),
    location.state.producto ? (
      <Pago key={4} next={handleClick} producto={location.state.producto} />
    ) : (
      <Pago key={4} next={handleClick} />
    ),
    (location.state.producto) ? (
      <FinalizacionPagoProd key={5} next={handleClick} producto={location.state.producto} />
    ) : (
      <FinalizacionPagoProd key={5} next={handleClick} />
    ),
    <Ticket key={6} next={handleClick} />,
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
                <div className='grid grid-cols-2'>
                  {isLastStep() && (
                    <>
                      <a
                        disabled={activeStep === steps.length - 1}
                        // hidden={activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5}
                        href='/perfil/historial'
                        className="px-4 py-2 mx-auto text-xl bg-white rounded-full ring-1 text-rose-400 ring-rose-400"
                        sx={{ mr: 1 }}
                      >
                        Ver historial
                      </a>
                      <a
                        // hidden={activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5}
                        href='/spa/productos'
                        disabled={activeStep === steps.length - 1}
                        className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
                      >
                        Finalizar
                      </a>
                    </>
                  )}
                </div>
                <div className="hidden grid-cols-3 ">
                  <button
                    hidden
                    disabled={activeStep === 0}
                    // hidden={activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5}
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
                    // hidden={activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5}
                    onClick={handleCancel}
                    disabled={activeStep === steps.length - 1}
                    className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-[#036C65] hover:bg-opacity-70"
                  >
                    Cancelar
                  </button>
                  <button
                    // hidden={activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5}
                    onClick={handleClick}
                    disabled={activeStep === steps.length - 1}
                    className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
                  >
                    Siguiente
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
          {activeStep === 0 && revisionProductosContent}
        </Box>
      </div>
      <ToastContainer position={'bottom-right'} theme={'light'} />
    </LayoutPrincipal>
  );
}