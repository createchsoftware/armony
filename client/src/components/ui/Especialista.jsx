import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import { ChevronRight } from "lucide-react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { parse } from "@fortawesome/fontawesome-svg-core";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function Especialista({ especialista }) {
  const [seleccionado, setSeleccionado] = useState(false);
  function exp(xp) {
    return xp == 1 ? xp + " año" : xp + " años";
  }

  const agregarEspe = (id, nombre) => {
    if (!seleccionado) {
      setSeleccionado(true);
      localStorage.setItem("Especialista", id);
      localStorage.setItem("NombreEspecialista", nombre);
    } else {
      alert("ya escogiste un especialista");
    }
  };

  const toggleFavorite = async (idProducto) => {
    const estaEnFavoritos = favorites[idProducto.pkIdPS];

    if (uid) {
      try {
        fetch('/api/admin/favoritos/invertirFav', {
          method: "POST",
          body: JSON.stringify({ idCliente: uid, IdProducto: idProducto.pkIdPS }),
          headers: { "Content-Type": "application/json" },
        });

        setFavorites(prev => ({
          ...prev,
          [idProducto.pkIdPS]: !estaEnFavoritos
        }));


      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      setFavorites(prev => ({
        ...prev,
        [idProducto.pkIdPS]: !estaEnFavoritos
      }));
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      const estaEnFavoritos = favoritos.some(fav => fav.pkIdPS === idProducto.pkIdPS);
      if (!estaEnFavoritos) {

        favoritos.push(idProducto);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
      } else {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        favoritos = favoritos.filter((obj) => obj.pkIdPS !== idProducto.pkIdPS);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
      }
    }
  };

  return (
    <div className="md:px-8 md:py-2 rounded-3xl font-[abeatbyKai]  w-2/3 m-auto bg-rose-200">
      <div className='flex justify-end'>
        <Box
          className="absolute z-20 flex justify-end float-right"
          sx={{
            '& > legend': { mt: 0 },
          }}
        >
          <StyledRating
            name="customized-color"
            max={1}
            value={especialista.favorito || especialista[producto.pkIdPS] ? 1 : 0}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            onChange={() => toggleFavorite(producto)}
          />
        </Box>
      </div>
      <img
        className="w-2/3 m-auto rounded-full aspect-square"
        src={especialista.img}
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
          value={Math.floor(parseFloat(especialista.valoracion))}
          unratedColor="amber"
          readOnly
          ratedColor="amber"
        />
      </div>
      {/* <p className='pt-4 text-lg font-bold'>Experta en:</p> */}
      {/* <div className='flex justify-start gap-2 m-auto'>
                {especialista.areas.map(area => (
                    <p className='gap-2 px-1 pt-2 text-center bg-white text-rose-400'>{area}</p>
                ))}
            </div> */}

      <div div className="flex justify-center mt-2">
        <button
          onClick={() => agregarEspe(especialista.ID, especialista.Nombre)}
          className="mt-2 transition-all duration-300  m-auto hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"
        >
          <span>Elegir</span>
        </button>
      </div>
    </div>
  );
}

export default Especialista;
