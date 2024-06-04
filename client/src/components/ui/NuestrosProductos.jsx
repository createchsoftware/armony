import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import crema1 from '../../../public/pictures/crema1.png';
import crema2 from '../../../public/pictures/crema2.png';
import greenRight from '../../../public/pictures/greenRight.png'
import { ChevronRight } from 'lucide-react';
import Ofertas from '../../components/ui/Ofertas';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupLogin from "../ui/Login/PopupLogin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowProps } from 'react-multi-carousel/lib/types'
import { faDiamond, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Productos() {
    // const [log, setLog] = useState(false);
    // const [login, setLogin] = useState(false);

    // let respuestaJson = null;
    // async function checkLogin() {
    //     try {
    //         const respuesta = await fetch("/api/logueado", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         respuestaJson = await respuesta.json();

    //         if (respuestaJson.logueado == true) {
    //             setLog(true);
    //         } else {
    //             setLog(false);
    //         }
    //     } catch (error) {
    //         setLog(false);
    //     }
    // }

    // const toggleLoginPopup = () => {
    //     setLogin(!login);
    // };

    // const handleClickCarrito = () => {
    //     if (log) {
    //         return true;
    //     } else {
    //         toggleLoginPopup();
    //         return false;
    //     }
    // };


    // useEffect(() => {
    //     checkLogin();
    // }, []);


    const [descuentos, setDescuentos] = useState([]);
    const [id, setId] = useState(0);

    async function getId() {
        let respuestaJson = null;
        try {
            const respuesta = await fetch("/api/logueado", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            respuestaJson = await respuesta.json();
            console.log("id en uso: ", respuestaJson.clave);
            await setId(respuestaJson.clave);
        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(() => {
        getId();
    }, []);


    // const toggleSoon = () => {
    //     setSoon(!soon)
    // };

    //useEffect para obtener los productos con descuento
    useEffect(() => {
        setTimeout(() => {
            fetch(`/api/admin/productos/descuento/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los descuentos");
                    }
                    return response.json();
                })
                .then((data) => {
                    setDescuentos(data.data);
                    console.log("descuentos", data.data);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }, [1000])
    }, [id]);


    return (
        <>
            <img src={greenRight} alt="" className='absolute w-[12%] right-0 translate-y-[-6rem]' />
            <h1 className='text-5xl  w-[80%] md:text-6xl mx-auto font  text-[#036C65] my-12 text-center items-center  font-[iloveglitter] mt-24'>Nuestros productos</h1>
            <section className=' w-[80%] bg-white m-auto rounded-xl border-8 border-[#E2B3B7] py-6 relative'>
                <hr />
                <div className='mx-auto p-6 md:mx-28 md:p-0 selection:bg-[#EB5765] selection:text-white relative'>
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlay
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className="z-0"
                        containerclassName="container-with-dots z-0 overflow-visible"
                        dotListclassName=""

                        // draggable
                        focusOnSelect={false}
                        itemclassName="z-0"
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        infinite
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 4000,
                                    min: 1024
                                },
                                items: 4,
                                partialVisibilityGutter: 4
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
                        itemClass='z-0'
                        containerClass='z-0'
                        sliderClass='z-10'
                        customLeftArrow={<FontAwesomeIcon
                            icon={faAngleLeft}
                            size="lg"
                            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 -left-0 text-3xl text-primary-900 aspect-square bg-[#e6e6e6] rounded-full text-[#036C65] p-3 hover:opacity-90 overflow-visible z-10"
                        />}
                        customRightArrow={<FontAwesomeIcon
                            size="lg"
                            icon={faAngleRight}
                            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 -right-0 text-3xl text-primary-900 bg-[#e6e6e6] rounded-full aspect-square text-[#036C65] p-3 hover:opacity-90 overflow-visible z-10"
                        />}
                    // className=''
                    >
                        {descuentos.map(oferta => (
                            <Ofertas key={oferta.id} noDesc={true} producto={oferta} />
                            // <Ofertas key={oferta.id} producto={oferta} handleClickCarrito={handleClickCarrito} />
                        ))}

                    </Carousel>
                </div>
            </section>
            <div className='w-[80%] m-auto flex justify-between mb-24'>
                <a href='/spa/productos' className='m-auto'>
                    <button className="mt-12 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"><span>Ir a la tienda</span><div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></button>
                </a>
            </div>
            <ToastContainer position={'bottom-right'} theme={'light'} />
            {/* {login && <PopupLogin cerrar={toggleLoginPopup} />} */}
        </>
    );
}

export default Productos;