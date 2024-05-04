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
import Especialista from '../../components/ui/Especialista';


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


    const especialistas = [
        {
            id: 1,
            nombre: 'Dr. Juan Pérez',
            especialidad: 'Dermatólogo',
            imagen: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
            experiencia: '10 años de experiencia',
            areas: ['Dermatología', 'Cirugía', 'Estética'],
            calificacion: 5
        },
        {
            id: 2,
            nombre: 'Dra. María López',
            especialidad: 'Nutricionista',
            imagen: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
            experiencia: '5 años de experiencia',
            areas: ['Nutrición', 'Dietas', 'Salud'],
            calificacion: 4
        },
        {
            id: 3,
            nombre: 'Dr. Carlos Ramírez',
            especialidad: 'Pediatra',
            imagen: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
            experiencia: '15 años de experiencia',
            areas: ['Pediatría', 'Cuidados', 'Salud'],
            calificacion: 5
        },
        {
            id: 4,
            nombre: 'Dra. Ana Martínez',
            especialidad: 'Ginecóloga',
            imagen: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
            experiencia: '8 años de experiencia',
            areas: ['Ginecología', 'Salud', 'Cuidados'],
            calificacion: 4
        },
        {
            id: 5,
            nombre: 'Dr. José González',
            especialidad: 'Cardiólogo',
            imagen: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
            experiencia: '12 años de experiencia',
            areas: ['Cardiología', 'Salud', 'Cuidados'],
            calificacion: 5
        },]

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
                    <h1 className='text-xl  text-[#036C65] text-center my-6'>Selecciona tu especialista</h1>
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
                                items: 1,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={true}
                        sliderclassName=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {especialistas.map((especialista) => (
                            <Especialista key={especialista.id} especialista={especialista} />
                        ))}
                    </Carousel>
                    <div class="mt-6 flex gap-2 justify-center">
                        <div class="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value="" class="w-5 h-5 text-rose-400 bg-gray-100 border-gray-300 rounded focus:ring-rose-400  focus:ring-2" />
                            <label for="default-checkbox" class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Indiferente</label>
                        </div>
                    </div>
                </section>
            </main>
        </LayoutPrincipal >
    );
}

export default Calendario;