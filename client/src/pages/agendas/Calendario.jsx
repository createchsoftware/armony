import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import CitasPendientes from '../../components/ui/CitasPendientes';
import Calendar from 'react-calendar';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { ChevronRight } from 'lucide-react';


function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            const daysInMonth = date.daysInMonth();
            const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

            resolve({ daysToHighlight });
        }, 500);

        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });
}

// initial value for the calendar with actual date

const initialValue = dayjs();


function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '🌚' : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

function Calendario() {
    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight }) => {
                setHighlightedDays(daysToHighlight);
                setIsLoading(false);
            })
            .catch((error) => {
                // ignore the error if it's caused by `controller.abort`
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });

        requestAbortController.current = controller;
    };

    React.useEffect(() => {
        fetchHighlightedDays(initialValue);
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }

        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };
    const [value, onChange] = useState(new Date());

    const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
    const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION

    async function recibido() {
        const respuesta = await fetch('/api/logueado', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!respuesta.ok) {
            setNombre(null);
            setCorreo(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setNombre(respuestaJson.nombre);
            setCorreo(respuestaJson.email);
        }
        else {
            setNombre(null);
            setCorreo(null);
        }
    }

    useEffect(() => {
        recibido()
    }, []);


    const citasPendientes = [
        {
            id: 1,
            nombre: 'Cita 1',
            estado: 'Pendiente',
            especialista: 'Especialista 1',
            fecha: '2022-12-12',
            hora: '10:00',
        },
        {
            id: 2,
            nombre: 'Cita 2',
            estado: 'Pendiente',
            especialista: 'Especialista 2',
            fecha: '2022-12-12',
            hora: '10:00',
        },
        {
            id: 3,
            nombre: 'Cita 3',
            estado: 'Pendiente',
            especialista: 'Especialista 3',
            fecha: '2022-12-12',
            hora: '10:00',
        },
        {
            id: 4,
            nombre: 'Cita 4',
            estado: 'Pendiente',
            especialista: 'Especialista 4',
            fecha: '2022-12-12',
            hora: '10:00',
        },
        {
            id: 5,
            nombre: 'Cita 5',
            estado: 'Pendiente',
            especialista: 'Especialista 5',
            fecha: '2022-12-12',
            hora: '10:00',
        },
        {
            id: 6,
            nombre: 'Cita 6',
            estado: 'Pendiente',
            especialista: 'Especialista 6',
            fecha: '2022-12-12',
            hora: '10:00',
        },
        {
            id: 7,
            nombre: 'Cita 7',
            estado: 'Pendiente',
            especialista: 'Especialista 7',
            fecha: '2022-12-12',
            hora: '10:00',
        },
    ]

    return (
        <LayoutPrincipal>
            <main className='flex justify-center gap-6 p-8 mt-24 mb-12 w-[90%]'>
                <section className='w-1/2 p-6 '>
                    {/* <Calendar onChange={onChange} value={value} /> */}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            defaultValue={initialValue}
                            loading={isLoading}
                            onMonthChange={handleMonthChange}
                            renderLoading={() => <DayCalendarSkeleton />}
                            slots={{
                                day: ServerDay,
                            }}
                            slotProps={{
                                day: {
                                    highlightedDays,
                                },
                            }}
                        />
                    </LocalizationProvider>

                </section>
                <section className='w-1/2 ring-1'>
                    <h1 className='text-xl  text-[#036C65]'>Selecciona tu especialista</h1>
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlay
                        className='z-0'
                        autoPlaySpeed={3000}
                        centerMode={false}
                        containerclassName=" z-0"
                        dotListclassName=""
                        // draggable
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
                                items: 1,
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
                    >
                        <div className='p-8 font-[abeatbyKai] ring-1 w-2/3 m-auto bg-rose-200'>
                            <a href="#"><img className='m-auto rounded-2xl' src="../../../public/pictures/2wellness.jpg" alt="" /></a>
                            <h6 className='pt-4 text-lg font-bold text-center'>SPA - Masaje facial</h6>
                            <p className='pt-2 text-center'>Encuentra la calma en un masaje facial que renueve tu piel y brinda un momento de paz</p>
                            <div className='flex justify-center mt-4'>
                                <a class='flex justify-center' href="#"
                                    className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Ver más<ChevronRight color="#036c65" />
                                </a>
                            </div>
                        </div>
                    </Carousel>

                </section>
            </main>
        </LayoutPrincipal >
    );
}

export default Calendario;