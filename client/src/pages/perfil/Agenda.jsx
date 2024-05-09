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
            badgeContent={isSelected ? '🌚' : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

function Agenda() {
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
            </main>
        </LayoutPrincipal >
    );
}

export default Agenda;