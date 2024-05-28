import Carousel from "react-multi-carousel";
import Tarjeta from "./TarjetaDeServicio.jsx";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowProps } from 'react-multi-carousel/lib/types'
import { faDiamond, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CarruselServicios = ({ servicios, next }) => {
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
      customLeftArrow={<FontAwesomeIcon
        icon={faAngleLeft}
        size="lg"
        className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 -left-0 text-3xl text-primary-900 aspect-square bg-[#e6e6e6] rounded-full text-[#036C65] p-3 hover:opacity-90 overflow-visible z-10"
      />}
      customRightArrow={<FontAwesomeIcon
        size="lg"
        icon={faAngleRight}
        className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 -right-0 text-3xl text-primary-900 bg-[#e6e6e6] rounded-full aspect-square text-[#036C65] p-3 hover:opacity-90 overflow-visible z-10"
      />}
    // className=''
    >
      {servicios.map((servicio) => (
        <Tarjeta servicio={servicio} next={next} />
      ))}
    </Carousel>
  );
};

export default CarruselServicios;
