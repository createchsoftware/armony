import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import { colors, styled } from "@mui/material";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const PopupServicio = ({ cerrar, check, datos, update, st }) => {
  const sim = [
    {
      nombre: "Cargando...",
      descripcion: "Cargando...",
      img: "",
    },
    {
      nombre: "Cargando... ",
      descripcion: "Cargando...",
      img: "",
    },
    {
      nombre: "Cargando...  ",
      descripcion: "Cargando...",
      img: "",
    },
  ];
  const [similares, setSimilares] = useState(sim);
  const [indexItem, setIndexItem] = useState(0);
  const [renderItems, setRenderItems] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`/api/admin/productos/servicios/relacionados/${datos.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los servicios relacionados");
          }
          return response.json();
        })
        .then((data) => {
          setSimilares([]);
          setLoad(true);
          setSimilares(changeOrder(data));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, 3000);
  }, []);

  const changeOrder = (data) => {
    if (data.length > 3) {
      for (let i = 0; i < data.length; i++) {
        if (i < data.length - 1) {
          if (data[i].nombre == data[i + 1].nombre) {
            let j = i + 1;
            if (j + 3 < data.length) {
              let t = data[j + 3];
              data[j + 3] = data[j];
              data[j] = t;
            } else {
              let t = data[j - 3];
              data[j - 3] = data[j];
              data[j] = t;
            }
          }
        }
      }
    }
    return data;
  };

  let rDesc;
  if (datos.rating > 3) {
    rDesc = "Excelente";
  } else if (datos.rating <= 3 && datos.rating > 2) {
    rDesc = "Regular";
  } else if (datos.rating <= 2) {
    rDesc = "Malo";
  }

  const checkRes = () => {
    if (window.innerWidth >= 560) {
      setRenderItems(3);
    } else {
      setRenderItems(1);
    }
  };

  useEffect(() => {
    checkRes();
  }, []);

  function changeData(update, similar) {
    if (update) update(similar);
  }

  const handleNext = () => {
    if (indexItem + renderItems < similares.length) {
      setIndexItem(indexItem + renderItems);
    }
    console.log(similares);
  };

  const handlePrevious = () => {
    if (indexItem > 0) {
      setIndexItem(indexItem - renderItems);
    }
  };

  const callFav = async () => {
    if (datos.id != 0) {
      try {
        const respuesta = await fetch("/api/admin/productos/setFavorito", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: datos.idUser,
            idPS: datos.id,
            estado: datos.favorito,
          }),
        });

        let respuestaJson = await respuesta.json();
        if ((await respuestaJson[0].res) == true) {
          st();
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
  };

  const mostrarSimilares = similares.slice(indexItem, indexItem + renderItems);

  return (
    <div
      onLoad={checkRes}
      className="fixed inset-0 z-50 justify-center overflow-hidden bg-black bg-opacity-50"
    >
      <div className="grid justify-center h-screen md:grid-cols-[auto_auto]">
        <div className="relative w-[25rem] md:w-[35rem] lg:w-[50rem] flex flex-row md:flex-col my-auto rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="grid grid-cols-[60%_40%] lg:grid-cols-[70%_30%]">
            <div>
              <div className="mt-5 ml-5">
                <a
                  className="text-sm items-center w-full lg:text-base justify-self-start relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
                  aria-label="Regresar"
                  onClick={cerrar}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: "22px" }}
                    icon={faAngleLeft}
                  />{" "}
                  Regresar
                </a>
              </div>
              <h1 className="p-3 md:p-4 text-[#EB5765] text-3xl text-center">
                {datos.nombre}
              </h1>
              <div className="mx-[2rem] lg:mx-[4rem] text-justify">
                <p className="my-5">{datos.descripcion}</p>
                {/*<p className="my-5">{datos.espDesc2}</p>*/}
                <div className="flex">
                  <p className="mr-2">Precio:</p>
                  <p className="text-[#036C65]">{datos.precio} MXN</p>
                </div>
                <div className="flex">
                  <p className="mr-2">Calificación de los clientes:</p>
                  <p className="text-[#036C65]">{rDesc}</p>
                </div>
                <div className="grid place-items-center">
                  <Rating
                    className="my-2"
                    value={datos.rating}
                    unratedColor="amber"
                    ratedColor="amber"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid mt-3 mb-6 place-items-center">
                <button
                  onClick={check}
                  className=" transition-all duration-300  m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"
                >
                  <span>Registrar cita</span>
                  <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
            </div>
            <div>
              <div className="absolute top-3 right-[1rem]">
                <StyledRating
                  onClick={callFav}
                  name="customized-color"
                  defaultValue={datos.favorito}
                  max={1}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  precision={1}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={
                    <FavoriteBorderIcon
                      style={{ color: "black" }}
                      fontSize="inherit"
                    />
                  }
                />
              </div>
              <div
                style={{
                  backgroundImage: `url('${datos.img}')`,
                  backgroundRepeat: "no-repeat",
                  objectFit: "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  backgroundcolor: "rgba(0, 0, 0, 0.6)",
                }}
                className="w-full h-full rounded-2xl bg-center"
              ></div>
            </div>
          </div>
        </div>
        <div className="relative w-[25rem] md:w-[20rem] lg:w-[25rem] my-auto flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md md:ml-[1rem] lg:ml-[4rem]">
          <h1 className="px-3 pt-3 md:px-4 md:pt-4 text-[#036C65] text-2xl text-center font-bold">
            Servicios similares
          </h1>
          <div className={indexItem > 0 ? "block mx-auto" : "hidden"}>
            <button
              onClick={handlePrevious}
              disabled={indexItem === 0}
              className="bg-[#D9D9D9] rounded-full p-1"
            >
              <FaChevronUp style={{ color: "#036C65", fontSize: "24px" }} />
            </button>
          </div>
          {mostrarSimilares
            /*.filter(
              (similar, index, self) =>
                index === self.findIndex((t) => t.pkIdPS === similar.pkIdPS)
            )*/
            .map((similar) => (
              <div key={similar.nombre}>
                <div className="grid grid-cols-[auto_auto]">
                  <div
                    className={
                      load
                        ? "w-[8rem] h-[8rem] md:w-[6rem] md:h-[6rem] lg:w-[8rem] lg:h-[8rem] m-[0.5rem]"
                        : "loader mx-auto my-auto"
                    }
                  >
                    <img
                      src={similar.img}
                      alt=""
                      className={
                        load
                          ? "block w-full h-full ml-4 rounded-2xl bg-center"
                          : "hidden"
                      }
                    />
                  </div>
                  <div className="grid my-auto ml-8">
                    <p className="text-[#EB5765] text-lg md:text-base lg:text-lg truncate">
                      {similar.nombre}
                    </p>
                    <p className="my-2 mr-12 text-base md:text-sm lg:text-base font-light text-justify">
                      {similar.descripcion.length > 60
                        ? similar.descripcion.substring(0, 40) + "..."
                        : similar.descripcion}
                    </p>
                    <div className="mb-2">
                      <button
                        onClick={() => changeData(update, similar)}
                        disabled={
                          similar.descripcion === "Cargando..." ? true : false
                        }
                        className=" transition-all duration-300  m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 md:h-8 lg:h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"
                      >
                        <span>Ver </span>
                        <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                  </div>
                </div>
              </div>
            ))}
          <div
            className={
              similares.length - indexItem > renderItems
                ? "block mx-auto"
                : "hidden"
            }
          >
            <button
              onClick={handleNext}
              disabled={indexItem + renderItems >= similares.length}
              className="bg-[#D9D9D9] rounded-full p-1"
            >
              <FaChevronDown style={{ color: "#036C65", fontSize: "24px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupServicio;
