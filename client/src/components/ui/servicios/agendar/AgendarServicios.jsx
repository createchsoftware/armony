import { useState,useEffect } from "react";
import Carrusel from "../../CarruselServicios";

// const spa = [
//   {
//     id: 1,
//     nombre: "Masaje corporal",
//     precio: 700,
//     duracion: 60,
//     descripcion:
//       "Técnicas personalizadas para aliviar la tensión muscular, liberar el estrés y renovar tu bienestar. Sumérgete en un oasis de calma y deja que nuestros expertos te lleven a un estado de completa tranquilidad.",
//     img: "../../../../../pictures/MasajeReductivoColombiano.png",
//     rating: 5,
//   },
//   {
//     id: 2,
//     nombre: "Facial",
//     precio: 500,
//     duracion: 90,
//     descripcion:
//       "Diseñados para mejorar la textura de la piel, reducir la apariencia de líneas finas y promover un brillo saludable.",
//     img: "../../../../../pictures/Hydrafacial.png",
//     rating: 5,
//   },
//   {
//     id: 3,
//     nombre: "Depilación",
//     precio: 500,
//     duracion: 90,
//     descripcion:
//       "Obtén una piel suave y sin vello con nuestra depilación profesional. Desde cejas perfectamente arqueadas hasta piernas sedosas, nuestros especialistas utilizan técnicas avanzadas y productos de alta calidad para ofrecerte resultados duraderos y cómodos.",
//     img: "../../../../../pictures/LiftingFacial.png",
//     rating: 5,
//   },
//   {
//     id: 4,
//     nombre: "Levantamiento de gluteos",
//     precio: 700,
//     duracion: 60,
//     descripcion:
//       " Técnicas personalizadas para aliviar la tensión muscular, liberar el estrés y renovar tu bienestar. Sumérgete en un oasis de calma y deja que nuestros expertos te lleven a un estado de completa tranquilidad.",
//     img: "../../../../../pictures/MasajeAntiCelulitisColombiano.png",
//     rating: 5,
//   },
// ];

// const estetica = [
//   {
//     id: 1,
//     nombre: "Maquillaje",
//     precio: 700,
//     duracion: 60,
//     descripcion:
//       " Técnicas personalizadas para aliviar la tensión muscular, liberar el estrés y renovar tu bienestar. Sumérgete en un oasis de calma y deja que nuestros expertos te lleven a un estado de completa tranquilidad.",
//     img: "../../../../../pictures/pestañas.png",
//     rating: 5,
//   },
//   {
//     id: 2,
//     nombre: "Planchado de pelo",
//     precio: 500,
//     duracion: 90,
//     descripcion:
//       "Diseñados para mejorar la textura de la piel, reducir la apariencia de líneas finas y promover un brillo saludable.",
//     img: "../../../../../pictures/peluqueria.png",
//     rating: 5,
//   },
// ];

const favoritos = [
  {
    id: 1,
    nombre: "Manicure",
    precio: 650,
    duracion: 120,
    descripcion:
      "Técnicas personalizadas para aliviar la tensión muscular, liberar el estrés y renovar tu bienestar. Sumérgete en un oasis de calma y deja que nuestros expertos te lleven a un estado de completa tranquilidad.",
    img: "../../../../../pictures/unas.png",
    rating: 5,
  },
  {
    id: 2,
    nombre: "Tinte",
    precio: 750,
    duracion: 90,
    descripcion:
      "Diseñados para mejorar la textura de la piel, reducir la apariencia de líneas finas y promover un brillo saludable.",
    img: "../../../../../pictures/tintes.png",
    rating: 5,
  },
];

const AgendarServicios = () => {

  const [spa, setSpa] = useState([])
  const [estetica, setEstetica] = useState([])



  useEffect(() => {
    fetch("/api/admin/categoria/getServicesSpa")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener los servicios de Spa");
        }
        return response.json();
      })
      .then(data => {
        setSpa(data);
      })
      .catch(error => {
        //setErrorSpa(error.message);
      });
  }, []);

  // useEffect(() => {
  //   fetch("/api/admin/categoria/getServicesEstetica")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Error al obtener los servicios de Estética");
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setEstetica(data);
  //     })
  //     .catch(error => {
  //      // setErrorEstetica(error.message);
  //     });
  // }, []);


  const [toggleState, setToggleService] = useState(1);
  const [color1, setColor1] = useState("#80B5B0");
  const [color2, setColor2] = useState("#FCEAEC");
  const [color3, setColor3] = useState("#FCEAEC");
  let i = 0;

  const toggleService = (index) => {
    if (index === 1) {
      setColor1("#80B5B0");
      setColor2("#FCEAEC");
      setColor3("#FCEAEC");
      setToggleService(index);
    } else if (index === 2) {
      setColor2("#80B5B0");
      setColor1("#FCEAEC");
      setColor3("#FCEAEC");
      setToggleService(index);
    } else if (index === 3) {
      setColor3("#80B5B0");
      setColor2("#FCEAEC");
      setColor1("#FCEAEC");
      setToggleService(index);
    }
    i++;
    if (i > 20) {
      console.log("Secreto bien secreto");
    }
    console.log(i);
    console.log(index);
  };
  return (
    <div className="w-[50rem] h-[33rem] mb-6 mx-auto">
      <div className="w-[16rem] mx-auto">
        <h1 className="mb-2 text-xl font-bold text-center">
          Selecciona tus servicios
        </h1>
        <div className="flex-grow pl-4 mx-0 ring-1 ring-rose-300"></div>
      </div>
      <div className="flex justify-center mx-auto mt-7">
        <button
          style={{ backgroundColor: color1 }}
          onClick={() => toggleService(1)}
          className="font-[ABeeZee] font-bold px-10 py-1 rounded-full"
        >
          Spa
        </button>
        <button
          style={{ backgroundColor: color2 }}
          onClick={() => toggleService(2)}
          className="font-[ABeeZee] font-bold px-10 py-1 mx-3 rounded-full"
        >
          Estética
        </button>
        <button
          style={{ backgroundColor: color3 }}
          onClick={() => toggleService(3)}
          className="font-[ABeeZee] font-bold px-10 py-1 rounded-full"
        >
          Favoritos
        </button>
      </div>
      <div className={toggleState === 1 ? "block" : "hidden"}>
        <Carrusel servicios={spa} />
      </div>
      <div className={toggleState === 2 ? "block" : "hidden"}>
        <Carrusel servicios={estetica} />
      </div>
      <div className={toggleState === 3 ? "block" : "hidden"}>
        <Carrusel servicios={favoritos} />
      </div>
    </div>
  );
};

export default AgendarServicios;
