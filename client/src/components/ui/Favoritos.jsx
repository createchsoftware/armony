import { useState, useEffect } from "react";
import favorito1 from "../../../public/pictures/favorito1.png";
import favorito2 from "../../../public/pictures/favorito4.png";
import favorito3 from "../../../public/pictures/favorito3.png";
import favorito4 from "../../../public/pictures/peluqueria.png";
import favorito5 from "../../../public/pictures/pedicura.png";
import favorito6 from "../../../public/pictures/manicuraserv.png";
import greenLeft from "../../../public/pictures/greenLeft.png";
import TarjetaFavoritos from "./TarjetaFavoritos";

/*var spa = [
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
];*/

function Favoritos() {
  const [toggleState, setToggleService] = useState(1);
  const [spa, setSpa] = useState([]);
  const [estetica, setEstetica] = useState([]);
  const [color1, setColor1] = useState("#EB5765");
  const [color2, setColor2] = useState("#F6B3B9");

  useEffect(() => {
    setTimeout(() => {
      fetch("/api/admin/favoritos/ServiceFavoritosSpa")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los favoritos de spa");
          }
          return response.json();
        })
        .then((data) => {
          setSpa(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch("/api/admin/favoritos/ServiceFavoritosEstetica")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los favoritos de estetica");
          }
          return response.json();
        })
        .then((data) => {
          setEstetica(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, 3000);
  }, []);

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

  /*useEffect(() => {
    setTimeout(() => {
      fetch("/api/admin/productos/favoritos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los servicios relacionados");
          }
          return response.json();
        })
        .then((data) => {
          setSimilares(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, 3000);
  }, []);*/

  const setNavigate = () => {
    if (toggleState === 1) {
      window.location.href = "/spa/servicios/spa";
    } else {
      window.location.href = "/spa/servicios/estetica";
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
            className="w-[8rem] hover:cursor-pointer text-white text-sm text-center md:text-base rounded-2xl py-3 mx-auto"
          >
            SPA
          </a>
          <a
            style={{ backgroundColor: color2 }}
            onClick={() => toggleService(2)}
            className="w-[8rem] hover:cursor-pointer text-white text-xs md:text-base text-center rounded-2xl py-3 mx-auto "
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
                      descr: servicio.descripcion,
                      img: servicio.img,
                      precio: servicio.precio,
                      dur: servicio.tiempo,
                      rating: servicio.valoracion,
                      //isFavorite: servicio.fav,
                      isFavorite: true,
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
                      descr: servicio.descripcion,
                      img: servicio.img,
                      precio: servicio.precio,
                      dur: servicio.tiempo,
                      rating: servicio.valoracion,
                      //isFavorite: servicio.fav,
                      isFavorite: true,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <button
          onClick={setNavigate}
          className="mt-12 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"
        >
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
