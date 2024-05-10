import Servicio from "../../../components/ui/Servicio.jsx";
import { useState } from "react";
import Presentacion from "../../../components/ui/PresentacionSpa.jsx";
import Filtro from "../../../components/ui/FiltrosServicios.jsx";
import Hydro from "../../../../public/pictures/Hydrafacial.png";
import Peeling from "../../../../public/pictures/PeelingQuímico.png";
import Meso from "../../../../public/pictures/MesoterapiaVirtual.png";
import Cavitacion from "../../../../public/pictures/Cavitación.png";
import Radio from "../../../../public/pictures/Radiofrecuencia.png";
import Vac from "../../../../public/pictures/Vacumterapia.png";
var faciales = [
  {
    id: 1,
    nombre: "HydroFacial",
    descripcion: "Estimula la restauración natural de la piel",
    espDesc1:
      "Representa la más avanzada tecnología para estimular la restauración natural de la piel sin dolor ni tiempo de recuperación es un a limpieza facial profunda.",
    espDesc2:
      "El procedimiento HydraFacial se realiza en tres etapas: \n1er. Etapa: La renovación de la piel \n2da. Etapa: Limpieza profunda \n3ra. Etapa: Solución rica en vitaminas antioxidantes altamente hidratante.",
    precio: "1,800.00",
    img: Hydro,
    rating: 5,
    fav: true,
  },
  {
    id: 2,
    nombre: "Mesoterapia virtual",
    descripcion: "Aumenta la permeabilidad de la piel",
    espDesc1:
      "La Mesoterapia Virtual o electroporación es un tratamiento que surgió buscando una alternativa a la propia mesoterapia. Es decir, lograr el paso de activos a la dermis sin tener que usar las temidas agujas.",
    espDesc2:
      "Esta técnica permite mediante la emisión de una corriente de baja intensidad aumentar la permeabilidad de piel y conseguir el paso de los activos a la dermis de forma gradual.",

    precio: "1,800.00",
    img: Meso,
    rating: 5,
    fav: true,
  },
  {
    id: 3,
    nombre: "Peeling químico",
    descripcion:
      "Las capas de la pielm reveladas son más nuevas y por lo tanto más suaves y jóveens",
    espDesc1:
      "El peeling químico es un tratamiento de rejuvenecimiento de la piel en el que se le aplica una solución química con el fin de eliminar las capas superiores dañadas.",
    espDesc2:
      "Al finalizar el peeling, las capas de piel reveladas son mas nuevas y por tanto más suaves y jóvenes.",

    precio: "1,800.00",
    img: Peeling,
    rating: 5,
    fav: true,
  },
];

var corporales = [
  {
    id: 1,
    nombre: "Cavitación",
    descripcion:
      "Elimina la grasa localizada mediante el uso de ultrasonidos de baja frecuencia",
    espDesc1:
      "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
    espDesc2:
      "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
    precio: "1,350.00",
    img: Cavitacion,
    rating: 5,
    fav: true,
  },
  {
    id: 2,
    nombre: "Radiofrecuencia",
    descripcion: "Reafirmación de la piel y reducción de volumen corporal",
    espDesc1:
      "La Radiofrecuencia o Diatermia está con nosotros desde hace 75 años. En medicina es conocida en el ámbito quirúrgico para la coagulación de tejidos y eliminación de tumores.",
    espDesc2:
      "En estética es el tratamiento más empleado para la reafirmación de la piel y reducción de volumen corporal.",
    precio: "1,350.00",
    img: Radio,
    rating: 5,
    fav: true,
  },
  {
    id: 3,
    nombre: "Vacumterapia",
    descripcion:
      "Drena el tejido adiposo movilizando la grasa localizada hacia el sistema linfático",
    espDesc1:
      "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
    espDesc2:
      "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
    precio: "1,350.00",
    img: Vac,
    rating: 5,
    fav: true,
  },
];

const ServiciosSpa = () => {
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
    <div>
      <Presentacion />
      <div className="w-full md:w-1/2 mx-auto my-16">
        <p className=" text-4xl md:text-6xl text-center font-[ILoveGlitter] text-[#036C65]">
          Servicios del Spa
        </p>
        <div className="grid grid-cols-2 my-16">
          <a
            style={{ backgroundColor: color1 }}
            onClick={() => toggleService(1)}
            className="text-white text-sm md:text-base rounded-full py-4 px-10 mx-auto"
          >
            Tratamientos faciales
          </a>
          <a
            style={{ backgroundColor: color2 }}
            onClick={() => toggleService(2)}
            className="text-white text-xs md:text-base rounded-full py-4 px-10 mx-auto "
          >
            Tratamientos corporales
          </a>
        </div>
        <div className={toggleState === 1 ? "block" : "hidden"}>
          <p className="w-3/4 md:w-full text-center mx-auto">
            Los tratamientos faciales son procedimientos cosméticos diseñados
            para mejorar la apariencia y la salud de la piel del rostro.
          </p>
        </div>
        <div className={toggleState === 2 ? "block" : "hidden"}>
          <p className="w-3/4 md:w-full text-center mx-auto">
            Los tratamientos corporales son procedimientos estéticos y que
            mejoran la apariencia y la salud de la piel y el cuerpo general.
          </p>
        </div>
      </div>
      <div className="grid md:relative">
        <div className={toggleState === 1 ? "block h-auto" : "hidden"}>
          {/*<Filtro className="relative float-start" />*/}
          <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
            {faciales.map((servicio) => (
              <Servicio
                nombre={servicio.nombre}
                descripcion={servicio.descripcion}
                espDesc1={servicio.espDesc1}
                espDesc2={servicio.espDesc2}
                precio={servicio.precio}
                imagen={servicio.img}
                rating={servicio.rating}
                isFavorite={servicio.fav}
              />
            ))}
          </div>
        </div>
        <div className={toggleState === 2 ? "block" : "hidden"}>
          <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
            {corporales.map((servicio) => (
              <Servicio
                nombre={servicio.nombre}
                descripcion={servicio.descripcion}
                espDesc1={servicio.espDesc1}
                espDesc2={servicio.espDesc2}
                precio={servicio.precio}
                imagen={servicio.img}
                rating={servicio.rating}
                isFavorite={servicio.fav}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full mx-auto my-28 text-center">
        <p className=" text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
          ¿No están los servicios que usas?
        </p>
        <p className="text-center w-3/4 md:w-full my-10 mx-auto">
          Tal vez los encuentres en los servicios de nuestra estética.
        </p>
        <a
          href="/spa/serviciosEstetica"
          className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
          aria-label="Ir a estética"
        >
          Ver servicios de estética
        </a>
      </div>
    </div>
  );
};

export default ServiciosSpa;
