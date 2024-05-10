import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import crema1 from '../../../public/pictures/crema1.png';
import crema2 from '../../../public/pictures/crema2.png';
import greenRight from '../../../public/pictures/greenRight.png'
import { ChevronRight } from 'lucide-react';
import Ofertas from '../../components/ui/Ofertas';

const ofertas = [
    {
        id: 1,
        nombre: 'Esponjabon',
        precio: 10,
        descripcion: 'Esponjabon floor para baño, formul...',
        imagen: '../../pictures/oferta1.png'
    },
    {
        id: 2,
        nombre: 'Body butter',
        precio: 20,
        descripcion: 'Crema corporal, artesanal, 239 ml.',
        imagen: '../../pictures/oferta2.png'
    },
    {
        id: 3,
        nombre: 'Tónito facial',
        precio: 15,
        descripcion: 'Tónito facial dermatológico...',
        imagen: '../../pictures/oferta3.png'
    },
    {
        id: 4,
        nombre: 'Mascarilla',
        precio: 25,
        descripcion: 'Combina el poder de la arcilla verde...',
        imagen: '../../pictures/oferta4.png'
    },
]

function Productos() {
    return (
        <>
            <img src={greenRight} alt="" className='absolute w-[12%] right-0 translate-y-[-6rem] ' />
            <h1 className='text-5xl  w-[80%] md:text-6xl mx-auto font  text-[#036C65] my-12 text-center items-center  font-[iloveglitter] mt-24'>Nuestros productos</h1>
            <section className=' w-[80%] bg-white m-auto rounded-xl border-8 border-[#E2B3B7] py-6'>
                <hr />
                <div className='mx-auto p-6 md:mx-28 md:p-0 selection:bg-[#EB5765] selection:text-white'>
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlay
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className="z-0"
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
                    // className=''
                    >
                        {ofertas.map(oferta => (
                            <Ofertas key={oferta.id} producto={oferta} />
                        ))}

                    </Carousel>
                </div>
            </section>
            <div className='w-[80%] m-auto flex justify-between mb-24'>
                <button class="mt-12 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"><span>Ir a la tienda</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>            </div>
        </>
    );
}

export default Productos;