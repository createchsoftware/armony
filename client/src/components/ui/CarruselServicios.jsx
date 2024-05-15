import Carousel from "react-multi-carousel";
import Tarjeta from "./TarjetaDeServicio.jsx";
import { useState } from "react";

const CarruselServicios = ({ servicios }) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={3000}
      centerMode={false}
      className="z-0"
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
          items: 3,
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
    // className=''
    >
      {servicios.map((servicio) => (
        <Tarjeta servicio={servicio} />
      ))}
    </Carousel>
  );
};

export default CarruselServicios;
