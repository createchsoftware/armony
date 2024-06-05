import user1 from "../../../public/pictures/1cafeteria.jpg";
import camara from "../../../public/pictures/2wellness.jpg";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  faCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../../txt.css";
import LayoutPrincipal from "../../layouts/LayoutPrincipal";

const EditarPerfil = ({ usuario }) => {
  async function checkLogin() {
    let respuestaJson = null;
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      respuestaJson = await respuesta.json();

      if (respuestaJson.logueado != true) {
        window.location.href = "/spa";
      }
    } catch (error) {
      window.location.href = "/spa";
    }
  }

  useEffect(() => checkLogin(), []);

  const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
  const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION
  const [apellidoP, setPaterno] = useState(false); //<<< PARA EL INICIO DE SESION
  const [apellidoM, setMaterno] = useState(false); //<<< PARA EL INICIO DE SESION
  const [codigoP, setPostal] = useState(false); //<<< PARA EL INICIO DE SESION
  const [telefono, setTelefono] = useState(false); //<<< PARA EL INICIO DE SESION
  const [calle, setCalle] = useState(false); //<<< PARA EL INICIO DE SESION
  const [numero, setNumero] = useState(false); //<<< PARA EL INICIO DE SESION
  const [colonia, setColonia] = useState(false); //<<< PARA EL INICIO DE SESION
  const [fechaNac, setNacimiento] = useState(false); //<<< PARA EL INICIO DE SESION
  const [imagen, setImagen] = useState(false); //<<< PARA EL INICIO DE SESION
  const [clave, setClave] = useState(false); //<<< PARA EL INICIO DE SESION
  const [dia, setDia] = useState(false); //<<< PARA EL INICIO DE SESION
  const [mes, setMes] = useState(false); //<<< PARA EL INICIO DE SESION
  const [año, setAño] = useState(false); //<<< PARA EL INICIO DE SESION
  const [lada, setLada] = useState(false); //<<< PARA EL INICIO DE SESION
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          if (file.type.startsWith('image/')) {
            setImagen(file);
            setError('');
          } else {
            event.target.value = null;
            setImagen(null);
            setError('Por favor, selecciona solo archivos de imagen.');
          }
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imagen) {
      console.log(imagen);
    } else {
      setError('Por favor, selecciona un archivo de imagen válido.');
    }
  };

  async function recibido() {
    const respuesta = await fetch("/api/logueado", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      setNombre(null);
      setCorreo(null);
      setPaterno(null);
      setMaterno(null);
      setTelefono(null);
      setPostal(null);
      setNumero(null);
      setCalle(null);
      setColonia(null);
      setNacimiento(null);
      setImagen(null);
      setLada(null);
    }

    let respuestaJson = await respuesta.json();

    if (respuestaJson.logueado == true) {
      setClave(respuestaJson.clave);
      setNombre(respuestaJson.nombre);
      setCorreo(respuestaJson.email);
      setPaterno(respuestaJson.apellidoP);
      setMaterno(respuestaJson.apellidoM);
      setPostal(respuestaJson.codigoP);
      setNumero(respuestaJson.numero);
      setCalle(respuestaJson.calle);
      setColonia(respuestaJson.colonia);
      setNacimiento(respuestaJson.fechaNac);
      setImagen(respuestaJson.imagen);


      let tel = respuestaJson.telefono;

      if(tel.startsWith('1')){
        setLada(tel.slice(0,-(tel.length-1)));
        setTelefono(tel.slice(1));
      }
      else{
        setLada(tel.slice(0,-(tel.length-2)));
        setTelefono(tel.slice(2));
      }



      let birthday = respuestaJson.fechaNac.split("-");

      setDia(birthday[2]);
      setMes(birthday[1]);
      setAño(birthday[0]);
    } else {
      setNombre(null);
      setCorreo(null);
      setPaterno(null);
      setMaterno(null);
      setTelefono(null);
      setPostal(null);
      setNumero(null);
      setCalle(null);
      setColonia(null);
      setNacimiento(null);
      setImagen(null);
      setLada(null);
    }
  }

  const handleGuardar = () => {
    window.location.href = '/perfil/informacion'
  }

  useEffect(() => {
    recibido();
  }, []);

  return (
    <LayoutPrincipal>
      <main className="w-[80%] m-auto grid justify-between mt-20 mb-12">
        <div className="flex w-[60%] my-6 justify-self-center items-center shadow-lg rounded-xl border">
          <a href='/perfil/informacion' className="flex gap-2 my-4 w-max items-center ml-6 text-black relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold">
            <FontAwesomeIcon
              style={{ fontSize: "22px" }}
              icon={faAngleLeft}
            />{" "}
            Volver
          </a>
          <div className="flex-glow"></div>
          <h1 className="absolute text-3xl font-bold text-center transform -translate-x-1/2 text-rose-400 left-1/2">Editar Perfil</h1>
        </div>
        <div className="flex w-[90%] justify-self-center justify-between px-12 py-8 my-6 shadow-lg rounded-xl border">
          {/* BLOQUE INFORMACION */}
          <div className="grid w-[50%]">
            <div className="flex justify-start my-2">
              <h2 className="text-xl font-bold text-[rgb(3,109,99)]">INFORMACION PERSONAL</h2>
            </div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="">Nombre(s):</label>
              <input
                id="nombre"
                type="text"
                aria-label="Ingresa nombre."
                placeholder={`${nombre}`}
                className="w-2/3 px-6 py-1 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="">Apellido Paterno:</label>
              <input
                id="paterno"
                type="text"
                aria-label="Ingresa apellido paterno."
                placeholder={`${apellidoP}`}
                className="w-2/3 px-6 py-1 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="">Apellido Materno:</label>
              <input
                id="materno"
                type="text"
                aria-label="Ingresa apellido materno."
                placeholder={`${apellidoM}`}
                className="w-2/3 px-6 py-1 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <label htmlFor="">Lada:</label>
                <input
                  id="lada"
                  type="text"
                  maxLength={3}
                  aria-label="Ingresa LADA."
                  placeholder={`${lada}`}
                  className="w-48 px-6 py-1 mb-1 mr-24 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="">Telefono:</label>
                <input
                  id="telefono"
                  type="text"
                  maxLength={10}
                  aria-label="Ingresa teléfono."
                  placeholder={`${telefono}`}
                  className="w-48 px-6 py-1 mb-1 mr-24 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-start my-2">
              <h2 className="text-xl font-bold text-[rgb(3,109,99)]">FECHA DE NACIMIENTO</h2>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="">Día:</label>
                <input
                  id="dia"
                  type="number"
                  aria-label="Ingresa día de nacimiento."
                  min={1}
                  max={31}
                  maxLength={2}
                  placeholder={`${dia}`}
                  className="w-32 px-6 py-1 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="">Mes:</label>
                <input
                  id="mes"
                  type="number"
                  maxLength={2}
                  aria-label="Ingresa mes de nacimiento."
                  placeholder={`${mes}`}
                  className="w-32 px-6 py-1 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="">Año:</label>
                <input
                  id="año"
                  type="number"
                  maxLength={4}
                  aria-label="Ingresa año de nacimiento."
                  placeholder={`${año}`}
                  className="w-32 px-6 py-1 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
            </div>
            {/* SE ELIMINO EL CORREO ELECTRONICO DEL DISEÑO !!! < < < < < < < < < < < < < < < < < < < < < < */}
            {/* <div className="flex justify-start my-2">
              <h2 className="text-xl font-bold text-[rgb(3,109,99)]">E-MAIL</h2>
            </div>
            <input
              id="correo"
              type="email"
              aria-label="Ingresa correo electrónico"
              placeholder={`${correo}`}
              className="w-full px-6 py-1 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
            /> */}
            <div className="flex justify-start my-2">
              <h2 className="text-xl font-bold text-[rgb(3,109,99)]">DOMICILIO</h2>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <label htmlFor="">Calle:</label>
                <input
                  id="calle"
                  type="text"
                  aria-label="Ingresa calle del domicilio."
                  placeholder={`${calle}`}
                  className="w-64 px-6 py-1 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="">Colonia:</label>
                <input
                  id="colonia"
                  type="tel"
                  aria-label="Ingresa colonia de domicilio."
                  placeholder={`${colonia}`}
                  className="px-6 py-1 mb-1 mr-24 rounded-full w-52 bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <label htmlFor="">Numero:</label>
                <input
                  id="numero"
                  maxLength={5}
                  type="text"
                  aria-label="Ingresa número del domicilio."
                  placeholder={`${numero}`}
                  className="w-48 px-6 py-1 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="">Codigo Postal:</label>
                <input
                  id="codigoP"
                  type="text"
                  maxLength={5}
                  aria-label="Ingresa código postal del domicilio."
                  placeholder={`${codigoP}`}
                  className="w-32 px-6 py-1 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 my-6">
              <div className="grid place-content-start">
                <a
                  href='/perfil/informacion'
                  id="cancelar"
                  aria-label="Cancelar"
                  className="px-4 py-2 mx-auto text-xl bg-white rounded-full text-rose-400 hover:bg-red-50 ring-2 ring-rose-400"
                >
                  Cancelar
                </a>
              </div>
              
              <div className="grid place-content-end">
                <button
                  id="guardar"
                  aria-label="Continuar"
                  onClick={handleGuardar}
                  className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
                >
                  Guardar
                </button>
              </div>

              <HelmetProvider>
                <Helmet>
                  <script
                    src="https://kit.fontawesome.com/c9a65ccec4.js"
                    crossOrigin="anonymous"
                  ></script>
                  <script src="../../../scripts/editarPerfil.js"></script>
                </Helmet>
              </HelmetProvider>
            </div>
          </div>
          {/* BLOQUE DE IMAGEN */}
          <div className="grid w-1/3 gap-2 text-center place-content-start">
            <div className="flex justify-start my-2 justify-self-center">
              <h2 className="text-xl font-bold text-[rgb(3,109,99)]">FOTO DE PERFIL</h2>
            </div>
            <img
              id="subida"
              src={`../../../pictures/avatares/${imagen}`}
              className="w-48 rounded-full aspect-square shadow-2xl justify-self-center"
              alt="Foto de perfil del usuario."
            />
            <form onSubmit={handleSubmit}>
              <input 
                type="file"
                id="imagen"
                accept="image/*"
                onChange={handleFileChange}
                className="w-3/5"
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p className="text-xl text-[#ec5766] justify-self-center ">ID de Usuario</p>
            <p className="px-6 py-2 rounded-full justify-self-center bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent">{`#${clave}`}</p>
          </div>
        </div>
      </main>
      <div id="toastBox" />
    </LayoutPrincipal>
  );
};

export default EditarPerfil;
