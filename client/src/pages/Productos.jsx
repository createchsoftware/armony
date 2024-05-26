import LayoutPrincipal from "../layouts/LayoutPrincipal.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Filtros from "../components/ui/Filtros.jsx";
import Ofertas from "../components/ui/Ofertas.jsx";
import { useState } from "react";
import Soon from "../components/ui/Proximamente.jsx";
import { useEffect } from "react";

const Productos = () => {
  const [descuentos, setDescuentos] = useState([]);
  const [soon, setSoon] = useState(false);

  const toggleSoon = () => {
    setSoon(!soon)
  };

  //useEffect para obtener los productos con descuento
  useEffect(() => {
    fetch("/api/admin/productos/descuento")
      .then((response) => response.json())
      .then((data) => {
        // Acceder al array de objetos en la posición 0 del array dentro de data
        const descuentosArray = data.data[0];
        setDescuentos(descuentosArray);
        console.log(descuentosArray);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../scripts/index.js"></script>
        </Helmet>
      </HelmetProvider>
      <LayoutPrincipal>
        <main className="bg-[#F4F1ED] pb-20">
          <img
            className="w-48 translate-y-24 float-start"
            src="../../pictures/left.png"
            alt=""
          />
          <img
            className="translate-y-12 w-80 float-end"
            src="../../pictures/right.png"
            alt=""
          />
          <section className="w-full p-16 my-20 bg-white">
            <div className="m-auto text-center">
              <h1 className="text-6xl text-[#036C65] text-shadow-2xl drop-shadow-[2px_3px_var(--tw-shadow-color)] shadow-gray-200  font-[ILoveGlitter]">
                Sumerjete en la serenidad
              </h1>
              <p className="pt-6 text-xl w-1/3 m-auto  text-[#036C65] drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-gray-400 ">
                Descubre nuestra exquisita gama de productos para el bienestar
                en armony.
              </p>
            </div>
          </section>

          <section className=" grid grid-cols-2 w-[80%] m-auto rounded-xl overflow-hidden ">
            <div>
              <img src="../../pictures/ofertas.png" alt="" />
            </div>
            <div className="grid">
              <div className="absolute bg-[#036C65]">
                <img
                  className="w-36"
                  src="../../pictures/decoIzquierda.png"
                  alt=""
                />
              </div>
              <div className="grid gap-5 text-white text-center py-32 pt-40 pb-36 bg-[#036C65]">
                <p className="text-3xl">
                  CONOCE NUESTRAS OFERTAS ÚNICAS HASTA 50% OFF
                </p>
                <a className="hover:cursor-pointer" onClick={toggleSoon}>Ver más {">"} </a>
              </div>
              {/* <div className='-translate-y-36'>
                                <img className='float-right w-28' src="../../pictures/decoDerecha.png" alt="" />
                            </div> */}

            </div>
          </section>

          <section className="my-20 w-[80%] bg-white m-auto p-6 rounded-xl border-8 border-[#E2B3B7]">
            <h1 className="pb-4 text-xl ml-28">Ofertas en descuento</h1>
            <hr />
            <div className="mx-auto p-6 md:mx-28 md:p-0 selection:bg-[#EB5765] selection:text-white">
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
                      min: 1024,
                    },
                    items: 4,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
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
                {
                  descuentos.map((oferta, index) => (
                    <Ofertas producto={oferta} />
                  ))}
              </Carousel>
            </div>
          </section>



          <section className=" w-[80%] m-auto">
            <Filtros />
          </section>

          <section className="my-20 w-[80%] m-auto grid rounded-xl">
            <div className="p-6 text-xl text-center bg-white rounded-xl ">
              <h2>Promociones del día</h2>
            </div>
            <div className="grid grid-cols-3 gap-2 ">
              <div className="grid bg-white ">
                <img src="../../pictures/ofertas1.png" alt="" />
                <div className="grid gap-2 p-6">
                  <h3 className="font-bold">Para este día de las madres</h3>
                  <p className="text-xs text-gray-500">
                    Encuentra las mejores ofertas para la mejor madre del
                    planeta.
                  </p>
                  <button onClick={toggleSoon} className="m-auto transition-all mt-2 duration-300   hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200">
                    <span>Ver productos</span>
                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className="grid bg-white rounded-xl ">
                <img src="../../pictures/ofertas2.png" alt="" />
                <div className="grid gap-2 p-6">
                  <h3 className="font-bold">Para este día de las madres</h3>
                  <p className="text-xs text-gray-500">
                    Encuentra las mejores ofertas para la mejor madre del
                    planeta.
                  </p>
                  <button onClick={toggleSoon} className="m-auto transition-all mt-2 duration-300   hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200">
                    <span>Ver productos</span>
                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className="grid bg-white rounded-xl ">
                <img src="../../pictures/ofertas3.png" alt="" />
                <div className="grid gap-2 p-6">
                  <h3 className="font-bold">Para este día de las madres</h3>
                  <p className="text-xs text-gray-500">
                    Encuentra las mejores ofertas para la mejor madre del
                    planeta.
                  </p>
                  <button onClick={toggleSoon} className="m-auto transition-all mt-2 duration-300   hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200">
                    <span>Ver productos</span>
                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/*<section className='w-[80%] m-auto mt-12'>
                        <ContenedorProductos />
                    </section>*/}

          {
            soon && (
              <div className='soon-fondo'>
                <div className='text-black soon-fx' onClick={toggleSoon}>
                  <Soon />
                </div>
              </div>
            )
          }
        </main>
      </LayoutPrincipal>
    </>
  );
};

export default Productos;
