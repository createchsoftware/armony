import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const PasosDeProcesos = ({ props }) => {
  return (
    <div className="grid grid-cols-[50px_auto_20px_50px_auto_20px_50px_auto_20px_50px_auto] place-items-center px-5 mx-auto">
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa1}
          className="relative left-6 bottom-2"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px" }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
        }}
        className="text-base mx-2"
      >
        {props.paso1}
      </a>
      <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa2}
          className="relative left-6 bottom-2"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px" }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
        }}
        className="text-base mx-1"
      >
        {props.paso2}
      </a>
      <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa3}
          className="relative left-6 bottom-2"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px" }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
        }}
        className="text-base mx-1"
      >
        {props.paso3}
      </a>
      <div className="flex-grow border-t border-gray-400 pl-4 mx-0"></div>
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa4}
          className="relative left-6 bottom-2"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px" }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
        }}
        className="text-base mx-1"
      >
        {props.paso4}
      </a>
    </div>
  );
};

export default PasosDeProcesos;