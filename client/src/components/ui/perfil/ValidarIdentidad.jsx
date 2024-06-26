import InputContrasena from "../InputContrasena";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft , faCircleExclamation, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

const ValidarIdentidad = ({ volver, close, next }) => {

  const [valor,setValor] = useState('');


  function cambio(evento){
    setValor(evento.target.value);
  }

  async function validar(){
    const respuesta = await fetch('/api/validarIdentidad',{
      method:'POST',
      headers:{
          "Content-Type":'application/json',
      },
      body:JSON.stringify({
          password:valor
      })
    })

    if(!respuesta.ok){
        return;
    }

    const respuestaJson = await respuesta.json();

    if(respuestaJson.vacio){
      toast(<div>{`${respuestaJson.vacio}`}<FontAwesomeIcon icon={faCircleExclamation} /></div>);
      return;
    }


    if(respuestaJson.incorrecto){
      setValor('');
      toast(<div>{`${respuestaJson.incorrecto}`}<FontAwesomeIcon icon={faCircleXmark} /></div>);
      return;
    }

    if(respuestaJson.redirect){
        window.location.href = respuestaJson.redirect;
    }

    if(respuestaJson.next){
      next();
    }
  }




  return (
    <>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[25rem] w-[25rem] md:h-[24rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="absolute mt-5">
            <a onClick={volver} className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Volver
            </a>
          </div>
          <h1 className="mx-auto mt-[1rem] pt-8 pb-4 md:p-5 lg:p-7 text-[#EB5765] text-2xl md:text-3xl lg:text-4xl font-bold">
            Validar Identidad
          </h1>
          <div className="border-b-2 border-[#848894] mx-12 md:mx-24" />
          <h2 className="grid place-items-center text-center mx-10 my-2 md:my-5 lg:my-7 md:text-sm lg:text-base">
            Por seguridad, tiene que ingresar su contraseña para verificar que
            usted es dueño de esta cuenta.
          </h2>
          <form action="" className="mx-auto my-[1rem] md:text-sm lg:text-base">
            <div className="ml-4">
              <label htmlFor="">Ingrese su contraseña</label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <InputContrasena
                id={'contraseña-inicial'}
                value={valor}
                onChange={cambio}
                texto= "Ingresa tu contraseña"
                className=
                  "bg-slate-200 md:text-sm lg:text-base rounded-full w=[15rem] md:w-96 mb-3 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#EB5765] focus:border-transparent px-6"
                classEye=
                  "relative float-right justify-end right-[3rem] top-[1rem] cursor-pointer"
              
            />
          </form>
          <div className="grid grid-cols-2 my-auto">
            <div className="grid place-content-start ml-8">
              
                <button
                  aria-label="Cancelar"
                  onClick={close}
                  className="bg-[#D9D9D9] text-[#EB5765] md:text-large lg:text-xl rounded-full w-[7rem] py-2 mx-auto hover:bg-[#EEEEEE]"
                >
                  Cancelar
                </button>
              
            </div>
            <div className="grid place-content-end mr-8">
              
                <button
                  onClick={validar}
                  aria-label="Continuar"
                  className="bg-[#EB5765] text-white md:text-large lg:text-xl rounded-full w-[7rem] py-2 mx-auto hover:bg-red-200"
                >
                  Listo
                </button>
              
            </div>
          </div>
        </div>
        <ToastContainer position={'bottom-right'} theme={'light'} />
      </div>
    </>
  );
};

export default ValidarIdentidad;
