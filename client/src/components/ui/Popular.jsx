import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronRight } from "lucide-react";
import pilar1 from "../../../public/pictures/pilar1.png";
import pilar2 from "../../../public/pictures/pilar2.png";
import pilar3 from "../../../public/pictures/pilar3.png";
import pilar4 from "../../../public/pictures/pilar4.png";
import { useState } from "react";
import Soon from "./Proximamente";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

function Popular() {
  const [soon, setSoon] = useState(false);

  const toggleSoon = () => {
    setSoon(!soon);
  };
  return (
    <div className="mx-auto p-6 md:mx-28 md:p-0 selection:bg-[#EB5765] selection:text-white">
      <h1 className="text-6xl mx-14 font  text-[#036C65] mt-12 font-[iloveglitter] ">
        Lo mas popular
      </h1>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        className="z-0"
        autoPlaySpeed={3000}
        centerMode={false}
        containerclassName="container-with-dots z-0"
        dotListclassName=""
        // draggable
        focusOnSelect={false}
        infinite
        itemclassName=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderclassName=""
        slidesToSlide={1}
        swipeable
        customLeftArrow={
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="lg"
            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 left-0 text-3xl text-primary-900 aspect-square bg-[#e6e6e6] rounded-full text-[#036C65] p-4 hover:opacity-90 overflow-visible z-50"
          />
        }
        customRightArrow={
          <FontAwesomeIcon
            size="lg"
            icon={faAngleRight}
            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 right-0 text-3xl text-primary-900 bg-[#e6e6e6] rounded-full aspect-square text-[#036C65] p-4 hover:opacity-90 overflow-visible z-50"
          />
        }
      >
        <div className="grid h-full m-4 p-4 font-[abeatbyKai]">
          <div className=" h-96">
            <a href="/spa">
              <img
                className="rounded-2xl w-72 h-96 mx-auto"
                src={pilar1}
                alt="Pilar polular: Spa, Salon & Beauty"
              />
            </a>
          </div>
          <div className="flex flex-col justify-between h-52 ">
            <h6 className="text-lg font-bold text-center ">
              SPA - Masaje facial
            </h6>
            <p className="pt-2 text-center">
              Encuentra la calma en un masaje facial que renueve tu piel y
              brinda un momento de paz
            </p>
            <div className="flex justify-center mt-4">
              <a
                href="/spa"
                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
              >
                Ver más
                <ChevronRight color="#036c65" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid h-full m-4 p-4 font-[abeatbyKai]">
          <div className=" h-96">
            <img
              className="rounded-2xl w-72 h-96 mx-auto"
              src={pilar2}
              alt="Pilar popular: Cafetería."
            />
          </div>
          <div className="flex flex-col justify-between h-52 ">
            <h6 className="text-lg font-bold text-center">Cafeteria</h6>
            <p className="pt-2 text-center">
              Disfruta de cafe y snacks en nuestra cafeteria. ¡Momentos de cafe
              garantizados!
            </p>
            <div className="flex justify-center mt-4">
              <a
                onClick={toggleSoon}
                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
              >
                Ver más
                <ChevronRight color="#036c65" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid h-full m-4 p-4 font-[abeatbyKai]">
          <div className=" h-96">
            <img
              className="rounded-2xl w-72 h-96 mx-auto"
              src={pilar3}
              alt="Pilar popular: Wellness, hábitos saludables."
            />
          </div>
          {/* <div className='flex flex-col content-between justify-between h-full place-content-between place-items-center '> */}
          <div className="flex flex-col content-between justify-between h-52 place-content-between place-items-center ">
            <h6 className="text-lg font-bold text-center ">Wellness</h6>
            <p className="pt-2 text-center">
              En Wellness, cada elección es un voto a favor de tu bienestar
              fisíco, mental y emocional.
            </p>
            <div className="flex justify-center mt-4">
              <a
                onClick={toggleSoon}
                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
              >
                Ver más
                <ChevronRight color="#036c65" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid h-full m-4 p-4 font-[abeatbyKai]">
          <div className=" h-96">
            <img
              className="rounded-2xl w-72 h-96 mx-auto"
              src={pilar4}
              alt="Pilar popular: Colectivo"
            />
          </div>{" "}
          <div className="flex flex-col justify-between h-52 ">
            <h6 className="text-lg font-bold text-center ">Colectivo</h6>
            <p className="pt-2 text-center">
              Cada regalo unico expresa tu amor y crea momentos inolvidables
            </p>
            <div className="flex justify-center mt-4">
              <a
                onClick={toggleSoon}
                className="relative flex cursor-pointer  before:bg-[#036C65]  before:absolute before:-bottom-1 before:block before:h-[3px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
              >
                Ver más
                <ChevronRight color="#036c65" />
              </a>
            </div>
          </div>
        </div>
      </Carousel>
      {soon && (
        <div className="soon-fondo">
          <div className="text-black soon-fx" onClick={toggleSoon}>
            <Soon />
          </div>
        </div>
      )}
    </div>
  );
}

export default Popular;
