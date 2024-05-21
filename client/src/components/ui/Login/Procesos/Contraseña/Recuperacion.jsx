import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import user1 from "../../../../../../public/pictures/userCl.png";
import Pasos from "../../../PasosDeProcesos.jsx";
import Soon from "../../../Proximamente";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Recuperacion = () => {

  const [state, setState] = useState(false);
  const [m1, setM1] = useState( "Ingresa tu correo asociado a tu cuenta para restablecer tu contraseña");
  const [m4, setM4] = useState("Restablecer mediante telefono");


  const [lada, setLada] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo,setCorreo] = useState("");

  function ChangeLada(evento){
    setLada(evento.target.value);
  }

  function ChangeTelefono(evento){
    setTelefono(evento.target.value);
  }

  function ChangeCorreo(evento){
    setCorreo(evento.target.value);
  }



  function returnTel_Mail(){
    if(state){
      return (
        <>
          <label htmlFor="">Lada de tu pais</label>
          <label htmlFor="" className="text-red-800">
            *
          </label>
          <input
            id="lada"
            type="text"
            placeholder='Ej: +52'
            className="bg-slate-200 md:text-sm lg:text-base rounded-full w=[18rem] md:w-96 mb-1 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
            value={lada}
            onChange={ChangeLada}
          />
          <label htmlFor="">Numero de 10 digitos</label>
          <label htmlFor="" className="text-red-800">
              *
          </label>
          <input
            id="telefono"
            type="text"
            placeholder='Ej: 6861234567'
            className="bg-slate-200 md:text-sm lg:text-base rounded-full w=[18rem] md:w-96 mb-1 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
            value={telefono}
            onChange={ChangeTelefono}
          />
        </>
      )
    }
    else{
      return (
        <>
          <label htmlFor="">correo eletronico</label>
          <label htmlFor="" className="text-red-800">
              *
          </label>
          <input
            id="correo"
            type="text"
            placeholder='Ej: cliente@armony.com'
            className="bg-slate-200 md:text-sm lg:text-base rounded-full w=[18rem] md:w-96 mb-1 mt-2 mx-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent px-6"
            value={correo}
            onChange={ChangeCorreo}
          />
        </>
      )
    }
    
  }



  const toogleState = () => {
    setState(!state);

    if (state === true) {
      setM1(
        "Ingresa tu correo asociado a tu cuenta para restablecer tu contraseña"
      );
      setM4("Restablecer mediante telefono");
    } 
    else {
      setM1(
        "Ingresa tu telefono asociado a tu cuenta para restablecer tu contraseña"
      );
      setM4("Restablecer mediante correo");
    }
    
  };


  async function Call_Backend(){

    let cuerpo = {};

    if(state){
      // telefono activado
      setCorreo('');
      cuerpo.type='telefono';
      cuerpo.lada = lada;
      cuerpo.telefono=telefono;
    }
    else{
      // correo activado
      setLada('');
      setTelefono('');
      cuerpo.type='correo';
      cuerpo.correo=correo;
    }

    
    

    const respuesta = await fetch('/api/recuperacion/paso1',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(cuerpo)
    });

    if(!respuesta.ok){
      console.log('hubo un problema en la comunicacion back con front');
      return;
    }

    const respuestaJson = await respuesta.json();

    if(respuestaJson.faltantes){
      let faltantes = respuestaJson.faltantes;

      faltantes.forEach((faltante)=>{
        console.log(`Te falto llenar el dato ${faltante}`);
      });

      return;
    }

    if(respuestaJson.invalidos){
      let invalidos = respuestaJson.invalidos;

      invalidos.forEach((invalido)=>{
        console.log(`El campo ${invalido} no es valido`);
      });
      return;
    }

    if(respuestaJson.redirect){
      window.location.href = respuestaJson.redirect;
    }


  }

  


  return (
    <div>
      <HelmetProvider>
          <Helmet>
              <script src="../../../scripts/cancelar_recuperacion.js"></script>
          </Helmet>
      </HelmetProvider>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="justify-center items-center mt-[6rem] mb-[6rem] md:mt-[5rem] md:mb-2 lg:mt-[8rem] lg:mb-4">
        <div className="h-[25rem] w-[25rem] md:h-[24rem] lg:h-[29rem] md:w-[37rem] lg:w-[45rem] flex flex-col rounded-xl ring-1 ring-slate-200 bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
          <div className="relative w-[6rem] h-[6rem] lg:w-[7rem] lg:h-[7rem] mx-auto -mt-20 grid place-items-center overflow-hidden rounded-full bg-white bg-clip-border shadow-lg">
            <img src={user1} alt="" className="logo1 absolute h-full" />
          </div>
          <h1 className="mx-auto pt-8 pb-4 md:p-5 lg:p-7 text-rose-400 text-2xl md:text-3xl lg:text-4xl">
            Restablecer contraseña
          </h1>
          <Pasos
            props={{
              paso1: "Recuperación",
              paso2: "Verificación",
              paso3: "Nueva Contraseña",
              paso4: "Confirmación",
            }}
            index={1}
          />
          <div className="absolute mt-5">
            <a className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
          </div>
          <h2 className="grid place-items-center mx-4 my-2 md:my-4 lg:my-6 md:text-sm lg:text-base">
            {m1}
          </h2>
          <form action="" className="mx-auto md:text-sm lg:text-base">
            {
              returnTel_Mail()
            }
          </form>
          <div className="relative flex py-2 place-items-center mx-auto w-2/5">
            <div className="flex-grow border-t border-gray-400 pl-5 mx-0"></div>
            <span className="flex-shrink mx-4 text-gray-400 md:text-sm lg:text-base">
              o
            </span>
            <div className="flex-grow border-t border-gray-400 pr-5 mx-0"></div>
          </div>
          <a
            onClick={toogleState}
            className="text-teal-700 md:text-sm lg:text-base text-center"
          >
            {m4}
          </a>
          <div className="grid grid-cols-2 my-auto">
            <div className="grid place-content-start ml-8">
              
                <button
                  id="cancelar"
                  aria-label="Cancelar"
                  className="bg-white text-rose-400 md:text-large lg:text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-50 ring-2 ring-rose-400"
                >
                  Cancelar
                </button>
              
            </div>
            <div className="grid place-content-end mr-8">
                <button
                  id='continuar'
                  aria-label="Continuar"
                  onClick={Call_Backend}
                  className="bg-rose-400 text-white md:text-large lg:text-xl rounded-full px-4 py-2 mx-auto hover:bg-red-200"
                >
                  Continuar
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recuperacion;
