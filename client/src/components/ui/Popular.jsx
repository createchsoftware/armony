import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronRight } from 'lucide-react';
import pilar1 from '../../../public/pictures/pilar1.png'
import pilar2 from '../../../public/pictures/pilar2.png'
import pilar3 from '../../../public/pictures/pilar3.png'
import pilar4 from '../../../public/pictures/pilar4.png'
import { useState } from 'react';
import Soon from './Proximamente';

function Popular() {
    const [soon, setSoon] = useState(false);

    const toggleSoon = () => {
        setSoon(!soon)
    };
    return (

        <div className='mx-auto p-6 md:mx-28 md:p-0 selection:bg-[#EB5765] selection:text-white'>
            <h1 className='text-6xl mx-14 font  text-[#036C65] mt-12 font-[iloveglitter] '>Lo mas popular</h1>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                className='z-0'
                autoPlaySpeed={3000}
                centerMode={false}
                containerclassName="container-with-dots z-0"
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
                        items: 4,
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
            >
                <div className='grid h-full m-4 p-8 font-[abeatbyKai]'>
                    <a href="/spa"><img className='rounded-2xl w-72 h-96' src={pilar1} alt="" /></a>
                    <div className='flex flex-col justify-between h-full'>
                        <h6 className='pt-4 text-lg font-bold text-center'>SPA - Masaje facial</h6>
                        <p className='pt-2 text-center'>Encuentra la calma en un masaje facial que renueve tu piel y brinda un momento de paz</p>
                        <div className='flex justify-center mt-4'>
                            <a href="/spa"
                                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                Ver más<ChevronRight color="#036c65" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='grid h-full m-4 p-8 font-[abeatbyKai]'>
                    <img className='rounded-2xl w-72 h-96' src={pilar2} alt="" />
                    <div className='flex flex-col justify-between h-full'>
                        <h6 className='pt-4 text-lg font-bold text-center'>Cafeteria</h6>
                        <p className='pt-2 text-center'>Disfruta de cafe y snacks en nuestra cafeteria. ¡Momentos de cafe garantizados!</p>
                        <div className='flex justify-center mt-4'>
                            <a onClick={toggleSoon}
                                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                Ver más<ChevronRight color="#036c65" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='grid h-full m-4 p-8 font-[abeatbyKai]'>
                    <img className='rounded-2xl w-72 h-96' src={pilar3} alt="" />
                    <div className='flex flex-col justify-between h-full'>
                        <h6 className='pt-4 text-lg font-bold text-center'>Wellness</h6>
                        <p className='pt-2 text-center'>En Wellness, cada elección es un voto a favor de tu bienestar fisíco, mental y emocional.</p>
                        <div className='flex justify-center mt-4'>
                            <a onClick={toggleSoon}
                                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                Ver más<ChevronRight color="#036c65" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='grid h-full m-4 p-8 font-[abeatbyKai]' >
                    <img className='rounded-2xl w-72 h-96' src={pilar4} alt="" />
                    <div className='flex flex-col justify-between h-full'>
                        <h6 className='pt-4 text-lg font-bold text-center'>Colectivo</h6>
                        <p className='pt-2 text-center'>Cada regalo unico expresa tu amor y crea momentos inolvidables</p>
                        <div className='flex justify-center mt-4'>
                            <a onClick={toggleSoon}
                                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                Ver más<ChevronRight color="#036c65" />
                            </a>
                        </div>
                    </div>
                </div>
            </Carousel>
            {soon && (
                <div className='soon-fondo'>
                    <div className='text-black soon-fx' onClick={toggleSoon}>
                        <Soon />
                    </div>
                </div>
            )}
        </div>

    );
}

export default Popular;