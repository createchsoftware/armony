import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
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

const TarjetaFavoritos = ({ props }) => {
  return (
    <div>
      <div>
        <img
          className="relative m-auto aspect-square w-[60%] -bottom-6"
          src={props.img}
          alt=""
        />
        <Box
          className="relative right"
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <div className="object-bottom">
            <div className="relative grid grid-cols-[15%_25%_15%] place-items-center justify-center -top-5">
              <div>
                <AiOutlineShoppingCart
                  style={{ fontSize: "28px", color: "#000000" }}
                />
              </div>
              <div></div>
              <div className="">
                <StyledRating
                  name="customized-color"
                  defaultValue={props.isFavorite ? 1 : 0}
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
      </div>
      <div className="mt-6 text-[#036C65] bg-[#E8C3C6] rounded-3xl text-md md:text-xl text-center p-2 w-2/3 m-auto flex justify-center items-center">
        {props.nombre}
      </div>
      <p className="w-2/3 text-center mx-auto mt-2">{props.descr}</p>
      <div className="grid place-items-center mt-2">
        <Rating
          className=""
          value={props.rating}
          unratedColor="amber"
          ratedColor="amber"
          readonly
        />
      </div>
      <div className="w-1/2 md:ml-[7.5vw] m-auto md:m-2 md:mt-6 text-center flex  mt-6 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40"
          height="40"
          viewBox="0 0 256 256"
          style={{ fill: "#FA5252" }}
        >
          <g
            fill="#036c65"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <g transform="scale(5.12,5.12)">
              <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24.98438,6.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v14.17383c-1.19786,0.42351 -1.99904,1.55565 -2,2.82617c0.00091,0.44693 0.10168,0.88802 0.29492,1.29102l-6.00195,6.00195c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l6.00195,-6.00195c0.403,0.19325 0.84408,0.29401 1.29102,0.29492c1.65685,0 3,-1.34315 3,-3c-0.00178,-1.2698 -0.80282,-2.40095 -2,-2.82422v-14.17578c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
            </g>
          </g>
        </svg>
        <p className="pl-6">{props.dur} min</p>
      </div>
      <div className="w-1/2  md:ml-[7vw] m-auto md:m-2 md:mt-6  text-center flex  mt-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          style={{ fill: "#036c65" }}
        >
          <path d="M 25 7 C 15.0625 7 7 15.0625 7 25 C 7 34.9375 15.0625 43 25 43 C 34.9375 43 43 34.9375 43 25 C 43 15.0625 34.9375 7 25 7 Z M 25 9 C 33.859375 9 41 16.140625 41 25 C 41 33.859375 33.859375 41 25 41 C 16.140625 41 9 33.859375 9 25 C 9 16.140625 16.140625 9 25 9 Z M 24 14 L 24 16.1875 C 22.398438 16.386719 19.5 17.789063 19.5 21.1875 C 19.5 27.585938 28.8125 24.292969 28.8125 29.09375 C 28.8125 30.695313 28.101563 32.1875 25 32.1875 C 21.898438 32.1875 21 29.800781 21 28.5 L 19 28.5 C 19.300781 32.800781 22.300781 33.792969 24 34.09375 L 24 36 L 26 36 L 26 34.09375 C 27.5 33.992188 31 32.90625 31 28.90625 C 31 25.605469 28.289063 24.695313 25.6875 24.09375 C 23.585938 23.59375 21.6875 23.101563 21.6875 21 C 21.6875 20.101563 22.09375 18.09375 25.09375 18.09375 C 27.195313 18.09375 28.199219 19.398438 28.5 21 L 30.5 21 C 29.898438 18.800781 28.898438 16.8125 26 16.3125 L 26 14 Z"></path>
        </svg>
        <p className="pl-2 md:pl-2">{props.precio} MXN</p>
      </div>
    </div>
  );
};

export default TarjetaFavoritos;
