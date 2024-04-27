import { useState } from 'react';
import '../../index.css';
import Soon from '../ui/Proximamente'
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Start = () => {

    const [soon, setSoon] = useState(false);

    const toggleSoon = () => {
        setSoon(!soon)
    };

    return (
        <>
            <Helmet>
                <script src="../../scripts/index.js"></script>
            </Helmet>
            {/* VIDEO DE LOS PILARES */}
            <div className="carrusel" id="inicio">
                <div className="cont-carrusel" id="car-video">
                    <section className="videos">
                        <h1 className="my-6 title md:my-0">Spa</h1>
                        <h2 className="mb-12 title2 md:mb-0">Salon & Beauty</h2>
                        <p className="desc">Relájate y déjate llevar por la serenidad mientras nuestros expertos cuidan de tú bienestar en nuestro spa exclusivo.</p>
                        <a href="/spa" className="show">Mostrar más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/3Spa.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title">Cafetería</h1>
                        <h2 className="title2">Cultura & Art</h2>
                        <p className="desc">Tu lugar de encuentro, donde el buen café y las sonrisas se mezclan.</p>
                        <a href="#" className="show" onClick={toggleSoon}>Mostrar más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/1Cafeteria.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="my-48 title md:my-0">Wellness</h1>
                        <h2 className="mb-24 title2 md:mb-0">Hábitos saludables</h2>
                        <p className="desc">La salud es un hábito tan importante como ser feliz. Únete a nuestra comunidad y deja que nuestros expertos de guíen al bienestar.</p>
                        <a href="#" className="show" onClick={toggleSoon}>Mostrar más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/2Wellness.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="my-24 title md:my-0" id="title4">School</h1>
                        <h2 className="mb-12 title2 md:mb-0">Knowledge & Learning</h2>
                        <p className="desc">No encontrarás mejor lugar de relajación y concentración que en nuestra biblioteca donde la calma es prioridad.</p>
                        <a href="#" className="show" onClick={toggleSoon}>Mostrar más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/4School.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title"></h1>
                        <h2 className="mb-6 title2">Emprendimiento & Fly</h2>
                        <p className="desc">Se bienvenida al departamento de emprendimiento, donde tus ideas van más allá que sólo alcanzar el éxito.</p>
                        <a href="#" className="show" onClick={toggleSoon}>Mostrar más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/5Emprendimiento.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="my-4 title md:my-4">Colectivo</h1>
                        <h2 className="mb-6 title2">Regalos & More</h2>
                        <p className="desc">Un regalo para una sonrisa que nos llena de alegría todos los días. Ven y encuentra tú favorito.</p>
                        <a href="#" className="show" onClick={toggleSoon}>Mostrar más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/6Colectivo.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className="videos">
                        <h1 className="title"></h1>
                        <h2 className="title2">Clínica</h2>
                        <p className="desc">En nuestra clínica, tu salud en nuestra misión principal. Tú bienestar, nuestra prioridad.</p>
                        <a href="#" className="show" onClick={toggleSoon}>Mostrar más...</a>
                        <video autoPlay loop className="slider-video" muted>
                            <source src="../../../videos/7Clínica.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <div className="deg1"></div>
                    <div className="deg"></div>
                </div>

                <ul className="slide-sec">
                    <li className="selec active" >
                        <FontAwesomeIcon icon={faDiamond} rel="0" /></li>
                    <li className="selec">
                        <FontAwesomeIcon icon={faDiamond} rel="1" />
                    </li>
                    <li className="selec">
                        <FontAwesomeIcon icon={faDiamond} rel="2" /></li>
                    <li className="selec">
                        <FontAwesomeIcon icon={faDiamond} rel="3" /></li>
                    <li className="selec">
                        <FontAwesomeIcon icon={faDiamond} rel="4" /></li>
                    <li className="selec">
                        <FontAwesomeIcon icon={faDiamond} rel="5" /></li>
                    <li className="selec">
                        <FontAwesomeIcon icon={faDiamond} rel="6" /></li>
                </ul>
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
            {/* ¿Quiénes somos? */}
            <div className="somos" id="nosotros">
                <img src="../../../pictures/logoArmony.png" alt="" id="logo1" />
                <h1 id="titulo">realza tu belleza interior.</h1>
                <div className="somos-div">
                    <section className="somos-arm">
                        <h3 id="somos-text">
                            Nos especializamos en brindarte servicios y productos que resalten tu
                            belleza interior.
                        </h3>
                        <h3 id="somos-desc">
                            En armony nos dedicamos a ofrecer una experiencia integral de
                            bienestar y belleza, que incluye servicios de spa, tratamientos de
                            belleza, atención clínica, oportunidades de emprendimiento y una
                            tienda colectiva de regalos. Nuestro compromiso es proporcionar un
                            enfoque integral para el cuidado personal, la relajación y el
                            desarrollo personal. Te invitamos a descubrir todo lo que armony tiene
                            para ofrecer, y a sumergirte en un mundo de serenidad, belleza y
                            crecimiento personal. ¡Bienvenida a armony, donde la armonía es
                            nuestra filosofía de vida!
                        </h3>
                    </section>
                    <section className="somos-fotos">
                        <img src="../../../pictures/somosArmony.png" alt="" id="fondo" />
                    </section>
                </div>
            </div>
            {/* CARRUSEL PILARES */}
            <div className="pilares" id="servicios">
                <img src="../../../pictures/decoArmony1.png" alt="" id="deco1" />
                <img src="../../../pictures/decoArmony.png" alt="" id="deco2" />
                <h1 id="pilares-title">Pilares de armony</h1>
                <div className="pilares-cont">
                    <div id="next1">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                    <div id="prev1">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div id="pilares-visibles">
                        <div className="pilar no1" rel={0}>
                            <a href="#servicios" className="pilar-btn" onClick={toggleSoon}>
                                <h3 className="pilar-text">Cafetería Cultura &amp; Art</h3>
                                <img src="../../../pictures/1cafeteria.jpg" alt="" className="pilar-photo"/>
                                <div className="deg2" />
                            </a>
                        </div>
                        <div className="pilar no2" rel={1}>
                            <a href="#servicios" className="pilar-btn" onClick={toggleSoon}>
                                <h3 className="pilar-text">Wellness Hábitos saludables</h3>
                                <img src="../../../pictures/2wellness.jpg" alt="" className="pilar-photo"/>
                                <div className="deg2" />
                            </a>
                        </div>
                        <div className="pilar no7 no3" rel={2}>
                            <a href="/spa" className="pilar-btn">
                                <h3 className="pilar-text">Spa<br/>Salon &amp; Beauty</h3>
                                <img src="../../../pictures/7spa.jpg" alt="" className="pilar-photo" />
                                <div className="deg2" />
                            </a>
                        </div>
                        <div className="pilar no4" rel={3}>
                            <a href="#servicios" className="pilar-btn" onClick={toggleSoon}>
                                <h3 className="pilar-text">Colectivo Regalos &amp; More</h3>
                                <img src="../../../pictures/3colectivo.jpg" alt="" className="pilar-photo" />
                                <div className="deg2" />
                            </a>
                        </div>
                        <div className="pilar no5" rel={4}>
                            <a href="#servicios" className="pilar-btn" onClick={toggleSoon}>
                                <h3 className="pilar-text">Emprendimiento &amp; Fly</h3>
                                <img src="../../../pictures/4fly.jpg" alt="" className="pilar-photo" />
                                <div className="deg2" />
                            </a>
                        </div>
                        <div className="pilar no6" rel={5}>
                            <a href="#servicios" className="pilar-btn" onClick={toggleSoon}>
                                <h3 className="pilar-text">School Knowlegde &amp; Learning</h3>
                                <img src="../../../pictures/5school.png" alt="" className="pilar-photo" />
                                <div className="deg2" />
                            </a>
                        </div>
                        <div className="pilar no7" rel={6}>
                            <a href="#servicios" className="pilar-btn" onClick={toggleSoon}>
                                <h3 className="pilar-text">Clínica</h3>
                                <img src="../../../pictures/6clinica.jpg" alt=""  className="pilar-photo"/>
                                <div className="deg2" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {soon && (
                <div className='soon-fondo'>
                    <div className='soon-fx' onClick={toggleSoon}>
                        <Soon />
                    </div>
                </div>
            )}

        </>
    );
};

export default Start;