import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AiOutlineShoppingCart } from "react-icons/ai";
import PopupServicio from "./PopupServicio";
import PopupLogin from "./Login/PopupLogin";
import { Navigate, useNavigate } from "react-router-dom";
import duo from "../../../img/servicios/facialexfoliacion.jpg.png";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function Servicio({
  idUser,
  pkIdPS,
  nombre,
  descripcion,
  tiempo,
  precio,
  imagen,
  valoracion,
  favorito,
  log,
  st,
}) {
  const [login, setLogin] = useState(false);
  const [serv, setServ] = useState(false);
  const data = {
    idUser: idUser,
    id: pkIdPS,
    nombre: nombre,
    descripcion: descripcion,
    tiempo: tiempo,
    precio: precio,
    img: imagen,
    valoracion: valoracion,
    favorito: favorito,
  };
  const [pData, setPData] = useState(data);
  const [fav, setFav] = useState(favorito);

  const navigate = useNavigate();

  const toggleLogin = () => {
    setLogin(!login);
  };
  const toggleServ = () => {
    if (log == true) {
      setPData(data);
      setServ(!serv);
      localStorage.setItem("step1", true);
      localStorage.setItem("servicio", pkIdPS);
      localStorage.setItem("precio", precio);
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("descripcion", descripcion);
      localStorage.setItem("tiempo", tiempo);
      localStorage.setItem("imagen", imagen);
      window.location.href = "/spa/agendar";
    } else {
      setPData(data);
      setServ(!serv);
      setLogin(!login);
    }
  };
  const closeServ = () => {
    setPData(data);
    setServ(!serv);
  };
  const [favorites, setFavorites] = useState({});

  const callFav = async () => {
    try {
      console.log("no deberia entrar");
      const respuesta = await fetch("/api/admin/productos/setFavorito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idUser,
          idPS: pkIdPS,
          estado: favorito,
        }),
      });

      let respuestaJson = await respuesta.json();
      if ((await respuestaJson[0].res) == true) {
        setFav(!fav);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (fav !== favorito) {
      st();
    }
  }, [fav]);

  const toggleFavorite = async (idProducto) => {
    console.log("entrando a toggleFavorite", idProducto);

    // Verificar si el producto ya está en favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const estaEnFavoritos = favoritos.some(
      (fav) => fav.pkIdPS === idProducto.id
    );

    // Actualizar el estado de favoritos en React
    setFavorites((prev) => ({
      ...prev,
      [idProducto.id]: !estaEnFavoritos,
    }));

    if (!estaEnFavoritos) {
      // Agregar el producto con pkIdPS al localStorage
      const nuevoFavorito = { ...idProducto, pkIdPS: idProducto.id };
      favoritos.push(nuevoFavorito);
    } else {
      // Eliminar el producto del localStorage
      favoritos = favoritos.filter((fav) => fav.pkIdPS !== idProducto.id);
    }

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  };

  return (
    <>
      <div
        onLoad={() => console.log(favorito)}
        className="grid gap-4 m-4 text-center md:m-8"
      >
        <div
          className="relative p-6 mx-auto rounded-lg aspect-square"
          style={{
            backgroundImage: `url(${imagen})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maxWidth: "25rem",
            maxHeight: "14rem",
          }}
        >
          <div className="absolute inset-0 bg-black rounded-lg opacity-25"></div>
          <div className="relative top-[9rem]">
            {/* <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <div className="object-bottom">
                <div className="grid place-content-end">
                  <StyledRating
                    onClick={() => callFav()}
                    name="customized-color"
                    defaultValue={fav}
                    max={1}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={
                      <FavoriteBorderIcon
                        style={{ color: "#3F3F3F" }}
                        fontSize="inherit"
                      />
                    }
                  />
                </div>
              </div>
            </Box> */}
            {log ? (
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <div className="object-bottom">
                  <div className="grid place-content-end">
                    <StyledRating
                      name="customized-color"
                      max={1}
                      // value={uid ? (producto.favorito || favorites[producto.pkIdPS]) ? 1 : 0 : JSON.parse(localStorage.getItem("favoritos"))?.some(fav => fav.pkIdPS === producto.pkIdPS) ? 1 : 0}
                      // value={uid ? favorites[producto.pkIdPS] ? 1 : 0 : JSON.parse(localStorage.getItem("favoritos"))?.some(fav => fav.pkIdPS === producto.pkIdPS) ? 1 : 0}
                      getLabelText={(value) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={1}
                      defaultValue={fav}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      onClick={() => callFav()}
                    />
                  </div>
                </div>
              </Box>
            ) : (
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <div className="object-bottom">
                  <div className="grid place-content-end">
                    <StyledRating
                      name="customized-color"
                      max={1}
                      value={
                        localStorage.getItem("favoritos")
                          ? JSON.parse(localStorage.getItem("favoritos")).some(
                              (fav) => fav.pkIdPS === pkIdPS
                            )
                            ? 1
                            : 0
                          : favorites[pkIdPS]
                          ? 1
                          : 0
                      }
                      // value={favorites[producto.pkIdPS] ? 1 : 0}
                      getLabelText={(value) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={1}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      onChange={() => toggleFavorite(data)}
                    />
                  </div>
                </div>
              </Box>
            )}
          </div>
          <div className="relative bottom-[2rem]">
            <h1 className="mt-3 font-extrabold text-white">{nombre}</h1>
            <p className="mt-6 font-light text-justify text-white">
              {descripcion.length > 60
                ? descripcion.substring(0, 40) + "..."
                : descripcion}
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex gap-4 m-auto">
            <img className="w-6" src="../../../pictures/precio.png" alt="" />
            <p> ${precio} MXN</p>
          </div>
          <Rating
            className="m-auto"
            value={valoracion}
            unratedColor="amber"
            ratedColor="amber"
            readOnly
          />
          <button
            onClick={closeServ}
            className="transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"
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
      </div>
      {login && <PopupLogin cerrar={toggleLogin} />}
      {serv && (
        <PopupServicio
          datos={pData}
          cerrar={closeServ}
          check={toggleServ}
          update={setPData}
          st={st}
        />
      )}
    </>
  );
}

export default Servicio;
