import Presentacion from "../../../components/ui/PresentacionSpa.jsx";
import Servicio from "../../../components/ui/Servicio.jsx";
import Hydro from "../../../../public/pictures/Hydrafacial.png";
import Peeling from "../../../../public/pictures/PeelingQuímico.png";
import Meso from "../../../../public/pictures/MesoterapiaVirtual.png";

const ServiciosSpa = () => {
  return (
    <div>
      <Presentacion />
      <div className="w-full md:w-1/2 mx-auto my-16">
        <p className=" text-4xl md:text-6xl text-center font-[ILoveGlitter] text-[#036C65]">
          Servicios faciales
        </p>
        <div className="grid grid-cols-2 my-16">
          <a
            href=""
            className="bg-[#EB5765] text-white text-sm md:text-base rounded-full py-4 px-10 mx-auto"
          >
            Tratamientos faciales
          </a>
          <a
            href=""
            className="bg-[#F6B3B9] text-white text-xs md:text-base rounded-full py-4 px-10 mx-auto "
          >
            Tratamientos corporales
          </a>
        </div>
        <p className="w-3/4 md:w-full text-center mx-auto">
          Los tratamientos faciales son procedimientos cosméticos diseñados para
          mejorar la apariencia y la salud de la piel del rostro.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
        <Servicio
          nombre={"HydroFacial"}
          descripcion={"Estimula la restauración natural de la piel"}
          precio={"1,800.00"}
          imagen={Hydro}
          rating={5}
          isFavorite={true}
        />
        <Servicio
          nombre={"Mesoterapia virtual"}
          descripcion={"Aumenta la permeabilidad de la piel"}
          precio={"1,800.00"}
          imagen={Meso}
          rating={5}
          isFavorite={true}
        />
        <Servicio
          nombre={"Peeling químico"}
          descripcion={
            "Las capas de la pielm reveladas son más nuevas y por lo tanto más suaves y jóveens"
          }
          precio={"1,800.00"}
          imagen={Peeling}
          rating={5}
          isFavorite={true}
        />
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
