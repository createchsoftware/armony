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
    }

    let respuestaJson = await respuesta.json();

    if (respuestaJson.logueado == true) {
      setClave(respuestaJson.clave);
      setNombre(respuestaJson.nombre);
      setCorreo(respuestaJson.email);
      setPaterno(respuestaJson.apellidoP);
      setMaterno(respuestaJson.apellidoM);
      setTelefono(respuestaJson.telefono);
      setPostal(respuestaJson.codigoP);
      setNumero(respuestaJson.numero);
      setCalle(respuestaJson.calle);
      setColonia(respuestaJson.colonia);
      setNacimiento(respuestaJson.fechaNac);
      setImagen(respuestaJson.imagen);

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
    }
  }

  useEffect(() => {
    recibido();
  }, []);

  return (
    <LayoutPrincipal>
      <main className="w-[80%] m-auto  flex justify-between mt-20 mb-12">
        <div className="w-2/3 p-8 my-6 shadow-lg rounded-xl">
          <div className="flex gap-56 my-6">
            <a href={document.referrer} className="">
              <FontAwesomeIcon
                style={{ fontSize: "22px" }}
                icon={faAngleLeft}
              />{" "}
              Volver
            </a>
            <h1 className="text-3xl text-rose-400">Editar Perfil</h1>
          </div>
          <div className="flex justify-between">
            <h2>INFORMACION PERSONAL</h2>
          </div>
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Nombre:</label>
              <input
                id="nombre"
                type="text"
                placeholder={`${nombre}`}
                className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Apellido Paterno:</label>
            <input
              id="paterno"
              type="text"
              placeholder={`${apellidoP}`}
              className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Apellido Materno:</label>
              <input
                id="materno"
                type="text"
                placeholder={`${apellidoM}`}
                className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="">Telefono:</label>
              <input
                id="telefono"
                type="text"
                placeholder={`${telefono}`}
                className="w-48 px-6 py-2 mb-1 mr-24 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
          </div>
          <h2>FECHA DE NACIMIENTO</h2>
          <div className="flex justify-start">
            <div>
              <label htmlFor="">Dia</label>
              <input
                id="dia"
                type="number"
                min={1}
                max={31}
                placeholder={`${dia}`}
                className="w-24 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="">Mes</label>
              <input
                id="mes"
                type="number"
                placeholder={`${mes}`}
                className="w-24 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="">Año</label>
              <input
                id="año"
                type="number"
                placeholder={`${año}`}
                className="w-24 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
          </div>
          <h2>E-MAIL</h2>
          <input
            id="correo"
            type="email"
            placeholder={`${correo}`}
            className="px-6 py-2 mb-1 rounded-full w-60 bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
          />
          <h2>DOMICILIO</h2>
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Calle:</label>
              <input
                id="calle"
                type="text"
                placeholder={`${calle}`}
                className="w-48 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="">Colonia:</label>
              <input
                id="colonia"
                type="tel"
                placeholder={`${colonia}`}
                className="w-48 px-6 py-2 mb-1 mr-24 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
          </div>
          <label htmlFor="">Codigo Postal:</label>
          <input
            id="codigoP"
            type="text"
            placeholder={`${codigoP}`}
            className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
          />
          <label htmlFor="">Numero:</label>
          <input
            id="numero"
            type="text"
            placeholder={`${numero}`}
            className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
          />
          <div className="grid grid-cols-2 my-6">
            <div className="grid place-content-start">
              <button
                id="cancelar"
                aria-label="Cancelar"
                className="px-4 py-2 mx-auto text-xl bg-white rounded-full text-rose-400 hover:bg-red-50 ring-2 ring-rose-400"
              >
                Cancelar
              </button>
            </div>
            <HelmetProvider>
              <Helmet>
                <script
                  src="https://kit.fontawesome.com/c9a65ccec4.js"
                  crossorigin="anonymous"
                ></script>
                <script src="../../../scripts/editarPerfil.js"></script>
              </Helmet>
            </HelmetProvider>
            <div className="grid place-content-end">
              <button
                id="guardar"
                aria-label="Continuar"
                className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-2 text-center place-content-center">
          <img
            id="subida"
            src={`../../../pictures/avatares/${imagen}`}
            className="w-48 rounded-full shadow-2xl"
            alt=""
          />
          <input type="file" id="imagen" accept="image/*" />
          <p>ID de Usuario</p>
          <p className="px-6 py-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent">{`#${clave}`}</p>
        </div>
      </main>
      <div id="toastBox" />
    </LayoutPrincipal>
  );
};

export default EditarPerfil;
