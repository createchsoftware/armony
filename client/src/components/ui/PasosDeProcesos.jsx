import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const PasosDeProcesos = ({ props, index }) => {
  const v1 = index >= 1 ? "#036C65" : "#BFBFBF";
  const v2 = index >= 2 ? "#036C65" : "#BFBFBF";
  const v3 = index >= 3 ? "#036C65" : "#BFBFBF";
  const v4 = index >= 4 ? "#036C65" : "#BFBFBF";
  const [c1, setC1] = useState(v1);
  const [c2, setC2] = useState(v2);
  const [c3, setC3] = useState(v3);
  const [c4, setC4] = useState(v4);
  const [n1, setN1] = useState(v1);
  const [n2, setN2] = useState(index >= 2 ? v2 : "");
  const [n3, setN3] = useState(index >= 3 ? v3 : "");
  const [n4, setN4] = useState(index >= 4 ? v4 : "");
  const [l1, setL1] = useState(
    index >= 2 ? "border-[#036C65]" : "border-gray-600"
  );
  const [l2, setL2] = useState(
    index >= 3 ? "border-[#036C65]" : "border-gray-600"
  );
  const [l3, setL3] = useState(
    index >= 4 ? "border-[#036C65]" : "border-gray-600"
  );
  return (
    <div className="grid grid-cols-[50px_auto_20px_50px_auto_20px_50px_auto_20px_50px_auto] place-items-center px-5 mx-auto">
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa1}
          className="relative left-6 bottom-2"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px", color: c1 }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
          color: n1,
        }}
        className="md:text-xs lg:text-base mx-2"
      >
        {props.paso1}
      </a>
      <div className={`flex-grow border-t ${l1} pl-4 mx-0`}></div>
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa2}
          className="relative left-6 bottom-2 border-g"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px", color: c2 }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
          color: n2,
        }}
        className="md:text-xs lg:text-base mx-1"
      >
        {props.paso2}
      </a>
      <div className={`flex-grow border-t ${l2} pl-4 mx-0`}></div>
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa3}
          className="relative left-6 bottom-2"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px", color: c3 }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
          color: n3,
        }}
        className="md:text-xs lg:text-base mx-1"
      >
        {props.paso3}
      </a>
      <div className={`flex-grow border-t ${l3} pl-4 mx-0`}></div>
      <span className="">
        <FontAwesomeIcon
          style={{ fontSize: "16px", color: "#FFFFFF" }}
          icon={fa4}
          className="relative left-6 bottom-2"
        />
        <FontAwesomeIcon
          style={{ fontSize: "36px", color: c4 }}
          icon={faCircle}
        ></FontAwesomeIcon>
      </span>
      <a
        href=""
        style={{
          fontFamily: "ABeeZee",
          color: n4,
        }}
        className="md:text-xs lg:text-base mx-1"
      >
        {props.paso4}
      </a>
    </div>
  );
};

export default PasosDeProcesos;
