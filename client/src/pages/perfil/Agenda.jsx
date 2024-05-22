import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import Calendar from 'react-calendar';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import 'dayjs/locale/es'; // Importar locale español
import localizedFormat from 'dayjs/plugin/localizedFormat'; // Plugin para formatos localizados

dayjs.extend(localizedFormat); // Extender dayjs con el plugin
dayjs.locale('es'); // Usar locale español


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
    // Calendario
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


    // Inicio de sesión
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

    // Estilos Calendario
    const dayStyle = {
        //

        // Estilo por defecto de los días
        // '& .MuiPickersDay-root': {
        //     color: 'black', // Color de días no seleccionados
        // },

        // Estilo para el día actual
        '& .MuiPickersDay-today': {
            color: 'white !important', // Color para el día actual
            fontWeight: 'bold !important',
            backgroundColor: '#036C65 !important',
            //border red

            border: '3px solid #036C65 !important',
        },

        // calendar background color to #5b9f9b
        '& .MuiPickersCalendar-root': {

            backgroundColor: '#5b9f9b !important',
        },

        // change header font type
        '& .MuiPickersCalendarHeader-transitionContainer': {
            fontFamily: 'iloveglitter !important',

        },

        '& .MuiBadge-badge': {
            // Adjustment for recordMade badge 
            fontSize: '0.7em',

            paddingTop: '4px'
        },
        // '& .MuiPickersBasePicker-pickerView': {
        //     fontWeight: 'bold !important',
        // },

        '& .MuiDayCalendar-header': {
            // Needed for weekday (ie S M T W T F S )adjustments (and padding if wanted)
            // Adjusts spacing between
            justifyContent: 'center',
            width: '100%',
            margin: '0px',
            overflow: 'hidden',

            // paddingTop: '1em',
            // paddingBottom: "1em",

        },
        '& .MuiDayCalendar-weekContainer': {
            // Adjusts spacing between days (ie 1, 2, 3.. 27, 28)
            justifyContent: 'center',
            overflow: 'hidden',
            width: '100%',
            margin: -1
        },
        '& .MuiPickersDay-dayWithMargin': {
            // Grows width/height of day buttons
            width: 'calc(100% - 19px)',
            height: 'calc(100% - 19px)',
            aspectRatio: '1.0',
            // height: 'auto',
            fontWeight: 'bold !important',
            fontFamily: 'abeatbyKai',
            fontSize: '1em',
        },
        '& .MuiBadge-root': {
            // Parent of button management
            aspectRatio: 1,
            width: '12%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center'
        },
        '& .MuiDayCalendar-weekDayLabel': {
            // Manages size of weekday labels
            aspectRatio: 1,
            width: 'calc(10% + 4px)', // deals with margin
            fontSize: '1.0em'
        },
        '& .MuiPickersCalendarHeader-label': {
            // Manages month/year size
            fontSize: '4em',
            fontFamily: 'iloveglitter',
        },
        '& .MuiDayCalendar-monthContainer': {
            // Not sure if needed, currently works tho
            width: '100%',
        },
        '& .MuiPickersFadeTransitionGroup-root-MuiDateCalendar-viewTransitionContainer': {
            // Handles size of week row parent, 1.6 aspect is good for now
            aspectRatio: '1.6',
            overflow: 'hidden'
        },
        '& .MuiDayCalendar-slideTransition': {
            // Handles size of week row parent, 1.6 aspect is good for now
            aspectRatio: 1.6,
            width: '100%',
            overflow: 'hidden'
        },
        '& .MuiDayCalendar-loadingContainer': {
            width: '100%',
            aspectRatio: 1.6,
        },
        '& .MuiDayCalendarSkeleton-root': {
            width: '100%'
        },
        '& .MuiDayCalendarSkeleton-week': {
            width: '100%'
        },
        '& .MuiDayCalendarSkeleton-daySkeleton': {
            width: 'calc(10% - 4px) !important', // Deals with the margin calcs
            aspectRatio: '1 !important',
            height: 'auto !important'
        },
        width: '80%',
        height: '100%'

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

    const [citasPendientes, setCitasPendientes] = useState([]);
    const [citasFiltradas, setCitasFiltradas] = useState([]);

    const [id, setId] = useState(false); //<<< PARA EL INICIO DE SESION

    async function recibido() {
        const respuesta = await fetch('/api/logueado', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!respuesta.ok) {
            setId(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setId(respuestaJson.pkIdUsuario);
        }
        else {
            setId(null);
        }
    }

    //useEffect para obtener las citas pendientes
    useEffect(() => {
        fetch(`/api/admin/citas/pendientes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCitasPendientes(data);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, []);

    useEffect(() => {
        let updatedCitas = citasPendientes;

        if (selectedDate) {
            updatedCitas = citasPendientes.filter(cita => {
                const date = dayjs(cita.fecha);
                return date.isSame(selectedDate, 'day');
            }
            );
        }

        setCitasFiltradas(updatedCitas);

    }, [selectedDate]);


    //citas from local storage
    const citasFromLocalStorage = JSON.parse(localStorage.getItem('citas'));
    const [citas, setCitas] = useState(citasFromLocalStorage || citasPendientes);

    useEffect(() => {
        const citasFromLocalStorage = JSON.parse(localStorage.getItem('citas'));
        if (citasFromLocalStorage) {
            setCitas(citasFromLocalStorage);
        }
    }, []);

    const removeItem = (id) => {
        const updatedCitas = citas.filter(cita => cita.id !== id);
        setCitas(updatedCitas);
        localStorage.setItem('citas', JSON.stringify(updatedCitas));
    };

    function firstLetterUppercase(string) {
        return string.charAt(0).toLocaleUpperCase() + string.slice(1);
    }

    function formatHora12(hora24) {
        const [hora, minutos] = hora24.split(':');
        const hora12 = hora % 12 || 12;
        const ampm = hora <= 12 ? 'am' : 'pm';
        return `${hora12}:${minutos} ${ampm}`;
    }

    const citasMostrar = citas.map(cita => {
        const date = dayjs(cita.fecha);
        const año = date.format('YYYY');
        const mes = date.format('MM');
        const dia = date.format('DD');
        const nombreDia = date.format('dddd');
        const nombreMes = date.format('MMMM');

        return (
            <div key={cita.id} className='flex py-0 pl-0 pr-6 shadow-2xl rounded-xl place-content-between'>
                <div className='flex gap-6'>
                    <div className='bg-[#036C65] h-full w-5 rounded-full'></div>
                    <div className='my-4'>
                        <h1>{cita.nombre}</h1>
                        <p className='text-[#B78686]'>{cita.estado}</p>
                        <p className='text-[#B78686]'> Especialista: {cita.especialista}</p>
                        <p>{firstLetterUppercase(nombreDia) + ' ' + dia + ', ' + firstLetterUppercase(nombreMes) + ' ' + año + ', ' + formatHora12(cita.hora)}</p>
                    </div>
                </div>
                <div className='flex gap-4 my-6'>
                    <button>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.80195 26.0443C3.53478 26.0452 3.27061 25.9879 3.02778 25.8765C2.78495 25.7651 2.56927 25.6021 2.3957 25.399C2.22213 25.1959 2.09483 24.9574 2.02263 24.7002C1.95043 24.443 1.93506 24.1731 1.97758 23.9093L2.75195 19.0181C2.81044 18.633 2.99147 18.2771 3.2682 18.0031L18.4932 2.77808C19.022 2.25177 19.7377 1.9563 20.4838 1.9563C21.2299 1.9563 21.9456 2.25177 22.4745 2.77808L25.222 5.52558C25.7483 6.05439 26.0437 6.77011 26.0437 7.5162C26.0437 8.26229 25.7483 8.97801 25.222 9.50683L9.99695 24.7318C9.72292 25.0086 9.36699 25.1896 8.98195 25.2481L4.0907 26.0224C3.99506 26.0363 3.89859 26.0436 3.80195 26.0443ZM20.4838 3.70558C20.3434 3.70504 20.2043 3.7322 20.0745 3.7855C19.9446 3.8388 19.8265 3.9172 19.727 4.0162L4.50633 19.25C4.49862 19.2565 4.49232 19.2645 4.4878 19.2735C4.48329 19.2825 4.48066 19.2924 4.48008 19.3025L3.7057 24.1849C3.70349 24.1998 3.70479 24.215 3.7095 24.2293C3.71422 24.2436 3.72221 24.2565 3.73284 24.2672C3.74348 24.2778 3.75646 24.2858 3.77074 24.2905C3.78502 24.2952 3.8002 24.2965 3.81508 24.2943L8.70633 23.52C8.72355 23.5166 8.73905 23.5073 8.75008 23.4937L23.9751 8.27308C24.1752 8.07289 24.2876 7.80143 24.2876 7.51839C24.2876 7.23534 24.1752 6.96388 23.9751 6.7637L21.2363 4.0162C21.1377 3.91714 21.0205 3.83866 20.8913 3.78533C20.7621 3.73201 20.6236 3.7049 20.4838 3.70558Z" fill="#222222" />
                            <path d="M23.5725 10.7931C23.4573 10.7938 23.3431 10.7717 23.2365 10.7282C23.1299 10.6846 23.033 10.6205 22.9512 10.5394L17.4606 5.04875C17.2964 4.88456 17.2042 4.66188 17.2042 4.42969C17.2042 4.19749 17.2964 3.97481 17.4606 3.81062C17.6248 3.64644 17.8475 3.5542 18.0796 3.5542C18.3118 3.5542 18.5345 3.64644 18.6987 3.81062L24.1893 9.30125C24.2707 9.38251 24.3352 9.47901 24.3793 9.58524C24.4233 9.69146 24.446 9.80532 24.446 9.92031C24.446 10.0353 24.4233 10.1492 24.3793 10.2554C24.3352 10.3616 24.2707 10.4581 24.1893 10.5394C24.0253 10.7021 23.8035 10.7933 23.5725 10.7931ZM9.49808 24.8675C9.26702 24.8677 9.04526 24.7765 8.88121 24.6137L3.38621 19.1187C3.23568 18.952 3.15503 18.7338 3.16095 18.5093C3.16687 18.2847 3.25892 18.0711 3.41802 17.9125C3.57713 17.754 3.79111 17.6627 4.01567 17.6576C4.24023 17.6525 4.45815 17.7339 4.62433 17.885L10.1193 23.3756C10.2412 23.4982 10.3241 23.6542 10.3574 23.8239C10.3907 23.9935 10.373 24.1693 10.3065 24.3289C10.2401 24.4885 10.1278 24.6248 9.98393 24.7207C9.84004 24.8165 9.67098 24.8676 9.49808 24.8675Z" fill="#222222" />
                            <path d="M6.75071 22.1244C6.57654 22.1263 6.40577 22.0761 6.26026 21.9804C6.11475 21.8847 6.00113 21.7477 5.93394 21.587C5.86675 21.4263 5.84904 21.2492 5.8831 21.0784C5.91715 20.9076 6.00141 20.7508 6.12509 20.6281L20.2082 6.56251C20.2849 6.46594 20.3812 6.38667 20.4906 6.32991C20.6001 6.27314 20.7203 6.24015 20.8435 6.23312C20.9666 6.22608 21.0898 6.24514 21.205 6.28907C21.3203 6.33299 21.4249 6.40077 21.5121 6.48797C21.5993 6.57517 21.6671 6.67982 21.711 6.79506C21.755 6.91029 21.774 7.03351 21.767 7.15663C21.7599 7.27975 21.727 7.39999 21.6702 7.50947C21.6134 7.61895 21.5342 7.71519 21.4376 7.79189L7.37196 21.875C7.20612 22.0372 6.98266 22.1269 6.75071 22.1244Z" fill="#222222" />
                        </svg>
                    </button>
                    <button className='duration-200 hover:text-[#ec5766] text-2xl' onClick={() => removeItem(cita.id)} >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div >
        )
    })

    return (
        < LayoutPrincipal >
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


                <div className='flex items-start justify-center gap-4'>
                    <section className='w-1/2 p-2'>
                        {/* <Calendar onChange={onChange} value={value} /> */}
                        <div className='bg-[#5b9f9b] py-20 w-[90%] rounded-xl items-center flex h-[100%]'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    sx={[dayStyle,
                                        {
                                            // color de los botones
                                            // "& .MuiButtonBase-root": {
                                            //     background: '#ec5766 !important',
                                            // },
                                            // color del calendario
                                            "& .MuiPickersCalendarHeader-switchHeader": {
                                                color: '#036C65 !important',
                                            },
                                            // bold
                                            "& .MuiPickersDay-day": {
                                                fontWeight: 'bold !important',
                                            },

                                            input: { fill: 'black !important' },
                                            label: { fill: '#ec5766 !important' },
                                            svg: { fill: 'white !important' },
                                            fontFamily: 'IloveGlitter !important',
                                            // month color 
                                            "& .MuiPickersCalendarHeader-transitionContainer": {
                                                color: "#036C65 !important",

                                            },
                                            // day color
                                            "& .MuiPickersDay-root": {
                                                "&.Mui-selected": {
                                                    fontWeight: 'bold !important',
                                                    backgroundColor: "#036C65 !important",
                                                    color: "white !important",
                                                    border: '3px solid white !important',
                                                },
                                                // change header font type
                                                '& .MuiPickersCalendarHeader-transitionContainer': {
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
                    <section className='w-1/2 p-2'>
                        <div className='flex justify-between gap-6 mb-6'>
                            <h2 className='text-[#EB5765] text-2xl'>Citas Pendientes</h2>
                            <a href="/spa/perfil"><svg width="24" height="24" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20.5" cy="20.5" r="19.5" fill="white" stroke="#EB5765" stroke-width="2" />
                                <line x1="20.9082" y1="10.0313" x2="20.9082" y2="31.8068" stroke="#EB5765" stroke-width="5" stroke-linecap="round" />
                                <line x1="9.19434" y1="20.0918" x2="30.9698" y2="20.0918" stroke="#EB5765" stroke-width="5" stroke-linecap="round" />
                            </svg>
                            </a>
                        </div>
                        <div className='grid gap-6'>
                            {citasMostrar.length !== 0 ? citasMostrar : <p>No hay citas pendientes</p>}
                        </div>
                    </section>
                </div>
            </main>
        </LayoutPrincipal >
    );
}

export default Agenda;