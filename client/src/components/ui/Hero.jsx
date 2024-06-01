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
        </>
    )
}
export default Hero;