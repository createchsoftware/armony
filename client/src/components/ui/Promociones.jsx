import React from "react";
import Carousel from "react-material-ui-carousel";
import "../../index.css";
import CircleIcon from "@mui/icons-material/Circle";

function Promociones() {
  return (
    <>
      <h1 className="text-5xl w-[80%] md:text-6xl mx-auto font  text-[#036C65] my-12 text-center items-center  font-[iloveglitter] mt-24">
        Conoce nuestras promociones e información!
      </h1>
      {/* <Carousel >
                <div className="grid gap-4 bg-[image:var(--image-url)] bg-cover aspect-auto text-center" style={{ '--image-url': `url(${'../../../public/pictures/promocion1.png'})` }}>
                    <div className="bg-[#1B8E87] border-2 border-[#EB5765] w-1/3 m-16 rounded-xl p-16 " >
                        <h1 className="text-6xl text-white font-[iloveglitter]">¡Super Promoción!</h1>
                        <h2 className="mt-12 text-3xl text-white font-[quinger] font-bold">Masaje maderoterapia</h2>
                        <p className="w-3/5 m-auto mt-4 text-lg text-center">Elige 2 de los tratamientos seleccionados por solo $2,500</p>
                        <p className="mt-6 text-gray-600">*Aplican restricciones</p>
                        <div className="flex justify-center m-auto">
                            <button class="mt-8 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"><span>Ver más...</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
                        </div>
                    </div>
                </div>
            </Carousel> */}
      <Carousel
        IndicatorIcon={<CircleIcon className="z-10 -translate-y-20" />}
        className="z-0 overflow-hidden "
      >
        <div
          className="grid gap-4 bg-[image:var(--image-url)] bg-cover aspect-auto text-center"
          style={{
            "--image-url": `url(${"../../../pictures/promocion1.png"})`,
            height: "700px",
          }}
        >
          <div className="bg-[#1B8E87] border-2 border-[#EB5765] w-1/3 m-16 rounded-xl p-16 h-[80%]">
            <h1 className="text-6xl text-white font-[iloveglitter]">
              ¡Super Promoción!
            </h1>
            <h2 className="mt-12 text-3xl text-white font-[quinger] font-bold">
              Masaje maderoterapia
            </h2>
            <p className="w-3/5 m-auto mt-4 text-lg text-center">
              Elige 2 de los tratamientos seleccionados por solo $2,500
            </p>
            <p className="mt-6 text-gray-600">*Aplican restricciones</p>
            <div className="flex justify-center m-auto">
              <button class="mt-8 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-2xl border-0 bg-[#1c5765] px-6 font-[abeatbykai] text-neutral-200">
                <span>Ver más...</span>
                <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div
          className="grid gap-4 bg-[image:var(--image-url)] bg-cover aspect-auto text-center"
          style={{
            "--image-url": `url(${"../../../pictures/spavista.png"})`,
            height: "700px",
          }}
        >
          <div className="bg-[#1B8E87] border-2 border-[#EB5765] w-1/3 m-16 rounded-xl p-16 h-[80%]">
            <h1 className="text-6xl text-white font-[iloveglitter]">
              Oferta Especial
            </h1>
            <h2 className="mt-12 text-3xl text-white font-[quinger] font-bold">
              Tratamiento Facial
            </h2>
            <p className="w-3/5 m-auto mt-4 text-lg text-center">
              Consiente tu piel con un 30% de descuento
            </p>
            <p className="mt-6 text-gray-600">Válido hasta el 30 de Junio</p>
            <div className="flex justify-center m-auto">
              <button class="mt-8 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-2xl border-0 bg-[#1c5765] px-6 font-[abeatbykai] text-neutral-200">
                <span>Ver más...</span>
                <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div
          className="grid gap-4 bg-[image:var(--image-url)] bg-cover aspect-auto text-center"
          style={{
            "--image-url": `url(${"../../../pictures/esteticavista.png"})`,
            height: "700px",
          }}
        >
          <div className="bg-[#1B8E87] border-2 border-[#EB5765] w-1/3 m-16 rounded-xl p-16 h-[80%]">
            <h1 className="text-6xl text-white font-[iloveglitter]">
              Promo Relámpago
            </h1>
            <h2 className="mt-12 text-3xl text-white font-[quinger] font-bold">
              Exfoliación Corporal
            </h2>
            <p className="w-3/5 m-auto mt-4 text-lg text-center">
              Disfruta de un 20% de descuento en nuestra exfoliación premium
            </p>
            <p className="mt-6 text-gray-600">Oferta válida sólo esta semana</p>
            <div className="flex justify-center m-auto">
              <button class="mt-8 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-2xl border-0 bg-[#1c5765] px-6 font-[abeatbykai] text-neutral-200">
                <span>Ver más...</span>
                <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
}

export default Promociones;
