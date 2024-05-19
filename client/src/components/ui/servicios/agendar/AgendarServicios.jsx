import { useState, useEffect } from "react";
import Carrusel from "../../CarruselServicios";

const AgendarServicios = () => {
  const [spa, setSpa] = useState([]);
  const [estetica, setEstetica] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetch("/api/admin/categoria/getServicesSpa")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los servicios de Spa");
        }
        return response.json();
      })
      .then((data) => {
        setSpa(data);
      })
      .catch((error) => {
        //setErrorSpa(error.message);
      });
  }, []);

  useEffect(() => {
    if (spa.length > 0) {
      setTimeout(() => {
        fetch("/api/admin/categoria/getServicesEstetica")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los servicios de Estética");
            }
            return response.json();
          })
          .then((data) => {
            setEstetica(data);
          })
          .catch((error) => {
            // setErrorEstetica(error.message);
          });
      }, 3000);
    }
  }, [spa]);

  {
    /* FALTA AGREGAR CONEXION CON FAVORITOS */
  }

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
    <div className="w-[53rem] h-[38rem] mb-6 mx-auto">
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
