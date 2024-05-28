import { useState } from "react";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { IoIosInformationCircle } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
//FALTA HACER FUNCIONAR 'next'
const TarjetaDeServicio = ({ servicio, next }) => {
  const [vista, setVista] = useState(false);

  const [seleccionado, setSeleccionado] = useState(false);

  function hr(hr) {
    if (hr != undefined) {
      let h = hr.charAt(1);
      if (h[0] == "0") {
        return hr + " min.";
      } else if (h[0] == "1") {
        return hr + " hr.";
      } else {
        return hr + " hrs.";
      }
    }
  }

  const agregarServ = (
    id,
    nombre,
    descripcion,
    precio,
    tiempo,
    img,
    callback
  ) => {
    if (!seleccionado) {
      setSeleccionado(true);
      localStorage.setItem("servicio", id);
      localStorage.setItem("precio", precio);
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("descripcion", descripcion);
      localStorage.setItem("tiempo", tiempo);
      localStorage.setItem("imagen", img);
      if (callback) callback();
    } else {
      alert("ya escogiste un servicio");
    }
  };

  const toogleVista = () => {
    setVista(!vista);
  };

  return (
    <div className="w-[17rem] mt-5">
      <div className={vista ? "hidden" : "block"}>
        <div className="w-[16rem] h-[18rem] mt-1 mx-auto">
          <img
            src={servicio.img}
            alt=""
            className="relative w-full h-full rounded-[2.25rem]"
          />
        </div>
        <IoIosInformationCircle
          className="relative float-right -top-[17rem] right-5"
          style={{ fontSize: "32px", color: "#A0A0A0" }}
          onClick={toogleVista}
        />
      </div>
      <div className={vista ? "block" : "hidden"}>
        <div className="w-[16rem] h-[18rem] mt-1 mx-auto rounded-[2.25rem] bg-[#499382]">
          <p className="pt-10 mx-5 text-sm text-center text-white">
            {servicio.descripcion}
          </p>
        </div>
        <FontAwesomeIcon
          style={{ fontSize: "32px" }}
          icon={faAngleLeft}
          onClick={toogleVista}
          className="relative float-right -top-[17rem] right-5"
        />
      </div>
      <div className="grid content-between w-[16rem] h-[12rem] mx-2 mb-4 bg-rose-100 rounded-3xl ring-1 ring-rose-300 py-2">
        <div>
          <Box
            className="float-right mr-2"
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <StyledRating
              name="customized-color"
              defaultValue={0}
              max={1}
              value={servicio.favorito}
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
          </Box>
          <p className="text-lg font-bold pl-5 w-[80%]">{servicio.nombre}</p>
        </div>
        <p className="pl-5 text-base">Costo: ${servicio.precio}</p>
        <p className="pl-5 text-base">Duracion: {hr(servicio.tiempo)}</p>
        <div className="grid place-items-center">
          <Rating
            className=""
            value={servicio.rating}
            readOnly
            unratedColor="amber"
            ratedColor="amber"
          />
        </div>
        <button
          onClick={() =>
            agregarServ(
              servicio.pkIdPS,
              servicio.nombre,
              servicio.descripcion,
              servicio.precio,
              servicio.tiempo,
              servicio.img,
              next
            )
          }
          className="px-10 py-1 mx-10 font-bold bg-red-50 rounded-xl ring-1 ring-rose-50 hover:ring-black"
        >
          Elegir
        </button>
      </div>
    </div>
  );
};

export default TarjetaDeServicio;
