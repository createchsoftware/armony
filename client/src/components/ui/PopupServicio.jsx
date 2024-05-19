import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import { colors, styled } from "@mui/material";
import Popup from "reactjs-popup";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const PopupServicio = ({ cerrar, check, datos }) => {
  let rDesc;
  if (datos.rating > 3) {
    rDesc = "Excelente";
  } else if (datos.rating <= 3 && datos.rating > 2) {
    rDesc = "Regular";
  } else if (datos.rating <= 2) {
    rDesc = "Malo";
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <div className="relative w-[25rem] md:w-[50rem] flex flex-col rounded-3xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="grid grid-cols-[70%_30%]">
          <div>
            <div className="mt-5">
              <a
                className="ml-5 justify-self-start"
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
            <div className="mx-[4rem] text-justify">
              <p className="my-5">{datos.espDesc1}</p>
              <p className="my-5">{datos.espDesc2}</p>
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
            </div>
          </div>
          <div>
            <div className="absolute top-3 right-[1rem]">
              <StyledRating
                name="customized-color"
                defaultValue={0}
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
                height: "100%",
                backgroundcolor: "rgba(0, 0, 0, 0.6)",
              }}
              className="w-full h-full rounded-2xl"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupServicio;
