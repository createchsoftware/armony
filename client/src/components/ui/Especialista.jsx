import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function Especialista({ especialista, especialistaSeleccionado, manejarSeleccion }) {
  const [seleccionado, setSeleccionado] = useState(false);

  useEffect(() => {
    setSeleccionado(especialista.id === especialistaSeleccionado);
  }, [especialistaSeleccionado, especialista.id]); // Dependencia actualizada

  const buttonClasses = `mt-2 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 px-6 font-[abeatbykai] text-neutral-200 ${seleccionado ? 'bg-[#036C65]' : 'bg-[#EB5765]'}`;

  function exp(xp) {
    return xp == 1 ? xp + " año" : xp + " años";
  }

  const agregarEspe = (id, nombre) => {
    // if already selected, deselect
    if (seleccionado) {
      setSeleccionado(false);
      localStorage.removeItem("Especialista");
      localStorage.removeItem("NombreEspecialista");
      return;
    }
    manejarSeleccion(id);
    setSeleccionado(true);
    localStorage.setItem("Especialista", id);
    localStorage.setItem("NombreEspecialista", nombre);
  };

  return (
    <div className="md:px-8 md:py-2 rounded-3xl font-[abeatbyKai] ring-1 w-2/3 m-auto bg-rose-200">
      <Box
        className="float-right"
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
      <img
        className="w-1/2 m-auto rounded-full aspect-square"
        src={especialista.imagen}
        alt=""
      />
      <p className="pt-4 text-lg font-bold text-center">
        {especialista.Nombre}
      </p>
      <p className="pt-4 text-lg font-bold text-center">
        Experiencia: {exp(especialista.experiencia)}
      </p>
      <div className="flex justify-center w-1/2 pt-4 m-auto">
        <Rating
          className=""
          value={5}
          unratedColor="amber"
          readOnly
          ratedColor="amber"
        />
      </div>

      <div div className="flex justify-center mt-2">
        <button
          onClick={() => agregarEspe(especialista.ID, especialista.Nombre)}
          className={buttonClasses}
        >
          <span>{seleccionado ? "Seleccionado" : "Seleccionar"}</span>
        </button>
      </div>
    </div>
  );
}

export default Especialista;
