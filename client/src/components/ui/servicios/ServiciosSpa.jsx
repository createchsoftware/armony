import { useEffect, useState } from "react";
import Presentacion from "../../../components/ui/PresentacionSpa.jsx";
import ServiciosYFiltro from "../ServiciosYFiltro.jsx";
import Soon from "../Proximamente";

export default function ServicioEstetica() {
  const [facial, setFacial] = useState([]);
  const [corpo, setCorpo] = useState([]);

  const [toggleState, setToggleState] = useState(1);
  const [color1, setColor1] = useState("#EB5765");
  const [color2, setColor2] = useState("#F6B3B9");
  const [log, setLog] = useState(false);
  const [id, setId] = useState();
  const [st, setSt] = useState(false);

  const [soon, setSoon] = useState(false);
  const toggleSoon = () => {
    setSoon(!soon);
  };

  let respuestaJson = null;
  async function checkLogin() {
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      respuestaJson = await respuesta.json();
      if (respuestaJson.logueado == true) {
        await setId(respuestaJson.clave);
        setLog(true);
      } else {
        setLog(false);
        setId(0);
      }
    } catch (error) {
      setLog(false);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  //useEffect from api call
  // useEffect(() => {
  //     fetch('/products')
  //         .then(res => res.json())
  //         .then(data => setProducts(data))
  //         .catch(err => console.log(err))
  // }, [])

  //useEffect para obtener los servicios faciales
  useEffect(() => {
    if (id != undefined) {
      setTimeout(() => {
        fetch(`/api/admin/categoria/getServicesFacial/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los servicios faciales");
            }
            return response.json();
          })
          .then((data) => {
            setFacial(data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }, 3000);
    }
  }, [id, st]);

  //useEffect para obtener los servicios corporales
  useEffect(() => {
    if (id != undefined) {
      setTimeout(() => {
        fetch(`/api/admin/categoria/getServicesCorporal/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los servicios corporales");
            }
            return response.json();
          })
          .then((data) => {
            setCorpo(data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }, 3000);
    }
  }, [id, st]);

  const toggleService = (index) => {
    setToggleState(index);
    if (index === 1) {
      setColor1("#EB5765");
      setColor2("#F6B3B9");
    } else {
      setColor2("#EB5765");
      setColor1("#F6B3B9");
    }
  };

  function changeSt() {
    setSt(!st);
  }

  return (
    <>
      <Presentacion />

      <div className="w-full mx-auto mt-16 md:w-1/2" id="serv">
        <p className=" text-4xl md:text-6xl text-center font-[ILoveGlitter] text-[#036C65]">
          Servicios del Spa
        </p>
        <div className="grid grid-cols-2 my-16">
          <a
            style={{ backgroundColor: color1 }}
            onClick={() => toggleService(1)}
            className="px-10 py-4 mx-auto text-sm text-white rounded-full hover:cursor-pointer hover:bg-opacity-80 md:text-base"
          >
            Tratamientos faciales
          </a>
          <a
            style={{ backgroundColor: color2 }}
            onClick={() => toggleService(2)}
            className="px-10 py-4 mx-auto text-xs text-white rounded-full hover:cursor-pointer hover:bg-opacity-80 md:text-base "
          >
            Tratamientos corporales
          </a>
        </div>
        <div className={toggleState === 1 ? "block" : "hidden"}>
          <p className="w-3/4 mx-auto text-center md:w-full">
            Los tratamientos faciales son procedimientos cosméticos diseñados
            para mejorar la apariencia y la salud de la piel del rostro.
          </p>
        </div>
        <div className={toggleState === 2 ? "block" : "hidden"}>
          <p className="w-3/4 mx-auto text-center md:w-full">
            Los tratamientos corporales son procedimientos estéticos y que
            mejoran la apariencia y la salud de la piel y el cuerpo general.
          </p>
        </div>
      </div>
      <div className="">
        <div>
          <div className={toggleState == 1 ? "block" : "hidden"}>
            <ServiciosYFiltro
              servicios={facial}
              log={log}
              idUser={id}
              st={changeSt}
            />
          </div>
          <div className={toggleState == 2 ? "block" : "hidden"}>
            <ServiciosYFiltro
              servicios={corpo}
              log={log}
              idUser={id}
              st={changeSt}
            />
          </div>
          <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="w-full mx-auto my-16 text-center">
              <p className="text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
                ¿No están los servicios que usas?
              </p>
              <p className="w-3/4 mx-auto my-10 text-center md:w-full">
                Tal vez los encuentres en los servicios de nuestra estética.
              </p>
              <a
                href="/spa/servicios/estetica"
                className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
                aria-label="Ir a estética"
              >
                Ver servicios de estética
              </a>
            </div>
          </main>
        </div>
      </div>
      {soon && (
        <div className="soon-fondo">
          <div className="soon-fx" onClick={toggleSoon}>
            <Soon />
          </div>
        </div>
      )}
    </>
  );
}

// import Presentacion from "../../../components/ui/PresentacionEstetica.jsx";
// import Servicio from "../../../components/ui/Servicio.jsx";
// import Peluqueria from "../../../../public/pictures/peluqueria.png";
// import Unas from "../../../../public/pictures/unas.png";
// import Pedicura from "../../../../public/pictures/pedicura.png";

// var estetica = [
//   {
//     id: 1,
//     nombre: "Servicio de peluquería",
//     descripcion: "Espacio de transformación y renovación personal",
//     espDesc1:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
//     espDesc2:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
//     precio: "1,350.00",
//     img: Peluqueria,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 2,
//     nombre: "Uñas",
//     descripcion: "Transformación de las manos elevando confianza",
//     espDesc1:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
//     espDesc2:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
//     precio: "1,200.00",
//     img: Unas,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 3,
//     nombre: "Pedicura",
//     descripcion: "Tratamiento estético para los pies",
//     espDesc1:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
//     espDesc2:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
//     precio: "1,800.00",
//     img: Pedicura,
//     rating: 5,
//     fav: true,
//   },
// ];

// const ServiciosEstetica = () => {
//   return (
//     <div>
//       <Presentacion />
//       <div className="w-full mx-auto my-16">
//         <p className=" text-4xl md:text-6xl text-center mb-8 font-[iloveglitter] text-[#036C65]">
//           Servicios de la estética
//         </p>
//         <p className="w-3/4 mx-auto mt-8 text-center md:w-full">
//           El ambiente de un centro de estética está diseñado para ser
//           profesional y enfocado en la belleza y el cuidado de la piel y el
//           cabello.
//         </p>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
//         {estetica.map((servicio) => (
//           <Servicio
//             nombre={servicio.nombre}
//             descripcion={servicio.descripcion}
//             espDesc1={servicio.espDesc1}
//             espDesc2={servicio.espDesc2}
//             precio={servicio.precio}
//             imagen={servicio.img}
//             rating={servicio.rating}
//             isFavorite={servicio.fav}
//           />
//         ))}
//       </div>
//       <div className="w-full mx-auto my-16 text-center">
//         <p className="text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
//           ¿No están los servicios que usas?
//         </p>
//         <p className="w-3/4 mx-auto my-10 text-center md:w-full">
//           Tal vez los encuentres en los servicios de nuestro spa.
//         </p>
//         <a
//           href="/spa/servicios/spa"
//           className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
//           aria-label="Ir a estética"
//         >
//           Ver servicios de spa
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ServiciosEstetica;

// import Servicio from "../../../components/ui/Servicio.jsx";
// import { useState } from "react";
// import Presentacion from "../../../components/ui/PresentacionSpa.jsx";
// import Filtro from "../../../components/ui/FiltrosServicios.jsx";
// import Hydro from "../../../../public/pictures/Hydrafacial.png";
// import Peeling from "../../../../public/pictures/PeelingQuímico.png";
// import Meso from "../../../../public/pictures/MesoterapiaVirtual.png";
// import Cavitacion from "../../../../public/pictures/Cavitación.png";
// import Radio from "../../../../public/pictures/Radiofrecuencia.png";
// import Vac from "../../../../public/pictures/Vacumterapia.png";
// var faciales = [
//   {
//     id: 1,
//     nombre: "HydroFacial",
//     descripcion: "Estimula la restauración natural de la piel",
//     espDesc1:
//       "Representa la más avanzada tecnología para estimular la restauración natural de la piel sin dolor ni tiempo de recuperación es un a limpieza facial profunda.",
//     espDesc2:
//       "El procedimiento HydraFacial se realiza en tres etapas: \n1er. Etapa: La renovación de la piel \n2da. Etapa: Limpieza profunda \n3ra. Etapa: Solución rica en vitaminas antioxidantes altamente hidratante.",
//     precio: "1,800.00",
//     img: Hydro,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 2,
//     nombre: "Mesoterapia virtual",
//     descripcion: "Aumenta la permeabilidad de la piel",
//     espDesc1:
//       "La Mesoterapia Virtual o electroporación es un tratamiento que surgió buscando una alternativa a la propia mesoterapia. Es decir, lograr el paso de activos a la dermis sin tener que usar las temidas agujas.",
//     espDesc2:
//       "Esta técnica permite mediante la emisión de una corriente de baja intensidad aumentar la permeabilidad de piel y conseguir el paso de los activos a la dermis de forma gradual.",

//     precio: "1,800.00",
//     img: Meso,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 3,
//     nombre: "Peeling químico",
//     descripcion:
//       "Las capas de la pielm reveladas son más nuevas y por lo tanto más suaves y jóveens",
//     espDesc1:
//       "El peeling químico es un tratamiento de rejuvenecimiento de la piel en el que se le aplica una solución química con el fin de eliminar las capas superiores dañadas.",
//     espDesc2:
//       "Al finalizar el peeling, las capas de piel reveladas son mas nuevas y por tanto más suaves y jóvenes.",

//     precio: "1,800.00",
//     img: Peeling,
//     rating: 5,
//     fav: true,
//   },
// ];

// var corporales = [
//   {
//     id: 1,
//     nombre: "Cavitación",
//     descripcion:
//       "Elimina la grasa localizada mediante el uso de ultrasonidos de baja frecuencia",
//     espDesc1:
//       "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
//     espDesc2:
//       "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
//     precio: "1,350.00",
//     img: Cavitacion,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 2,
//     nombre: "Radiofrecuencia",
//     descripcion: "Reafirmación de la piel y reducción de volumen corporal",
//     espDesc1:
//       "La Radiofrecuencia o Diatermia está con nosotros desde hace 75 años. En medicina es conocida en el ámbito quirúrgico para la coagulación de tejidos y eliminación de tumores.",
//     espDesc2:
//       "En estética es el tratamiento más empleado para la reafirmación de la piel y reducción de volumen corporal.",
//     precio: "1,350.00",
//     img: Radio,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 3,
//     nombre: "Vacumterapia",
//     descripcion:
//       "Drena el tejido adiposo movilizando la grasa localizada hacia el sistema linfático",
//     espDesc1:
//       "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
//     espDesc2:
//       "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
//     precio: "1,350.00",
//     img: Vac,
//     rating: 5,
//     fav: true,
//   },
// ];

// const ServiciosSpa = () => {
//   const [toggleState, setToggleService] = useState(1);
//   const [color1, setColor1] = useState("#EB5765");
//   const [color2, setColor2] = useState("#F6B3B9");

//   const toggleService = (index) => {
//     if (index === 1) {
//       setColor1("#EB5765");
//       setColor2("#F6B3B9");
//       setToggleService(index);
//     } else {
//       setColor2("#EB5765");
//       setColor1("#F6B3B9");
//       setToggleService(index);
//     }
//   };
//   return (
//     <div>
//       <Presentacion />
//       <div className="w-full mx-auto my-16 md:w-1/2">
//         <p className=" text-4xl md:text-6xl text-center font-[ILoveGlitter] text-[#036C65]">
//           Servicios del Spa
//         </p>
//         <div className="grid grid-cols-2 my-16">
//           <a
//             style={{ backgroundColor: color1 }}
//             onClick={() => toggleService(1)}
//             className="px-10 py-4 mx-auto text-sm text-white rounded-full md:text-base"
//           >
//             Tratamientos faciales
//           </a>
//           <a
//             style={{ backgroundColor: color2 }}
//             onClick={() => toggleService(2)}
//             className="px-10 py-4 mx-auto text-xs text-white rounded-full md:text-base "
//           >
//             Tratamientos corporales
//           </a>
//         </div>
//         <div className={toggleState === 1 ? "block" : "hidden"}>
//           <p className="w-3/4 mx-auto text-center md:w-full">
//             Los tratamientos faciales son procedimientos cosméticos diseñados
//             para mejorar la apariencia y la salud de la piel del rostro.
//           </p>
//         </div>
//         <div className={toggleState === 2 ? "block" : "hidden"}>
//           <p className="w-3/4 mx-auto text-center md:w-full">
//             Los tratamientos corporales son procedimientos estéticos y que
//             mejoran la apariencia y la salud de la piel y el cuerpo general.
//           </p>
//         </div>
//       </div>
//       <div className="grid md:relative">
//         <div className={toggleState === 1 ? "block h-auto" : "hidden"}>
//           {/*<Filtro className="relative float-start" />*/}
//           <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
//             {faciales.map((servicio) => (
//               <Servicio
//                 nombre={servicio.nombre}
//                 descripcion={servicio.descripcion}
//                 espDesc1={servicio.espDesc1}
//                 espDesc2={servicio.espDesc2}
//                 precio={servicio.precio}
//                 imagen={servicio.img}
//                 rating={servicio.rating}
//                 isFavorite={servicio.fav}
//               />
//             ))}
//           </div>
//         </div>
//         <div className={toggleState === 2 ? "block" : "hidden"}>
//           <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
//             {corporales.map((servicio) => (
//               <Servicio
//                 nombre={servicio.nombre}
//                 descripcion={servicio.descripcion}
//                 espDesc1={servicio.espDesc1}
//                 espDesc2={servicio.espDesc2}
//                 precio={servicio.precio}
//                 imagen={servicio.img}
//                 rating={servicio.rating}
//                 isFavorite={servicio.fav}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="w-full mx-auto text-center my-28">
//         <p className=" text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
//           ¿No están los servicios que usas?
//         </p>
//         <p className="w-3/4 mx-auto my-10 text-center md:w-full">
//           Tal vez los encuentres en los servicios de nuestra estética.
//         </p>
//         <a
//           href="/spa/servicios/estetica"
//           className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
//           aria-label="Ir a estética"
//         >
//           Ver servicios de estética
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ServiciosSpa;
