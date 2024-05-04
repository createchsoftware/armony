import left from "../../../public/pictures/decoArmony1.png";
import center from "../../../public/pictures/logofooter.png";
import right from "../../../public/pictures/rightfooter.png";

const FooterSecuendario = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="ml-0 mr-auto mb-0">
        <img src={left} alt="" className="h-[8rem] md:h-[10rem]" />
      </div>
      <div className="mx-auto my-auto">
        <img src={center} alt="" className="h-[5rem] md:h-[7rem]" />
      </div>
      <div className="ml-auto mr-0 mb-0">
        <img src={right} alt="" className="h-[8rem] md:h-[10rem]" />
      </div>
    </div>
  );
};

export default FooterSecuendario;
