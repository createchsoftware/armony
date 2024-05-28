import LayoutPrincipal from "../../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { useState, useEffect } from "react";

function TuCorreo() {
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

  const [correo, setCorreo] = useState(false);

  async function recibido() {
    const respuesta = await fetch("/api/logueado", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      setCorreo(null);
    }

    let respuestaJson = await respuesta.json();

    if (respuestaJson.logueado == true) {
      setCorreo(respuestaJson.email);
    } else {
      setCorreo(null);
    }
  }

  useEffect(() => {
    recibido();
  }, []);

  return (
    <LayoutPrincipal>
      <main className="grid gap-6 my-24">
        <section className="rounded-2xl mt-12 w-[60%] m-auto px-6 pt-6 pb-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <a
            className="flex items-baseline content-center text-sm gap-x-4"
            href="/perfil/seguridad"
          >
            {" "}
            <IoIosArrowBack className="" />
            Volver
          </a>
          <img
            className="w-32 m-auto my-6 -mt-24 rounded-full aspect-square"
            src="../../pictures/correoMarco.png"
            alt=""
          />
          <div className="m-auto text-center ">
            <h1 className="text-[#036C65] font-semibold text-2xl mb-2">
              Tu correo electrónico
            </h1>
          </div>
        </section>

        <section className="w-[60%] m-auto mt-8">
          <h2 className="text-[#036C65] text-2xl mb-4">
            Dirección de correo electrónico de tu cuenta Armony
          </h2>
          <div className="rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div>
              <div className="flex gap-6 mb-[1rem]">
                <h2>
                  La dirección que se utiliza para que tú y Armony identifiquen
                  tu cuenta
                </h2>
              </div>
              <div className="flex gap-6">
                <h2 className="text-[#EB5765]">{correo}</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="w-[60%] m-auto mt-8">
          <h2 className="text-[#036C65] text-2xl mb-4">
            Cambiar correo electrónico
          </h2>
          <div className="rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <a
              href="/perfil/seguridad/correo/cambiarCorreo"
              className="flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100"
            >
              <div className="flex gap-6">
                <div>
                  <h2>Puedes actualizar tu correo para mejor accesibilidad</h2>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <MdNavigateNext />
              </div>
            </a>
          </div>
        </section>
      </main>
    </LayoutPrincipal>
  );
}

export default TuCorreo;
