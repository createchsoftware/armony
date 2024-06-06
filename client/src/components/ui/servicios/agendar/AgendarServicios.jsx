import { useState, useEffect } from "react";
import Carrusel from "../../CarruselServicios";
import Soon from "../../../../components/ui/Proximamente";

const AgendarServicios = ({ next }) => {
  const [soon, setSoon] = useState(false);
  const [spa, setSpa] = useState([]);
  const [estetica, setEstetica] = useState([]);
  const [fSpa, setFSpa] = useState([]);
  const [fEstetica, setFEstetica] = useState([]);
  const [filtrosSpa, setFiltrosSpa] = useState([]);
  const [filtrosEstetica, setFiltrosEstetica] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [id, setId] = useState();
  const [st, setSt] = useState(false);

  async function getId() {
    let respuestaJson = null;
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      respuestaJson = await respuesta.json();
      setId(respuestaJson.clave);
    } catch (error) {
      console.log("Error");
    }
  }

  const toggleSoon = () => {
    setSoon(!soon);
  };

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (id != undefined) {
      fetch(`/api/admin/categoria/getServicesSpa/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los servicios de Spa");
          }
          return response.json();
        })
        .then((data) => {
          setSpa(data);
          filtroSpa(data);
        })
        .catch((error) => {
          //setErrorSpa(error.message);
        });
    }
  }, [id, st]);

  useEffect(() => {
    if (id != undefined) {
      setTimeout(() => {
        fetch(`/api/admin/categoria/getServicesEstetica/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los servicios de Estética");
            }
            return response.json();
          })
          .then((data) => {
            setEstetica(data);
            filtroEstetica(data);
          })
          .catch((error) => {
            // setErrorEstetica(error.message);
          });
      }, 3000);
    }
  }, [id, st]);

  useEffect(() => {
    if (id != undefined) {
      setTimeout(() => {
        fetch(`/api/admin/productos/serviciosFav/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los servicios de Estética");
            }
            return response.json();
          })
          .then((data) => {
            setFavoritos(data);
          })
          .catch((error) => {
            // setErrorEstetica(error.message);
          });
      }, 3000);
    }
  }, [id, st]);

  useEffect(() => {
    if (id != undefined) {
      setTimeout(() => {
        fetch(`/api/admin/productos/servicios/descuento/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los servicios de Estética");
            }
            return response.json();
          })
          .then((data) => {
            setDescuentos(data);
          })
          .catch((error) => {
            // setErrorEstetica(error.message);
          });
      }, 3000);
    }
  }, [id, st]);

  function changeSt() {
    setSt(!st);
  }

  function filtroSpa(data) {
    let cat = ["General"];
    for (let i = 0; i < data.length; i++) {
      cat[i + 1] = data[i].categoria;
    }
    cat = new Set(cat);

    // Eliminar duplicados usando Set
    const uniqueCategories = Array.from(cat);

    // Crear opciones basadas en las categorías
    const res = uniqueCategories.map((categoria, index) => ({
      label: categoria,
      checked: index == 0 ? true : false,
    }));

    console.log(res);

    setFiltrosSpa(res);
  }

  function filtroEstetica(data) {
    let cat = ["General"];
    for (let i = 0; i < data.length; i++) {
      cat[i + 1] = data[i].categoria;
    }
    cat = new Set(cat);

    // Eliminar duplicados usando Set
    const uniqueCategories = Array.from(cat);

    // Crear opciones basadas en las categorías
    const res = uniqueCategories.map((categoria, index) => ({
      label: categoria,
      checked: index == 0 ? true : false,
    }));

    console.log(res);
    setFiltrosEstetica(res);
  }

  const handleBSClick = (index) => {
    setFiltrosSpa((prevFiltros) =>
      prevFiltros.map((button, i) =>
        i === index
          ? { ...button, checked: true }
          : { ...button, checked: false }
      )
    );
  };

  const handleBEClick = (index) => {
    setFiltrosEstetica((prevFiltros) =>
      prevFiltros.map((button, i) =>
        i === index
          ? { ...button, checked: true }
          : { ...button, checked: false }
      )
    );
  };

  useEffect(() => {
    let servicios = [];
    let x = 0;
    let cat = "";
    for (let i = 0; i < filtrosSpa.length; i++) {
      if (filtrosSpa[i].checked == true) {
        x = i;
        cat = filtrosSpa[i].label;
        break;
      }
    }
    if (x == 0) {
      setFSpa(spa);
    } else {
      let j = 0;
      for (let i = 0; i < spa.length; i++) {
        if (spa[i].categoria == cat) {
          servicios[j] = spa[i];
          j++;
        }
      }
      setFSpa(servicios);
      console.log(fSpa);
    }
  }, [filtrosSpa]);

  useEffect(() => {
    let servicios = [];
    let x = 0;
    let cat = "";
    for (let i = 0; i < filtrosEstetica.length; i++) {
      if (filtrosEstetica[i].checked == true) {
        x = i;
        cat = filtrosEstetica[i].label;
        break;
      }
    }
    if (x == 0) {
      setFEstetica(estetica);
    } else {
      let j = 0;
      for (let i = 0; i < estetica.length; i++) {
        if (estetica[i].categoria == cat) {
          servicios[j] = estetica[i];
          j++;
        }
      }
      setFEstetica(servicios);
      console.log(fEstetica);
    }
  }, [filtrosEstetica]);

  const [toggleState, setToggleService] = useState(1);
  const [color1, setColor1] = useState("#80B5B0");
  const [color2, setColor2] = useState("#FCEAEC");
  const [color3, setColor3] = useState("#FCEAEC");
  const [color4, setColor4] = useState("#FCEAEC");
  let i = 0;

  const toggleService = (index) => {
    if (index === 1) {
      setColor1("#80B5B0");
      setColor2("#FCEAEC");
      setColor3("#FCEAEC");
      setColor4("#FCEAEC");
      setToggleService(index);
    } else if (index === 2) {
      setColor2("#80B5B0");
      setColor1("#FCEAEC");
      setColor3("#FCEAEC");
      setColor4("#FCEAEC");
      setToggleService(index);
    } else if (index === 3) {
      setColor3("#80B5B0");
      setColor1("#FCEAEC");
      setColor2("#FCEAEC");
      setColor4("#FCEAEC");
      setToggleService(index);
    } else if (index === 4) {
      setColor4("#80B5B0");
      setColor1("#FCEAEC");
      setColor2("#FCEAEC");
      setColor3("#FCEAEC");
      setToggleService(index);
    }
  };
  return (
    <>
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
            /*onClick={toggleSoon}*/
            className="font-[ABeeZee] font-bold px-10 py-1 rounded-full"
          >
            Favoritos
          </button>
          <button
            style={{ backgroundColor: color4 }}
            onClick={() => toggleService(4)}
            /*onClick={toggleSoon}*/
            className="font-[ABeeZee] font-bold px-10 py-1 mx-3 rounded-full"
          >
            Descuentos
          </button>
        </div>
        <div className={toggleState === 1 ? "block" : "hidden"}>
          {spa.length != 0 ? (
            <div className="mt-4 flex flex-wrap justify-center">
              {filtrosSpa.map((button, index) => (
                <button
                  className={`text-sm ring-1 ring-[#EB5765] rounded-full px-4 py-2 m-2 ${
                    button.checked ? "bg-[#F6ABB0]" : "bg-white"
                  }`}
                  key={index}
                  onClick={() => handleBSClick(index)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          ) : (
            <div />
          )}
          <Carrusel id={id} servicios={fSpa} next={next} update={changeSt} />
        </div>
        <div className={toggleState === 2 ? "block" : "hidden"}>
          {estetica.length != 0 ? (
            <div className="mt-4 flex flex-wrap justify-center">
              {filtrosEstetica.map((button, index) => (
                <button
                  className={`text-sm ring-1 ring-[#EB5765] rounded-full px-4 py-2 m-2 ${
                    button.checked ? "bg-[#F6ABB0]" : "bg-white"
                  }`}
                  key={index}
                  onClick={() => handleBEClick(index)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          ) : (
            <div />
          )}

          <Carrusel
            id={id}
            servicios={fEstetica}
            next={next}
            update={changeSt}
          />
        </div>
        <div className={toggleState === 3 ? "block" : "hidden"}>
          <Carrusel
            id={id}
            servicios={favoritos}
            next={next}
            update={changeSt}
          />
        </div>
        <div className={toggleState === 4 ? "block" : "hidden"}>
          <Carrusel
            id={id}
            servicios={descuentos}
            next={next}
            update={changeSt}
          />
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
};

export default AgendarServicios;
