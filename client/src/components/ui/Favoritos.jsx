import { useState } from "react";
import favorito1 from "../../../public/pictures/favorito1.png";
import favorito2 from "../../../public/pictures/favorito4.png";
import favorito3 from "../../../public/pictures/favorito3.png";
import favorito4 from "../../../public/pictures/peluqueria.png";
import favorito5 from "../../../public/pictures/pedicura.png";
import favorito6 from "../../../public/pictures/manicuraserv.png";
import greenLeft from "../../../public/pictures/greenLeft.png";
import TarjetaFavoritos from "./TarjetaFavoritos";

var spa = [
  {
    nombre: "Masaje básico y facial",
    descr:
      "Los masajes faciales son una técnica de relajación y rejuvenecimiento que mejora la circulación y reduce la tensión facial.",
    img: favorito1,
    precio: 880,
    dur: 45,
    rating: 5,
    fav: true,
  },
  {
    nombre: "Masaje Corporal",
    descr:
      "El masaje corporal es una técnica terapéutica que utiliza presión y movimientos para relajar los músculos, aliviar el estrés y mejorar la circulación en todo el cuerpo.",
    img: favorito2,
    precio: 880,
    dur: 45,
    rating: 5,
    fav: true,
  },
  {
    nombre: "Facial y rejuvenecedor",
    descr:
      "Nuestros expertos revitalizan tu piel, reducen arrugas y mejoran la luminosidad, dándote una sensación de frescura y juventud.",
    img: favorito3,
    precio: 880,
    dur: 45,
    rating: 5,
    fav: true,
  },
];

var estetica = [
  {
    nombre: "Cortes",
    descr:
      "Transformación capilar que va más allá de simplemente recortar el cabello",
    img: favorito4,
    precio: 880,
    dur: 45,
    rating: 5,
    fav: true,
  },
  {
    nombre: "Pedicura",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, rerum reiciendis eius accusantium consectetur minima sapiente",
    img: favorito5,
    precio: 880,
    dur: 45,
    rating: 5,
    fav: true,
  },
  {
    nombre: "Manicura",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, rerum reiciendis eius accusantium consectetur minima sapiente",
    img: favorito6,
    precio: 880,
    dur: 45,
    rating: 5,
    fav: true,
  },
];

function Favoritos() {
  const [toggleState, setToggleService] = useState(1);
  const [color1, setColor1] = useState("#EB5765");
  const [color2, setColor2] = useState("#F6B3B9");

  const toggleService = (index) => {
    if (index === 1) {
      setColor1("#EB5765");
      setColor2("#F6B3B9");
      setToggleService(index);
    } else {
      setColor2("#EB5765");
      setColor1("#F6B3B9");
      setToggleService(index);
    }
  };
  return (
    <>
      <img
        src={greenLeft}
        alt=""
        className="absolute w-[12%] left-0 translate-y-[-0rem] "
      />
      <div className="m-auto w-[80%]  selection:bg-[#EB5765] selection:text-white grid place-content-center">
        <h1 className="text-5xl md:text-6xl mx-14 font  text-[#036C65] my-12 text-center items-center mt-12 font-[iloveglitter] ">
          Los servicios favoritos de nuestros clientes
        </h1>
        <div className=" w-[24rem] grid grid-cols-2 mx-auto mb-12">
          <a
            style={{ backgroundColor: color1 }}
            onClick={() => toggleService(1)}
            className="w-[8rem] text-white text-sm text-center md:text-base rounded-2xl py-3 mx-auto"
          >
            SPA
          </a>
          <a
            style={{ backgroundColor: color2 }}
            onClick={() => toggleService(2)}
            className="w-[8rem] text-white text-xs md:text-base text-center rounded-2xl py-3 mx-auto "
          >
            Estética
          </a>
        </div>
        <div>
          <div className={toggleState === 1 ? "block h-auto" : "hidden"}>
            <div className="grid gap-8 md:grid-cols-3">
              {spa.map((servicio) => {
                return (
                  <TarjetaFavoritos
                    props={{
                      nombre: servicio.nombre,
                      descr: servicio.descr,
                      img: servicio.img,
                      precio: servicio.precio,
                      dur: servicio.dur,
                      rating: servicio.rating,
                      isFavorite: servicio.fav,
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className={toggleState === 2 ? "block h-auto" : "hidden"}>
            <div className="grid gap-8 md:grid-cols-3">
              {estetica.map((servicio) => {
                return (
                  <TarjetaFavoritos
                    props={{
                      nombre: servicio.nombre,
                      descr: servicio.descr,
                      img: servicio.img,
                      precio: servicio.precio,
                      dur: servicio.dur,
                      rating: servicio.rating,
                      isFavorite: servicio.fav,
                    }}
                  />
                );
              })}
            </div>
          </div>
          {/*<div className="">
            <img
              className=" m-auto aspect-square w-[60%] "
              src={favorito1}
              alt=""
            />
            <div className="mt-6 text-[#036C65] bg-[#E8C3C6] rounded-3xl text-md md:text-xl text-center p-2 w-2/3 m-auto flex justify-center items-center">
              Masaje basico y facial
            </div>
            <div className="w-1/2 md:ml-[7.5vw] m-auto md:m-2 md:mt-6 text-center flex  mt-6 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 256 256"
                style={{ fill: "#FA5252" }}
              >
                <g
                  fill="#036c65"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24.98438,6.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v14.17383c-1.19786,0.42351 -1.99904,1.55565 -2,2.82617c0.00091,0.44693 0.10168,0.88802 0.29492,1.29102l-6.00195,6.00195c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l6.00195,-6.00195c0.403,0.19325 0.84408,0.29401 1.29102,0.29492c1.65685,0 3,-1.34315 3,-3c-0.00178,-1.2698 -0.80282,-2.40095 -2,-2.82422v-14.17578c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
                  </g>
                </g>
              </svg>
              <p className="pl-6">45 min</p>
            </div>
            <div className="w-1/2  md:ml-[7vw] m-auto md:m-2 md:mt-6  text-center flex  mt-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                style={{ fill: "#036c65" }}
              >
                <path d="M 25 7 C 15.0625 7 7 15.0625 7 25 C 7 34.9375 15.0625 43 25 43 C 34.9375 43 43 34.9375 43 25 C 43 15.0625 34.9375 7 25 7 Z M 25 9 C 33.859375 9 41 16.140625 41 25 C 41 33.859375 33.859375 41 25 41 C 16.140625 41 9 33.859375 9 25 C 9 16.140625 16.140625 9 25 9 Z M 24 14 L 24 16.1875 C 22.398438 16.386719 19.5 17.789063 19.5 21.1875 C 19.5 27.585938 28.8125 24.292969 28.8125 29.09375 C 28.8125 30.695313 28.101563 32.1875 25 32.1875 C 21.898438 32.1875 21 29.800781 21 28.5 L 19 28.5 C 19.300781 32.800781 22.300781 33.792969 24 34.09375 L 24 36 L 26 36 L 26 34.09375 C 27.5 33.992188 31 32.90625 31 28.90625 C 31 25.605469 28.289063 24.695313 25.6875 24.09375 C 23.585938 23.59375 21.6875 23.101563 21.6875 21 C 21.6875 20.101563 22.09375 18.09375 25.09375 18.09375 C 27.195313 18.09375 28.199219 19.398438 28.5 21 L 30.5 21 C 29.898438 18.800781 28.898438 16.8125 26 16.3125 L 26 14 Z"></path>
              </svg>
              <p className="pl-2 md:pl-2">880 MXN</p>
            </div>
          </div>
          <div className="">
            <img
              className="m-auto aspect-square w-[60%]"
              src={favorito2}
              alt=""
            />
            <div className="mt-6  text-[#036C65] bg-[#E8C3C6] rounded-3xl text-md md:text-xl p-2 w-2/3 m-auto text-center flex justify-center items-center">
              Maquillaje y peinado
            </div>
            <div className=" text-center flex w-1/2 md:ml-[7.5vw]  m-auto md:m-2 md:mt-6   mt-6 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 256 256"
                style={{ fill: "#FA5252" }}
              >
                <g
                  fill="#036c65"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24.98438,6.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v14.17383c-1.19786,0.42351 -1.99904,1.55565 -2,2.82617c0.00091,0.44693 0.10168,0.88802 0.29492,1.29102l-6.00195,6.00195c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l6.00195,-6.00195c0.403,0.19325 0.84408,0.29401 1.29102,0.29492c1.65685,0 3,-1.34315 3,-3c-0.00178,-1.2698 -0.80282,-2.40095 -2,-2.82422v-14.17578c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
                  </g>
                </g>
              </svg>
              <p className="pl-6">45 min</p>
            </div>
            <div className="w-1/2 md:ml-[7vw]  m-auto md:m-2 md:mt-6  text-center flex  mt-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                style={{ fill: "#036c65" }}
              >
                <path d="M 25 7 C 15.0625 7 7 15.0625 7 25 C 7 34.9375 15.0625 43 25 43 C 34.9375 43 43 34.9375 43 25 C 43 15.0625 34.9375 7 25 7 Z M 25 9 C 33.859375 9 41 16.140625 41 25 C 41 33.859375 33.859375 41 25 41 C 16.140625 41 9 33.859375 9 25 C 9 16.140625 16.140625 9 25 9 Z M 24 14 L 24 16.1875 C 22.398438 16.386719 19.5 17.789063 19.5 21.1875 C 19.5 27.585938 28.8125 24.292969 28.8125 29.09375 C 28.8125 30.695313 28.101563 32.1875 25 32.1875 C 21.898438 32.1875 21 29.800781 21 28.5 L 19 28.5 C 19.300781 32.800781 22.300781 33.792969 24 34.09375 L 24 36 L 26 36 L 26 34.09375 C 27.5 33.992188 31 32.90625 31 28.90625 C 31 25.605469 28.289063 24.695313 25.6875 24.09375 C 23.585938 23.59375 21.6875 23.101563 21.6875 21 C 21.6875 20.101563 22.09375 18.09375 25.09375 18.09375 C 27.195313 18.09375 28.199219 19.398438 28.5 21 L 30.5 21 C 29.898438 18.800781 28.898438 16.8125 26 16.3125 L 26 14 Z"></path>
              </svg>
              <p className="pl-2">550 MXN</p>
            </div>
          </div>
          <div className="">
            <img
              className="m-auto aspect-square w-[60%]"
              src={favorito3}
              alt=""
            />
            <div className="mt-6 text-[#036C65] bg-[#E8C3C6] rounded-3xl text-md md:text-xl p-2 w-2/3 m-auto text-center flex justify-center items-center">
              Facial rejuvenecedor
            </div>
            <div className="md:ml-[7.5vw]  m-auto md:m-2 md:mt-6 text-center flex w-1/2  mt-6 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 256 256"
                style={{ fill: "#FA5252" }}
              >
                <g
                  fill="#036c65"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24.98438,6.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v14.17383c-1.19786,0.42351 -1.99904,1.55565 -2,2.82617c0.00091,0.44693 0.10168,0.88802 0.29492,1.29102l-6.00195,6.00195c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l6.00195,-6.00195c0.403,0.19325 0.84408,0.29401 1.29102,0.29492c1.65685,0 3,-1.34315 3,-3c-0.00178,-1.2698 -0.80282,-2.40095 -2,-2.82422v-14.17578c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
                  </g>
                </g>
              </svg>
              <p className="pl-6">45 min</p>
            </div>
            <div className="text-center flex w-1/2 md:ml-[7vw]  m-auto md:m-2 md:mt-6 mt-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                style={{ fill: "#036c65" }}
              >
                <path d="M 25 7 C 15.0625 7 7 15.0625 7 25 C 7 34.9375 15.0625 43 25 43 C 34.9375 43 43 34.9375 43 25 C 43 15.0625 34.9375 7 25 7 Z M 25 9 C 33.859375 9 41 16.140625 41 25 C 41 33.859375 33.859375 41 25 41 C 16.140625 41 9 33.859375 9 25 C 9 16.140625 16.140625 9 25 9 Z M 24 14 L 24 16.1875 C 22.398438 16.386719 19.5 17.789063 19.5 21.1875 C 19.5 27.585938 28.8125 24.292969 28.8125 29.09375 C 28.8125 30.695313 28.101563 32.1875 25 32.1875 C 21.898438 32.1875 21 29.800781 21 28.5 L 19 28.5 C 19.300781 32.800781 22.300781 33.792969 24 34.09375 L 24 36 L 26 36 L 26 34.09375 C 27.5 33.992188 31 32.90625 31 28.90625 C 31 25.605469 28.289063 24.695313 25.6875 24.09375 C 23.585938 23.59375 21.6875 23.101563 21.6875 21 C 21.6875 20.101563 22.09375 18.09375 25.09375 18.09375 C 27.195313 18.09375 28.199219 19.398438 28.5 21 L 30.5 21 C 29.898438 18.800781 28.898438 16.8125 26 16.3125 L 26 14 Z"></path>
              </svg>
              <p className="pl-2">900 MXN</p>
            </div>
  </div>*/}
        </div>
        <button className="mt-12 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200">
          <span>Ver más</span>
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
    </>
  );
}

export default Favoritos;
