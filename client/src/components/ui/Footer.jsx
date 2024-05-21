import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import Soon from '../ui/Proximamente'
import { useState } from "react";
import '../../index.css';

function Foot() {

    const [soon, setSoon] = useState(false);

    const toggleSoon = () => {
        setSoon(!soon)
    };

    return (
        <>
            <footer className="selection:bg-[#EB5765]  selection:text-white font-[abeatbyKai] text-white bg-gradient-to-b from-[#036C65] to-black" id="contacto">
                {/* Top  */}
                <div className="mx-auto max-w-screen-xl  w-[80%]">
                    <div className="grid items-start grid-cols-1 gap-0 px-4 py-6 lg:py-8 md:grid-cols-3 md justify-items-center">
                        <div className="flex items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44" height="44" viewBox="0 0 250 250" className="h-10 p-1 overflow-visible bg-[#D9D9D9] rounded-full drop-shadow-md">
                                <g fill="#1976d2" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                                    <g transform="translate(0.00814,264.53442) rotate(-90) scale(8.53333,8.53333)">
                                        <path d="M12.111,21.225c0.238,-0.406 0.233,-0.905 -0.007,-1.309l-1.219,-2.046c-0.273,-0.458 -0.241,-1.03 0.087,-1.45c0.567,-0.726 1.521,-1.895 2.538,-2.912c1.017,-1.017 2.186,-1.971 2.912,-2.538c0.42,-0.328 0.992,-0.36 1.45,-0.087l2.046,1.219c0.404,0.241 0.907,0.243 1.313,0.005l5.129,-3.003c0.496,-0.291 0.74,-0.869 0.603,-1.428c-0.133,-0.543 -0.455,-1.248 -1.194,-1.987c-2.314,-2.314 -6.217,-3.543 -14.919,5.159c-8.702,8.702 -7.474,12.606 -5.16,14.92c0.741,0.741 1.447,1.062 1.991,1.195c0.558,0.135 1.132,-0.105 1.422,-0.6c0.723,-1.236 2.284,-3.902 3.008,-5.138z"></path>
                                    </g>
                                </g>
                            </svg>

                            <div className="grid gap-6 m-6">
                                <p className=" text-xl text-[#B2B2B2]">Llamanos</p>
                                <p className="w-[200px]">+52 (686) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center md:">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44" height="44" viewBox="0 0 48 48" className="h-10 p-1 overflow-visible bg-[#D9D9D9] rounded-full drop-shadow-md">
                                <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                            </svg>
                            <div className="m-6">
                                <p className=" text-xl grid gap-6 text-[#B2B2B2] mb-6">Correo</p>
                                <ul className="w-[200px]">
                                    <li><a href="">ayuda@grupoarmony.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44" height="44" viewBox="0 0 250 250" className="h-10 p-1 overflow-visible bg-[#D9D9D9] rounded-full drop-shadow-md">
                                <g fill="#fa5252" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                                    <g transform="scale(5.12,5.12)">
                                        <path d="M25,1c-8.82031,0 -16,7.17969 -16,16c0,14.11328 14.62891,30.94531 15.25,31.65625c0.19141,0.21875 0.46094,0.34375 0.75,0.34375c0.30859,-0.01953 0.55859,-0.125 0.75,-0.34375c0.62109,-0.72266 15.25,-17.84375 15.25,-31.65625c0,-8.82031 -7.17969,-16 -16,-16zM25,12c3.3125,0 6,2.6875 6,6c0,3.3125 -2.6875,6 -6,6c-3.3125,0 -6,-2.6875 -6,-6c0,-3.3125 2.6875,-6 6,-6z"></path>
                                    </g>
                                </g>
                            </svg>

                            <div className="m-6 ">
                                <p className=" text-xl grid gap-6 text-[#B2B2B2] mb-6">Visitanos</p>
                                <p className="w-[200px]">Calz. Francisco L. Montejano 2, Residencia, Mexicali, B.C.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="border-4  border-white w-[80%] aspect-[16/5] mb-20 m-auto">
                    <iframe
                        src="https://maps.google.com/maps?hl=es-419&amp;q=Calz.%20Francisco%20L.%20Montejano%202,%20Residencias,%2021280%20Mexicali,%20B.C.+(Armony)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" >
                    </iframe>
                </div>

                {/* Bottom */}
                <div className="mx-auto max-w-screen-xl w-[80%]">
                    <div className="grid grid-cols-2 gap-8 px-4 py-6 mb-8 lg:py-8 md:grid-cols-4 justify-items-center">
                        <div className="">
                            <h2 className="mb-6 text-sm font-semibold  uppercase text-[#B2B2B2]">Armony</h2>
                            <ul>
                                <li><a href="#nosotros"
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Nosotros</a></li>
                                <li><a href="#contacto"
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Contacto</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-[#B2B2B2] uppercase">Servicios</h2>
                            <ul>
                                <li><a href="/spa"
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Spa - Salon & Beaty</a></li>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Wellness - Hábitos saludables </a></li>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Colectivo - Regalos & More</a></li>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Cafetería - Cultura & Art</a></li>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Knowledge & Learning</a></li>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Emprendimiento & Fly</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-[#B2B2B2]">Productos</h2>
                            <ul>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Clinica</a></li>
                                <li><a href="/spa"
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Spa - Salon & Beaty</a></li>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Colectivo - Regalos & More</a></li>
                                <li><a onClick={toggleSoon}
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    Cafetería - Cultura & Art</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase text-[#B2B2B2]">Contactos</h2>
                            <ul>
                                <li><a href="mailto:ayuda@grupoarmony.com"
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    ayuda@grupoarmony.com</a></li>
                                <li><a href="tel:+526861234567"
                                    className="relative inline  cursor-pointer  before:bg-white  before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    +52 (686) 123-3567</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid">
                        <a href="#" className="rounded-full justify-self-center">
                            <FontAwesomeIcon icon={faCircleArrowUp} className="pb-8 text-6xl duration-300 cursor-pointer text-gray-500/50 justify-self-center hover:text-gray-200/75" />
                        </a>
                    </div>
                    <hr />
                    <div className="px-4 py-6 md:p-0 md:flex md:items-center md:justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center"><a href="https://flowbite.com/"></a>Copyright © 2024 Armony. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
                            <a href="https://www.facebook.com/people/Createch/61557314607066/" className="h-6">
                                <svg className="w-10" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                    <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/createch229/">
                                <svg className="w-10" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                    <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5"></stop><stop offset=".328" stopColor="#ff543f"></stop><stop offset=".348" stopColor="#fc5245"></stop><stop offset=".504" stopColor="#e64771"></stop><stop offset=".643" stopColor="#d53e91"></stop><stop offset=".761" stopColor="#cc39a4"></stop><stop offset=".841" stopColor="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"></stop><stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@createch34">
                                <svg className="w-10" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                    <path fill="#212121" fillRule="evenodd" d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z" clipRule="evenodd"></path><path fill="#ec407a" fillRule="evenodd" d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z" clipRule="evenodd"></path><path fill="#81d4fa" fillRule="evenodd" d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                {soon && (
                    <div className='soon-fondo'>
                        <div className='text-black soon-fx' onClick={toggleSoon}>
                            <Soon />
                        </div>
                    </div>
                )}
            </footer>
        </>
    );
}

export default Foot