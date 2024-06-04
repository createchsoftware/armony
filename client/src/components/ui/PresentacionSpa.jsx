import presentacion from "../../../public/pictures/presentacionspa.png";
import spavista from "../../../public/pictures/spavista.png";

function PresentacionSpa() {
  return (
    <>
      <div className="md:h-20 h-[3.75rem] bg-white" />
      <div className="w-full">
        <div
          style={{
            backgroundImage: `url(${spavista})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "40rem",
          }}
          className="flex flex-col justify-center w-full"
        >
          <h1 className="text-4xl md:text-6xl text-center font-[ILoveGlitter] text-[#FFFFFF]">
            Servicios de Spa
          </h1>
          <div className="grid grid-cols-2 mt-10 place-items-center">
            <div className="w-[14rem] md:w-[30rem] bg-white bg-opacity-50 rounded-xl text-center">
              <p className="text-[#036C65] text-3xl md:text-5xl my-5 mx-8 text-justify">
                Deja que tu piel hable por tí
              </p>
              <p className="text-[#FFFFFF] text-large md:text-2xl my-5 ml-8 mr-10 text-justify">
                Deja que tu silueta sea tu legado
              </p>
              <a
                href="#serv"
                className="inline-block bg-[#EB5765] text-white text-large rounded-full px-4 py-3 mx-auto my-5 hover:bg-red-200"
                aria-label="Ver más"
              >
                Ver tratamientos
              </a>
            </div>
            <div className="w-full my-auto text-center">
              <div className="flex flex-col w-[14rem] md:w-[30rem] bg-white bg-opacity-50 rounded-xl mx-auto">
                <p className="text-[#036C65] text-2xl md:text-4xl my-3 md:my-5 mx-8 text-justify">
                  ¡Hey! También tenemos servicios de estética
                </p>
                <p className="text-[#FFFFFF] text-large md:text-2xl mb-5 ml-8 mr-10 text-left">
                  Dale un vistazo
                </p>
              </div>
              <a
                href="/spa/servicios/estetica"
                className="inline-block bg-[#036C65] text-white text-base md:text-xl rounded-full px-4 py-3 mx-auto my-5 hover:bg-teal-600"
                aria-label="Ir a estética"
              >
                Ver servicios de estética
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="my-28">
        <div
          className="p-4 bg-gradient-to-r w-2/3 md:w-1/3 from-[#FAD0C4] to-[#FF9A9E] rounded-r-full left-0 z-100"
          id="info"
        >
          <h1 className=" text-4xl md:text-6xl font-[iloveglitter] text-[#036C65]">
            En armony spa...
          </h1>
        </div>
        <div className="selection:text-white selection:bg-[#EB5765] m-auto w-[70%] grid place-content-center ">
          <div className="items-center gap-0 text-center md:grid md:grid-cols-2 place-content-center">
            <div className="md:p-16 bg-gradient-[#F6EECF] mt-0  from-[#F6EECF] to-[#DDF3FA] rounded-xl">
              <p className="font-[abeatbyKai] mt-6  md:text-2xl text-[rgb(3,108,101)]">
                Explora nuestro sitio y descubre cómo podemos ayudarte en lo que
                deseas encontrar dentro del spa.
              </p>
              <p className="font-[abeatbyKai] mt-6  md:text-4xl text-[rgb(255,88,110)]">
                Tu salud es nuestra prioridad número uno.
              </p>
            </div>
            <img src={presentacion} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PresentacionSpa;
