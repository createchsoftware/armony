import LayoutPrincipal from "../../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

let pass = "contraseña123";

function TuContrasena() {
  return (
    <LayoutPrincipal>
      <main className="grid gap-6 my-24">
        <section className="rounded-2xl mt-12 w-[60%] m-auto px-6 pt-6 pb-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <a
            className="flex items-baseline content-center text-sm gap-x-4"
            href="/spa"
          >
            {" "}
            <IoIosArrowBack className="" />
            Volver
          </a>
          <img
            className="w-32 m-auto my-6 -mt-24 rounded-full aspect-square"
            src="../../pictures/contrasenaMarco.png"
            alt=""
          />
          <div className="m-auto text-center ">
            <h1 className="text-[#036C65] font-semibold text-2xl mb-2">
              Tu contraseña
            </h1>
          </div>
        </section>

        <section className="w-[60%] m-auto mt-8">
          <h2 className="text-[#036C65] text-2xl mb-4">
            Contraseña de tu cuenta Armony
          </h2>
          <div className="rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div>
              <div className="flex gap-6 mb-[1rem]">
                <h2>La contraseña que utilizas para acceder a Armony</h2>
              </div>
              <div className="flex gap-6">
                <h2 className="text-[#EB5765]">{pass}</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="w-[60%] m-auto mt-8">
          <h2 className="text-[#036C65] text-2xl mb-4">Cambiar contraseña</h2>
          <div className="rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <a
              href="/perfil/seguridad/contrasena/cambiarContrasena"
              className="flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100"
            >
              <div className="flex gap-6">
                <div>
                  <h2>Puedes cambiar de contraseña por tu seguridad</h2>
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

export default TuContrasena;
