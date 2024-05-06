import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import crema1 from '../../../public/pictures/crema1.png';
import crema2 from '../../../public/pictures/crema2.png';
import greenRight from '../../../public/pictures/greenRight.png'
import { ChevronRight } from 'lucide-react';


function Productos() {
    return (
        <>
            <img src={greenRight} alt="" className='absolute w-[12%] right-0 translate-y-[-6rem] ' />
            <div className='selection:bg-[#EB5765]  selection:text-white mt-20 md:w-[80%] md:m-auto'>
                <h1 className='text-5xl  w-[80%] md:text-6xl mx-auto font  text-[#036C65] my-12 text-center items-center  font-[iloveglitter] mt-24'>Nuestros productoss</h1>
                <div className='w-[80%] gap-8 mx-auto mb-0 grid md:grid-cols-3'>
                    <div className=''>
                        <div className="w-[80vw] md:w-[20vw] border-2 text-[#036C65] bg-[#FFB5A8] text-xl text-center rounded-2xl p-2"><h6>Cuidado personal</h6></div>
                        <Carousel
                            additionalTransfrom={0}
                            arrows
                            autoPlay
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className="m-4 p-0 w-[70vw] md:w-[100%] z-0"
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
                            //className=''
                        >

                            <div className='m-4 font-[abeatbyKai] '>
                                <img className='aspect-square rounded-2xl ' src={crema1} alt="" />
                                <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas faciales 1</h6>
                            </div>
                            <div className='m-4  font-[abeatbyKai]' >
                                <img className='aspect-square rounded-2xl' src={crema1} alt="" />
                                <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas faciales 2</h6>
                            </div>
                        </Carousel>
                        <button className='my-4 mx-auto hover:bg-[#eb3846] text-center grid place-content-center content-center rounded-full h-20 w-20 text-white bg-[#EB5765]'>Ver todo
                            <svg className='m-auto ' xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="14" height="14" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                        </button>
                    </div>
                    <div>
                        <div className="w-[80vw] md:w-[20vw]  border-2 text-[#EB5765] bg-[#5FCDB4] text-xl rounded-2xl text-center p-2">Productos de spa</div>
                        <Carousel
                            additionalTransfrom={0}
                            arrows
                            autoPlay
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className="m-4 p-0 w-[70vw] md:w-[100%] z-0"
                            containerclassName="container-with-dots"
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
                            //className=''
                        >

                            <div className='m-4 font-[abeatbyKai] '>
                                <img className='aspect-square rounded-2xl ' src={crema2} alt="" />
                                <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas corporales 1</h6>
                            </div>
                            <div className='m-4 font-[abeatbyKai]' >
                                <img className='aspect-square rounded-2xl' src={crema2} alt="" />
                                <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas corporales 2</h6>

                            </div>
                        </Carousel>
                        <button className='my-4 mx-auto hover:bg-[#034d46] text-center grid place-content-center content-center rounded-full h-20 w-20 text-white bg-[#036C65]'>Ver todo
                            <svg className='m-auto ' xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="14" height="14" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                        </button>
                    </div>
                    <div>
                        <div className="w-[80vw] md:w-[20vw]  border-2 text-[#036C65] bg-[#FFB5A8] text-xl rounded-2xl text-center p-2">Perfumes</div>
                        <Carousel
                            additionalTransfrom={0}
                            arrows
                            autoPlay
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className="m-4 p-0 w-[70vw] md:w-[100%] z-0"
                            containerclassName="container-with-dots"
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
                            //className=''
                        >

                            <div className='m-4 font-[abeatbyKai]'>
                                <img className='aspect-square rounded-2xl ' src={crema1} alt="" />
                                <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Perfume 1</h6>
                            </div>
                            <div className='m-4 font-[abeatbyKai]' >
                                <img className='aspect-square rounded-2xl' src={crema1} alt="" />
                                <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Perfume 2</h6>
                            </div>
                        </Carousel>
                        <button className='my-4 mx-auto hover:bg-[#eb3846] text-center grid place-content-center content-center rounded-full h-20 w-20 text-white bg-[#EB5765]'>Ver todo
                            <svg className='m-auto ' xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="14" height="14" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Productos;

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import crema1 from '../../../public/pictures/crema1.png';
// import crema2 from '../../../public/pictures/crema2.png';
// import { ChevronRight } from 'lucide-react';


// function Productos() {
//     return (
//         <div className=''>
//             <div className='grid grid-cols-3 selection:bg-[#EB5765] selection:text-white  place-content-between w-[62%] gap-14 m-auto text-center mt-20 '>
//                 <div className="border-2 text-[#EB5765] bg-[#5FCDB4] text-xl rounded-2xl  p-2">Productos de spa</div>
//                 <div className="border-2 text-[#036C65] bg-[#FFB5A8] text-xl rounded-2xl p-2"><h6>Cuidado personal</h6></div>
//                 <div className="border-2 text-[#036C65] bg-[#FFB5A8] text-xl rounded-2xl p-2">Perfumes</div>
//             </div>
//             <div className='selection:bg-[#EB5765] selection:text-white'>
//                 <div className='w-[80%] mx-auto mb-0 flex justify-center'>
//                     <Carousel
//                         additionalTransfrom={0}
//                         arrows
//                         autoPlay
//                         autoPlaySpeed={3000}
//                         centerMode={false}
//                         className="w-1/4 m-4"
//                         containerclassName="container-with-dots"
//                         dotListclassName=""
//                         // draggable
//                         focusOnSelect={false}
//                         infinite
//                         itemclassName=""
//                         keyBoardControl
//                         minimumTouchDrag={80}
//                         pauseOnHover
//                         renderArrowsWhenDisabled={false}
//                         renderButtonGroupOutside={false}
//                         renderDotsOutside={false}
//                         responsive={{
//                             desktop: {
//                                 breakpoint: {
//                                     max: 3000,
//                                     min: 1024
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 40
//                             },
//                             mobile: {
//                                 breakpoint: {
//                                     max: 464,
//                                     min: 0
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 30
//                             },
//                             tablet: {
//                                 breakpoint: {
//                                     max: 1024,
//                                     min: 464
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 30
//                             }
//                         }}
//                         rewind={false}
//                         rewindWithAnimation={false}
//                         rtl={false}
//                         shouldResetAutoplay
//                         showDots={false}
//                         sliderclassName=""
//                         slidesToSlide={1}
//                         swipeable
//                         className=''
//                     >

//                         <div className='m-4 font-[abeatbyKai]'>
//                             <img className='aspect-square rounded-2xl ' src={crema1} alt="" />
//                             <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas faciales 1</h6>
//                         </div>
//                         <div className='m-4 font-[abeatbyKai]' >
//                             <img className='aspect-square rounded-2xl' src={crema1} alt="" />
//                             <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas faciales 2</h6>
//                         </div>
//                     </Carousel>
//                     <Carousel
//                         additionalTransfrom={0}
//                         arrows
//                         autoPlay
//                         autoPlaySpeed={3000}
//                         centerMode={false}
//                         className="w-1/4 m-4"
//                         containerclassName="container-with-dots"
//                         dotListclassName=""
//                         // draggable
//                         focusOnSelect={false}
//                         infinite
//                         itemclassName=""
//                         keyBoardControl
//                         minimumTouchDrag={80}
//                         pauseOnHover
//                         renderArrowsWhenDisabled={false}
//                         renderButtonGroupOutside={false}
//                         renderDotsOutside={false}
//                         responsive={{
//                             desktop: {
//                                 breakpoint: {
//                                     max: 3000,
//                                     min: 1024
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 40
//                             },
//                             mobile: {
//                                 breakpoint: {
//                                     max: 464,
//                                     min: 0
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 30
//                             },
//                             tablet: {
//                                 breakpoint: {
//                                     max: 1024,
//                                     min: 464
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 30
//                             }
//                         }}
//                         rewind={false}
//                         rewindWithAnimation={false}
//                         rtl={false}
//                         shouldResetAutoplay
//                         showDots={false}
//                         sliderclassName=""
//                         slidesToSlide={1}
//                         swipeable
//                         className=''
//                     >

//                         <div className='m-4 font-[abeatbyKai]'>
//                             <img className='aspect-square rounded-2xl ' src={crema2} alt="" />
//                             <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas corporales 1</h6>
//                         </div>
//                         <div className='m-4 font-[abeatbyKai]' >
//                             <img className='aspect-square rounded-2xl' src={crema2} alt="" />
//                             <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Cremas corporales 2</h6>

//                         </div>
//                     </Carousel>
//                     <Carousel
//                         additionalTransfrom={0}
//                         arrows
//                         autoPlay
//                         autoPlaySpeed={3000}
//                         centerMode={false}
//                         className="w-1/4 m-4"
//                         containerclassName="container-with-dots"
//                         dotListclassName=""
//                         // draggable
//                         focusOnSelect={false}
//                         infinite
//                         itemclassName=""
//                         keyBoardControl
//                         minimumTouchDrag={80}
//                         pauseOnHover
//                         renderArrowsWhenDisabled={false}
//                         renderButtonGroupOutside={false}
//                         renderDotsOutside={false}
//                         responsive={{
//                             desktop: {
//                                 breakpoint: {
//                                     max: 3000,
//                                     min: 1024
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 40
//                             },
//                             mobile: {
//                                 breakpoint: {
//                                     max: 464,
//                                     min: 0
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 30
//                             },
//                             tablet: {
//                                 breakpoint: {
//                                     max: 1024,
//                                     min: 464
//                                 },
//                                 items: 1,
//                                 partialVisibilityGutter: 30
//                             }
//                         }}
//                         rewind={false}
//                         rewindWithAnimation={false}
//                         rtl={false}
//                         shouldResetAutoplay
//                         showDots={false}
//                         sliderclassName=""
//                         slidesToSlide={1}
//                         swipeable
//                         className=''
//                     >

//                         <div className='m-4 font-[abeatbyKai]'>
//                             <img className='aspect-square rounded-2xl ' src={crema1} alt="" />
//                             <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Perfume 1</h6>
//                         </div>
//                         <div className='m-4 font-[abeatbyKai]' >
//                             <img className='aspect-square rounded-2xl' src={crema1} alt="" />
//                             <h6 className='bg-[#EFD6B9] text-[#036C65] mt-4 rounded-2xl p-2  text-lg  text-center'>Perfume 2</h6>
//                         </div>
//                     </Carousel>
//                 </div>
//                 <div className='w-[62%] m-auto grid grid-cols-3 place-content-between'>
//                     <button className='my-4 mx-auto hover:bg-[#eb3846] text-center grid place-content-center content-center rounded-full h-20 w-20 text-white bg-[#EB5765]'>Ver todo
//                         <svg className='m-auto ' xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="14" height="14" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
//                     </button>
//                     <button className='my-4 mx-auto hover:bg-[#034d46] text-center grid place-content-center content-center rounded-full h-20 w-20 text-white bg-[#036C65]'>Ver todo
//                         <svg className='m-auto ' xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="14" height="14" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
//                     </button>
//                     <button className='my-4 mx-auto hover:bg-[#eb3846] text-center grid place-content-center content-center rounded-full h-20 w-20 text-white bg-[#EB5765]'>Ver todo
//                         <svg className='m-auto ' xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="14" height="14" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Productos;