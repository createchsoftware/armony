import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AiOutlineShoppingCart } from "react-icons/ai";
import PopupServicio from "./PopupServicio";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function Servicio({
  nombre,
  descripcion,
  espDesc1,
  espDesc2,
  precio,
  imagen,
  rating,
  isFavorite,
}) {
  return (
    <>
      <div className="grid gap-4 text-center m-4 md:m-8">
        <div
          className="p-6"
          style={{
            backgroundImage: `url('${imagen}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "20rem",
            backgroundcolor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Box
            className="relative right"
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <div className="object-bottom">
              <div className="grid grid-cols-[auto_70%_auto]">
                <div>
                  <AiOutlineShoppingCart
                    style={{ fontSize: "28px", color: "#000000" }}
                  />
                </div>
                <div></div>
                <div className="">
                  <StyledRating
                    name="customized-color"
                    defaultValue={isFavorite ? 1 : 0}
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
              </div>
            </div>
          </Box>
          <h1 className="font-extrabold text-white mt-3">{nombre}</h1>
          <p className="mt-6 font-light text-justify text-white">
            {descripcion.length > 60
              ? descripcion.substring(0, 40) + "..."
              : descripcion}
          </p>
        </div>
        <div className="grid gap-2">
          <div className="flex gap-4 m-auto">
            <img className="w-6" src="../../../pictures/precio.png" alt="" />
            <p> ${precio} MXN</p>
          </div>
          <Rating
            className="m-auto"
            value={rating}
            unratedColor="amber"
            ratedColor="amber"
            readonly
          />
          <PopupServicio
            datos={{
              nombre: nombre,
              espDesc1: espDesc1,
              espDesc2: espDesc2,
              precio: precio,
              img: imagen,
              rating: rating,
            }}
            actionElement={
              <button className=" transition-all duration-300  m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200">
                <span>Ver más</span>
                <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            }
          />
        </div>
      </div>
    </>
  );
}

export default Servicio;
