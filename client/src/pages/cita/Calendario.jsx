import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import CarruselServicios from '../../components/ui/CarruselServicios';
import 'react-multi-carousel/lib/styles.css';
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import CitasPendientes from '../../components/ui/CitasPendientes';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { ChevronRight } from 'lucide-react';
import Especialista from '../../components/ui/Especialista';
import es from 'dayjs/locale/es';
import HorasDisponibles from '../../components/ui/HorasDisponibles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../cita/EstiloCalendario.css';
import Paper from '@mui/material/Paper';

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

function Calendario() {
    const [especialistas, setEspecialistas] = React.useState([]);
    const [selectedHourIndex, setSelectedHourIndex] = useState(null);
    const requestAbortController = React.useRef(null);
    const [checked, setChecked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

    const handleHourClick = (index) => {
        setSelectedHourIndex(index);
    };

    const handleCheckBox = (event) => {
        setChecked(event.target.checked);
    };

    const getButtonClass = (index) => {
        let baseClass = 'border-2 hover:bg-[#EB5765] hover:text-white border-[#EB5765] py-2 px-4';
        if (index === selectedHourIndex) {
            baseClass += ' bg-[#EB5765] text-white'; // Añade clases para el botón seleccionado
        }
        return baseClass;
    };


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

    //const[value,onChange]=useState(new Date())
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

    // const horasDisponibles = [
    //     '8:00 am',
    //     '9:00 am',
    //     '10:00 am',
    //     '11:00 am',
    //     '12:00 pm',
    //     '1:00 pm',
    // ];
    const handleClick = (hora, index) => {
        horaDis(hora)
        handleHourClick(index)
    }
    const [seleccionado, setSeleccionado] = useState(false);
    const horaDis = (hora) => {
        if (!seleccionado) {
            setSeleccionado(true);
            localStorage.setItem('hora', hora);
        } else {
            alert('ya escogiste una hora')
        }
    }
    const [selectedDate, setSelectedDate] = useState(initialValue);
    const [horasDisponibles, setHorasDisponibles] = useState([]);

    //metodo para obtener horas disponibles de un empleado
    //este metodo se llamara cada vez que el estado de id empleado o el estado de fecha cambie



    const horasDisp = async () => {
        const especialista = localStorage.getItem('Especialista');
        const fecha = localStorage.getItem('Fecha seleccionada');
        if (especialista && fecha) {
            try {
                const response = await fetch(`/api/admin/citas/disponibles/1/${especialista}/${fecha}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setHorasDisponibles(data);
                setIsLoad(false);
            } catch (error) {
                console.error('Error de red o servidor:', error.message);
            }
        }
    };





    // example array of 13 hours available
    // const horasDisp = () => {
    //     setHorasDisponibles([
    //         '8:00 am',
    //         '9:00 am',
    //         '10:00 am',
    //         '11:00 am',
    //         '12:00 pm',
    //         '1:00 pm',
    //         '2:00 pm',
    //         '3:00 pm',
    //         '4:00 pm',
    //         '5:00 pm',
    //         '6:00 pm',
    //         '7:00 pm',
    //         '8:00 pm',
    //     ])
    // }

    const [isLoad, setIsLoad] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {

    //             const response = await fetch("/api/admin/productos/get")

    //             const data = await response.json();
    //            // setEspecialistas(data)
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/empleado/getEmpServicio/1");
                const data = await response.json();
                setEspecialistas(data);
                setIsLoad(false);
            } catch (error) {
                console.log('error', error);
                setIsLoad(false);
            }
        };
        fetchData();
    }, []);
    //console.log(especialistas);

    // const especialistas = [
    //     {
    //         id: 1,
    //         nombre: 'Dra. Ana Martínez',
    //         especialidad: 'Dermatólogo',
    //         imagen: '/pictures/empleadaFoto1.png',
    //         experiencia: '10 años',
    //         areas: ['Dermatología', 'Cirugía', 'Estética'],
    //         calificacion: 5
    //     },
    //     {
    //         id: 2,
    //         nombre: 'Dra. María López',
    //         especialidad: 'Nutricionista',
    //         imagen: '/pictures/empleadaFoto2.png',
    //         experiencia: '5 años',
    //         areas: ['Nutrición', 'Dietas', 'Salud'],
    //         calificacion: 4
    //     },
    //     {
    //         id: 3,
    //         nombre: 'Dra. Claudia Pérez',
    //         especialidad: 'Pediatra',
    //         imagen: '/pictures/empleadaFoto3.png',
    //         experiencia: '15 años',
    //         areas: ['Pediatría', 'Cuidados', 'Salud'],
    //         calificacion: 5
    //     },
    //     {
    //         id: 4,
    //         nombre: 'Dra. Liliana Ponce',
    //         especialidad: 'Ginecóloga',
    //         imagen: '/pictures/empleadaFoto4.png',
    //         experiencia: '8 años',
    //         areas: ['Ginecología', 'Salud', 'Cuidados'],
    //         calificacion: 4
    //     }]

    useEffect(() => {
        const handleLocalStorageChange = (event) => {
            if (event.key === 'Especialista' || event.key === 'Fecha seleccionada') {
                horasDisp();
            }
        };
        window.addEventListener('storage', handleLocalStorageChange);
        return () => {
            window.removeEventListener('storage', handleLocalStorageChange);
        };
    }, []);


    useEffect(() => {
        horasDisp();
    }, [selectedDate]);

    useEffect(() => {
        if (localStorage.getItem('Especialista') && localStorage.getItem('Fecha seleccionada')) {
            horasDisp();
        }
    }, [localStorage.getItem('Especialista')]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        localStorage.setItem('Fecha seleccionada', newDate.format("YYYY-MM-DD"));
    };

    return (
        <>
            <h1 className='flex justify-center justify-self-center text-2xl px-8 w-1/4  m-auto border-b-2 border-b-[#ec5766] font-bold'>
                Agenda tu cita
            </h1>
            <main className='flex  gap-0  w-[90%]'>
                <section className='grid w-2/3 p-6 '>
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
                                minDate={dayjs().add(0, 'day')}
                                maxDate={dayjs().add(1, 'year')}
                                disablePast
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

                    {/* <Calendar /> */}


                    <div className=''>
                        <h1 className='text-xl text-[#036C65] mb-4'>Horas Disponibles:</h1>
                        <div className='flex overflow-x-auto text-[#EB5765] gap-2'>
                            {horasDisponibles && horasDisponibles.map((hora, index) => (
                                <button key={index} onClick={() => handleClick(hora, index)} className={getButtonClass(index)}>{hora}</button>
                            ))}
                        </div>

                    </div>

                </section>
                <section className='w-1/3 '>
                    <h1 className='text-xl  text-[#036C65] text-center'>Selecciona tu especialista</h1>
                    {isLoad ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <div className='flex justify-center gap-4 m-4'>
                                <button className='px-4 py-1 text-white rounded-xl bg-rose-400'>General</button>
                                <button className='flex items-center justify-center gap-2 px-4 text-white rounded-xl bg-rose-400'>Favoritos
                                    <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                    </svg>
                                </button>
                            </div>

                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlay

                                className={(checked ? 'opacity-30' : '') + ' m-auto' + ' z-0'}
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
                                showDots={false}
                                sliderclassName=""
                                slidesToSlide={1}
                                swipeable
                            >
                                {especialistas.length > 0 ? (especialistas.map((especialista) => (
                                    <Especialista key={especialista.id} especialista={especialista} />
                                ))) : (<div></div>)}
                            </Carousel>
                            {/* <CarruselServicios servicios={especialistas} itemsDesktop={1} itemsMobile={1} itemsTablet={1}/>
                                         */}
                            <div class="mt-2 flex gap-2 justify-center">
                                <div class="flex items-center">
                                    <input id="default-checkbox" type="checkbox" onChange={handleCheckBox} value="" class="w-5 h-5 text-rose-400 bg-gray-100 border-gray-300 rounded focus:ring-rose-400  focus:ring-2" />
                                    <label for="default-checkbox" class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Indiferente</label>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main >
        </>
    );
}

export default Calendario;

