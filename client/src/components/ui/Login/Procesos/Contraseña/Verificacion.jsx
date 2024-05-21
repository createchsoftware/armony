import user1 from "../../../../../../public/pictures/userCl.png";
import Pasos from "../../../PasosDeProcesos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from 'react'; // Solo necesitas esta línea de importación

const Verificacion = () => {

  let only_number = /[\d ]/;

  const [cd1,setCD1] = useState('');
  const [cd2,setCD2] = useState('');
  const [cd3,setCD3] = useState('');
  const [cd4,setCD4] = useState('');
  const [cd5,setCD5] = useState('');
  const [cd6,setCD6] = useState('');

  function ChangeCD1(evento){
    let introducir = evento.target.value;
    let l = introducir.length;
    if(l > 1) {  introducir = introducir.slice(0, -(l-1)); }

    if(only_number.test(introducir)){ 
      setCD1(introducir);
    }
  }

  function ChangeCD2(evento){
    let introducir = evento.target.value;
    let l = introducir.length;
    if(l > 1) {  introducir = introducir.slice(0, -(l-1)); }

    if(only_number.test(introducir)){ 
      setCD2(introducir);
    }
  }

  function ChangeCD3(evento){
    let introducir = evento.target.value;
    let l = introducir.length;
    if(l > 1) {  introducir = introducir.slice(0, -(l-1)); }

    if(only_number.test(introducir)){ 
      setCD3(introducir);
    }
  }

  function ChangeCD4(evento){
    let introducir = evento.target.value;
    let l = introducir.length;
    if(l > 1) {  introducir = introducir.slice(0, -(l-1)); }

    if(only_number.test(introducir)){ 
      setCD4(introducir);
    }
  }

  function ChangeCD5(evento){
    let introducir = evento.target.value;
    let l = introducir.length;
    if(l > 1) {  introducir = introducir.slice(0, -(l-1)); }

    if(only_number.test(introducir)){ 
      setCD5(introducir);
    }
  }

  function ChangeCD6(evento){
    let introducir = evento.target.value;
    let l = introducir.length;
    if(l > 1) {  introducir = introducir.slice(0, -(l-1)); }

    if(only_number.test(introducir)){ 
      setCD6(introducir);
    }
  }


  async function recibido(){

    let respuesta = await fetch("/api/recuperacion/paso2_enviar",{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      }
    })

    if(!respuesta.ok){
      return;
    }

    let respuestaJson = await respuesta.json();

    //caso de que se haya o no enviado el correo/SMS
    if(respuestaJson.mensaje){
      console.log(respuestaJson.mensaje);
      return;
    }

    // caso ya se habia acompletado este paso
    if(respuestaJson.codigo){
      setCD1(respuestaJson.codigo[0]);
      setCD2(respuestaJson.codigo[1]);
      setCD3(respuestaJson.codigo[2]);
      setCD4(respuestaJson.codigo[3]);
      setCD5(respuestaJson.codigo[4]);
      setCD6(respuestaJson.codigo[5]);
      return;
    }

    // caso el usuario ni deberia estar aqui
    if(respuestaJson.redirect){
      window.location.href = respuestaJson.redirect;
    }

  }


  async function procesar(){

    let codigo_toSend = cd1+cd2+cd3+cd4+cd5+cd6;

    let respuesta = await fetch("/api/recuperacion/paso2_procesar",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        codigo:codigo_toSend
      })
    })

    if(!respuesta.ok){
      return;
    }

    let respuestaJson = await respuesta.json();

    // en caso de que el SMS o el correo aun no se le han enviado, y este ya quiere procesar un codigo, tambien puede haber un mensaje si el codigo fue incorrecto
    if(respuestaJson.mensaje){
      console.log(respuestaJson.mensaje);
    }

    // en caso de que deba ser redireccionado al paso 1, o en caso de haber ya acompletado el paso, si le pica a continuar, simplemente lo redireccionara al paso 3, si es su primera vez y pone bien el codigo, tambien lo reidreccionara
    if(respuestaJson.redirect){
      window.location.href = respuestaJson.redirect;
    }
  }

  
  
  useEffect(()=>{
    recibido();
  }, []);



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
          />
          {/*<div className="grid grid-cols-[50px_auto_20px_50px_auto_20px_50px_auto_20px_50px_auto] place-items-center px-5 mx-auto">
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
              Recuperación
            </a>
            <div className="flex-grow border-t border-[#036C65] pl-4 mx-0"></div>
            <span className="">
              <FontAwesomeIcon
                style={{ fontSize: "16px", color: "#FFFFFF" }}
                icon={fa2}
                className="relative left-6 bottom-2"
              />
              <FontAwesomeIcon
                style={{ fontSize: "36px", color: "#036C65" }}
                icon={faCircle}
              ></FontAwesomeIcon>
            </span>
            <a
              href=""
              style={{
                fontFamily: "ABeeZee",
                color: "#036C65",
              }}
              className="text-base mx-1"
            >
              Verificación
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
              Nueva Contraseña
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
              Confirmación
            </a>
            </div>*/}
          <div className="absolute mt-5">
            <a className="ml-3">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Regresar
            </a>
          </div>
          <h2 className="grid place-items-center mx-4 my-2 md:mt-4 lg:mt-6 md:text-sm lg:text-base text-center md:text-left">
            {" "}
            {/* Hacer que el correo del texto se funcional */}
            Ingrese el código de verificación enviado a cl******my.com para
            continuar con el proceso
          </h2>
          <form action="" className="flex mx-auto text-4xl">
            <input
              id="cd-1"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
              value={cd1}
              onChange={ChangeCD1}
            />
            <input
              id="cd-2"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
              value={cd2}
              onChange={ChangeCD2}
            />
            <input
              id="cd-3"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
              value={cd3}
              onChange={ChangeCD3}
            />
            <input
              id="cd-4"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
              value={cd4}
              onChange={ChangeCD4}
            />
            <input
              id="cd-5"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
              value={cd5}
              onChange={ChangeCD5}
            />
            <input
              id="cd-6"
              type="text"
              placeholder="0"
              className="bg-slate-200 w-[3rem] md:w-[3.5rem] lg:w-16 h-[3.75rem] md:h-[4rem] lg:h-[4.5rem] rounded-xl mb-5 mt-2 mx-2 md:mx-3 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent text-center"
              value={cd6}
              onChange={ChangeCD6}
            />
          </form>
          <button
            onClick={recibido}
            className="text-teal-700 md:text-sm lg:text-base text-center"
          >
            Reenviar código de verificación
          </button>
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
                  onClick={procesar}
                  aria-label="Continuar"
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

export default Verificacion;
