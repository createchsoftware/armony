import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputContrasena = ({ id, value, onChange, texto, className, classEye }) =>{
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
            <a className={classEye}>
              <FontAwesomeIcon id="eye" icon={icon} onClick={toggleEye} />
            </a>
            <input
                className={className}
                type={type}
                id={id}
                value={value}
                name="pass"
                placeholder={texto}
                onChange={onChange}
            />
        </>
    )
}

export default InputContrasena;