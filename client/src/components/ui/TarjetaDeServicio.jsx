import { useState } from "react";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { IoIosInformationCircle } from "react-icons/io";
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

const TarjetaDeServicio = ({ servicio }) => {
  const [vista, setVista] = useState("foto");
  if (vista === "foto") {
  }

  return (
    <div className="w-[17rem] mt-5">
      <div className="w-[16rem] h-[18rem] mb-4 mx-auto">
        <img
          src={servicio.img}
          alt=""
          className="relative w-full h-full rounded-[2.25rem]"
        />
      </div>
      <IoIosInformationCircle
        className="relative float-right -top-[18rem] right-5"
        style={{ fontSize: "32px", color: "#A0A0A0" }}
      />
      <div className="w-[13rem] h-[10rem] mx-auto bg-rose-100 rounded-3xl ring-1 ring-rose-300 py-3">
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
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </Box>
        <p className="text-lg font-bold pl-5 w-[80%]">{servicio.nombre}</p>
        <p className="text-base pl-5">Costo: ${servicio.precio}</p>
        <p className="text-base pl-5">Duracion: {servicio.duracion} min</p>
        <div className="grid place-items-center">
          <Rating
            className=""
            value={servicio.rating}
            readOnly
            unratedColor="amber"
            ratedColor="amber"
          />
        </div>
        <button className="bg-red-50 font-bold px-10 py-1 mx-10 rounded-xl ring-1 ring-rose-50 hover:ring-black">
          Elegir
        </button>
      </div>
    </div>
  );
};

export default TarjetaDeServicio;
