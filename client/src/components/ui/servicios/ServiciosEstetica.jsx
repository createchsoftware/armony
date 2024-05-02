import Presentacion from "../../../components/ui/PresentacionEstetica.jsx";
import Servicio from "../../../components/ui/Servicio.jsx";
import Peluqueria from "../../../../public/pictures/peluqueria.png";
import Unas from "../../../../public/pictures/unas.png";
import Pedicura from "../../../../public/pictures/pedicura.png";

const ServiciosEstetica = () => {
  return (
    <div>
      <Presentacion />
      <div className="w-full mx-auto my-16">
        <p className=" text-4xl md:text-6xl text-center mb-8 font-[iloveglitter] text-[#036C65]">
          Servicios de la estética
        </p>
        <p className="w-3/4 md:w-full text-center mx-auto mt-8">
          El ambiente de un centro de estética está diseñado para ser
          profesional y enfocado en la belleza y el cuidado de la piel y el
          cabello.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
        <Servicio
          nombre={"Servicio de peluquería"}
          descripcion={"Espacio de transformación y renovación personal"}
          precio={"1,000.00"}
          imagen={Peluqueria}
          rating={5}
          isFavorite={true}
        />
        <Servicio
          nombre={"Uñas"}
          descripcion={"Transformación de las manos elevando confianza"}
          precio={"1,200.00"}
          imagen={Unas}
          rating={5}
          isFavorite={true}
        />
        <Servicio
          nombre={"Pedicura"}
          descripcion={"Tratamiento estético para los pies"}
          precio={"1,800.00"}
          imagen={Pedicura}
          rating={5}
          isFavorite={true}
        />
      </div>
      <div className="w-full mx-auto my-16 text-center">
        <p className="text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
          ¿No están los servicios que usas?
        </p>
        <p className="text-center w-3/4 md:w-full my-10 mx-auto">
          Tal vez los encuentres en los servicios de nuestro spa.
        </p>
        <a
          href="/spa/serviciosSpa"
          className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
          aria-label="Ir a estética"
        >
          Ver servicios de spa
        </a>
      </div>
    </div>
  );
};

export default ServiciosEstetica;
