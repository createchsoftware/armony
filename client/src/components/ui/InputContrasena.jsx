import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputContrasena = ({props}) =>{
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const toggleEye = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

    return(
        <>
            <a className={props.classEye}>
              <FontAwesomeIcon id="eye" icon={icon} onClick={toggleEye} />
            </a>
            <input
                className={props.class}
                type={type}
                id="pass"
                name="pass"
                placeholder={props.texto}
            />
        </>
    )
}

export default InputContrasena;