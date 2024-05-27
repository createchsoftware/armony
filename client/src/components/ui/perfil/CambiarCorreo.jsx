import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft , faCircleExclamation, faCircleXmark, faRedo} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


const cambiarCorreo = ({ volver, close, next }) => {

  const [correo_anterior, setCorreo_anterior] = useState('');
  const [correo_nuevo, setCorreo_nuevo] = useState('');


  function cambiarCA(evento){
    setCorreo_anterior(evento.target.value);
  }

  function cambiarCN(evento){
    setCorreo_nuevo(evento.target.value);
  }

  async function validarCorreo(){

    const respuesta = await fetch('/api/validarCorreo',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        correo_anterior:correo_anterior,
        correo_nuevo:correo_nuevo
      })
    })

    if(!respuesta.ok){
      return;
    }

    const respuestaJson = await respuesta.json();

    if(respuestaJson.vacios){
      let av = respuestaJson.vacios;

      for(let i in av){
        toast(<div>{`${av[i]}`}<FontAwesomeIcon icon={faCircleExclamation} /></div>);
      }

      return;
    }

    if(respuestaJson.incorrectos){
      let ai = respuestaJson.incorrectos;

      for(let i in ai){

        if(ai[i][0] == 0){
          setCorreo_anterior('');
        }
        else{
          setCorreo_nuevo('');
        }

        toast(<div>{`${ai[i][1]}`}<FontAwesomeIcon icon={faCircleXmark} /></div>);
      }

      return;
    }

    if(respuestaJson.reintento){
      setCorreo_anterior('');
      setCorreo_nuevo('');
      toast(<div>{`${respuestaJson.reintento}`}<FontAwesomeIcon icon={faRedo} /></div>);
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
        <div className="h-[30rem] w-[25rem] md:h-[25rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="absolute mt-5">
            <a onClick={volver} className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Volver
            </a>
          </div>
          <h1 className="mx-auto mt-[1rem] pt-8 pb-4 md:p-4 lg:p-6 text-[#EB5765] text-2xl md:text-3xl lg:text-4xl font-bold">
            Cambiar correo electrónico
          </h1>
          <div className="border-b-2 border-[#848894] mx-12 md:mx-24" />
          <h2 className="grid place-items-center text-center mx-10 mt-2 md:mt-4 lg:mt-6 md:text-sm lg:text-base">
            Por seguridad, tiene que ingresar el correo electrónico que tiene
            vinculado a la cuenta de Armony para verificar su identidad.
          </h2>
          <form action="" className="mx-auto my-[1rem] md:text-sm lg:text-base">
            <div className="ml-4">
              <label htmlFor="">Correo electrónico actual</label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <input
              id="email"
              type="text"
              value={correo_anterior}
              onChange={cambiarCA}
              placeholder="Ingresa su correo electónico actual"
              className="bg-slate-200 md:text-sm lg:text-base rounded-full w=[18rem] md:w-96 mb-1 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
            />
            <div className="ml-4 mt-3">
              <label htmlFor="">Nueva dirección de correo electrónico</label>
              <label htmlFor="" className="text-red-800">
                *
              </label>
            </div>
            <input
              id="email"
              type="text"
              value={correo_nuevo}
              onChange={cambiarCN}
              placeholder="Ingresa el nuevo correo electónico"
              className="bg-slate-200 md:text-sm lg:text-base rounded-full w=[18rem] md:w-96 mb-1 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
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
                  aria-label="Continuar"
                  onClick={validarCorreo}
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

export default cambiarCorreo;
