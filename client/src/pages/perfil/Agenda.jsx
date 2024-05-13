import React, { useState, useEffect } from 'react'
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
            badgeContent={isSelected ? <svg fill="#036C65" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="16"></circle> </g></svg> : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

function Agenda() {
    const [selectedDate, setSelectedDate] = useState(initialValue);
    const [horasDisponibles, setHorasDisponibles] = useState([]);

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

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        localStorage.setItem('Fecha seleccionada', newDate.format("YYYY-MM-DD"));
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

    const dayStyle = {
        // Estilo por defecto de los días
        // '& .MuiPickersDay-root': {
        //     color: 'black', // Color de días no seleccionados
        // },

        // Estilo para el día actual
        '& .MuiPickersDay-today': {
            color: 'black !important', // Color para el día actual
            fontWeight: 'bold !important',
            backgroundColor: 'white !important',
            //border red
            border: '3px solid #ec5766 !important',
        },


        // // Estilo para los días seleccionados background
        // '& .MuiPickersDay-daySelected': {
        //     backgroundColor: '#ec5766',
        //     color: 'white',
        //     borderRadius: '50%',
        //     '&:hover': {
        //         backgroundColor: '#ec5766',
        //         color: 'white',
        //         borderRadius: '50%',
        //     },
        // },
    };

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
            <main className='grid gap-6 p-8 mt-24 mb-12 m-auto w-[90%]'>

                <section className='rounded-2xl p-9 w-1/2 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img className='w-32 m-auto my-12 rounded-full -mt-28 aspect-square' src="../../pictures/agendaFondo.png" alt="" />
                    <img className='w-16 m-auto my-12 -mt-36 aspect-square' src="../../pictures/agendaDentro.png" alt="" />
                    <div className='m-auto text-center '>
                        <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Agenda</h1>
                        <h2 className='text-xl'>Calendario de citas pendientes</h2>
                    </div>
                </section>


                <div className='flex justify-center gap-6 p-8 '>
                    <section className='w-1/2 p-6 '>
                        {/* <Calendar onChange={onChange} value={value} /> */}
                        <div className=''>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    sx={[dayStyle,
                                        {
                                            svg: { fill: '#ec5766 !important' },
                                            input: { fill: '#ec5766 !important' },
                                            label: { fill: '#ec5766 !important' },
                                            "& .MuiPickersCalendarHeader-switchHeader": {
                                                color: "#036C65 !important",
                                            },
                                            // month color 
                                            "& .MuiPickersCalendarHeader-transitionContainer": {
                                                color: "#036C65 !important",

                                            },
                                            "& .MuiPickersDay-root": {
                                                "&.Mui-selected": {
                                                    fontWeight: 'bold !important',
                                                    backgroundColor: "#036C65 !important",
                                                    color: "white !important",
                                                },
                                            },


                                        }]}
                                    disableFuture
                                    className=''
                                    defaultValue={initialValue}
                                    value={selectedDate}
                                    onChange={handleDateChange}
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
                        </div>

                    </section>
                    <section className='w-1/2 p-6'>
                        <div className='flex justify-between gap-6 my-6'>
                            <h2 className='text-[#EB5765] text-2xl'>Citas Pendientes</h2>
                            <a href="/client/src/"><svg width="24" height="24" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20.5" cy="20.5" r="19.5" fill="white" stroke="#EB5765" stroke-width="2" />
                                <line x1="20.9082" y1="10.0313" x2="20.9082" y2="31.8068" stroke="#EB5765" stroke-width="5" stroke-linecap="round" />
                                <line x1="9.19434" y1="20.0918" x2="30.9698" y2="20.0918" stroke="#EB5765" stroke-width="5" stroke-linecap="round" />
                            </svg>
                            </a>
                        </div>
                        <div className='grid gap-6'>
                            {citasPendientes.map(cita => (
                                <CitasPendientes cita={cita} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </LayoutPrincipal >
    );
}

export default Agenda;