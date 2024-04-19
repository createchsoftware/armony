import '../../index2.css';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
    return (
        <>
            {/* VIDEO DE LOS PILARES */}
            <div className="carrusel" id="inicio">
                <div className="cont-carrusel" id="car-video">
                    <section className="videos">
                        <h1 className="title">Spa</h1>
                        <h2 className="title2">Salon & Beauty</h2>
                        <p className="desc">Relájate y déjate llevar por la serenidad mientras nuestros expertos cuidan de tú bienestar en nuestro spa exclusivo.</p>
                        <a href="#info" className="show">Ver más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/3Spa.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <div className="deg1"></div>
                    <div className="deg"></div>
                </div>


            </div>
            {/*<div className="carrusel" id="inicio">
                <div className="cont-carrusel" id="car-video">
                    <section className="videos">
                        <h1 className="title">Cafetería</h1>
                        <h2 className="title2">Cultura &amp; Art</h2>
                        <p className="desc">
                            Tu lugar de encuentro, donde el buen café y las sonrisas se mezclan.
                        </p>
                        <video autoPlay="" loop="" className="slider-video">
                            <source src="../../../picturesos/1Cafeteria.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title">Wellness</h1>
                        <h2 className="title2">Hábitos saludables</h2>
                        <p className="desc">
                            La salud es un hábito tan importante como ser feliz. Únete a nuestra
                            comunidad y deja que nuestros expertos de guíen al bienestar.
                        </p>
                        <video autoPlay="" loop="" className="slider-video">
                            <source src="../../../picturesos/2Wellness.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title">Spa</h1>
                        <h2 className="title2">Salon &amp; Beauty</h2>
                        <p className="desc">
                            Relájate y déjate llevar por la serenidad mientras nuestros expertos
                            cuidan de tú bienestar en nuestro spa exclusivo.
                        </p>
                        <video autoPlay="" loop="" className="slider-video">
                            <source src="../../../picturesos/3Spa.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title" id="title4">
                            School
                        </h1>
                        <h2 className="title2">Knowlegde &amp; Learning</h2>
                        <p className="desc">
                            No encontrarás mejor lugar de relajación y concentración que en
                            nuestra biblioteca donde la calma es prioridad.
                        </p>
                        <video autoPlay="" loop="" className="slider-video">
                            <source src="../../../picturesos/4School.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title" />
                        <h2 className="title2">Emprendimiento &amp; Fly</h2>
                        <p className="desc">
                            Se bienvenida al departamento de emprendimiento, donde tus ideas van
                            más allá que sólo alcanzar el éxito.
                        </p>
                        <video autoPlay="" loop="" className="slider-video">
                            <source src="../../../picturesos/5Emprendimiento.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title">Colectivo</h1>
                        <h2 className="title2">Regalos &amp; More</h2>
                        <p className="desc">
                            Un regalo para una sonrisa que nos llena de alegría todos los días.
                            Ven y encuentra tú favorito.
                        </p>
                        <video autoPlay="" loop="" className="slider-video">
                            <source src="../../../picturesos/6Colectivo.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title" />
                        <h2 className="title2">Clínica</h2>
                        <p className="desc">
                            En nuestra clínica, tu salud en nuestra misión principal. Tú
                            bienestar, nuestra prioridad.
                        </p>
                        <video autoPlay="" loop="" className="slider-video">
                            <source src="../../../picturesos/7Clínica.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <div className="deg1" />
                    <div className="deg" />
                </div>
                <a href="#" className="show">
                    Mostrar más...
                </a>
                <ul className="slide-sec">
                    <li className="selec active" attr={0} onclick="cambio(this)">
                        <i className="fa-solid fa-diamond" />
                    </li>
                    <li className="selec" attr={1} onclick="cambio(this)">
                        <i className="fa-solid fa-diamond" />
                    </li>
                    <li className="selec" attr={2} onclick="cambio(this)">
                        <i className="fa-solid fa-diamond" />
                    </li>
                    <li className="selec" attr={3} onclick="cambio(this)">
                        <i className="fa-solid fa-diamond" />
                    </li>
                    <li className="selec" attr={4} onclick="cambio(this)">
                        <i className="fa-solid fa-diamond" />
                    </li>
                    <li className="selec" attr={5} onclick="cambio(this)">
                        <i className="fa-solid fa-diamond" />
                    </li>
                    <li className="selec" attr={6} onclick="cambio(this)">
                        <i className="fa-solid fa-diamond" />
                    </li>
                </ul>
            </div>*/}

        </>
    );
};

export default Hero;



// import { Fragment, useState } from 'react'
// import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

// function Hero({ url, title, subtitle, description }) {
//     return (
//         <>
//             <section className='selection:bg-[#EB5765]'>
//                 {/* <video className=' w-[100%] h-[100%]' autoPlay src={url}></video> */}
//                 <Carousel showArrows={true} onChange={null} onClickItem={null} onClickThumb={null}>
//                     <div className=''>
//                         <video autoPlayplaysinline autoplay muted loop src={""} className='w-[100%]'></video>
//                         <div className='absolute top-40 w-[100%] bg-black/50 grid'>
//                             <h1 className='text-white w-[100%] m-auto  font-[iloveglitter] text-8xl text-center '>{title}</h1>
//                             <h2 className=' text-white p-0 w-[100%] m-auto font-[iloveglitter] text-9xl text-center '>{subtitle}</h2>
//                             <h2 className=' text-white w-[100%] m-auto  font-[abeatbykai] text-2xl mt-6  text-center' >{description}</h2>
//                             {/* <button class=" font-[abeatbykai] w-40 leading-none mt-16 m-auto h-10 overflow-hidden rounded-lg border-2 bg-transparent px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1"><span class="relative">Mostrar más...</span></button> */}

//                             <button class="mt-16 transition-all duration-300 w-48 m-auto hover:bg-[#EB5765] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-transparent px-6 font-[abeatbykai] text-neutral-200"><span>Mostrar más...</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
//                         </div>
//                         {/* <p className="legend">Pilar 1</p> */}
//                     </div>
//                     <div className=''>
//                         <video autoPlayplaysinline autoplay muted loop src={""} className='w-[100%]'></video>
//                         <div className='absolute top-40 w-[100%] bg-black/50 grid'>
//                             <h1 className='text-white w-[100%] m-auto  font-[iloveglitter] text-8xl text-center '>{title}</h1>
//                             <h2 className=' text-white p-0 w-[100%] m-auto font-[iloveglitter] text-9xl text-center '>{subtitle}</h2>
//                             <h2 className=' text-white w-[100%] m-auto  font-[abeatbykai] text-2xl mt-6  text-center' >{description}</h2>
//                             <button class=" font-[abeatbykai] w-40 leading-none mt-16 m-auto h-10 overflow-hidden rounded-lg border-2 bg-transparent px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"><span class="relative">Mostrar más...</span></button>
//                         </div>
//                         {/* <p className="legend">Pilar 1</p> */}
//                     </div>

//                 </Carousel >
//                 {/* <div className='grid'>
//                     <h1 className='text-white absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-270%]  font-[iloveglitter] text-[128px]font-[iloveglitter] text-[96px] text-center '>{title}</h1>
//                     <h2 className=' text-white absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-160%]  font-[iloveglitter] text-[128px]  text-center w-[100%] '>{subtitle}</h2>
//                     <h2 className=' text-white absolute top-[50%] left-[50%] w-[80%] font-[abeatbykai] text-[27px] text-center ' >{description}</h2>
//                     <h2 className=' text-white absolute top-[50%] left-[50%]   w-[10%] font-[abeatbykai] text-[27px] bg-black text-center '>XDDD</h2>
//                 </div> */}

//             </section >
//         </>
//     )
// }

// export default Hero
