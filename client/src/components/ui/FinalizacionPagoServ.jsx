const servicios = [
  { id: 1, nombre: "Facial", sesiones: 3, total: 1700 },
  { id: 2, nombre: "Maquillaje", sesiones: 6, total: 2400 },
  { id: 3, nombre: "Depilación", sesiones: 3, total: 1500 },
];

const lista = servicios.map((servicio) => {
  <div>
    <div className="grid grid-cols-3">
      <p>{servicio.nombre}</p>
      <p>{servicio.sesiones} sesiones</p>
      <p>{servicio.precio}</p>
    </div>
    <div className="flex-grow border-t border-[#ec5766]" />
  </div>;
});
const FinalizacionPagoServ = () => {
  let sm = "sesiones";
  return (
    <>
      <div className="grid">
        <h1 className="justify-self-center text-2xl px-8  border-b-2 border-b-[#ec5766] font-bold mb-10">
          Finalización de pago
        </h1>
        {/* Header */}
        <div className="flex justify-center mx-16">
          <div className="rounded-xl shadow-md w-[46rem] border-2 border-gray">
            <div className="grid grid-cols-3 bg-[rgb(3,109,99)] rounded-t-xl">
              <p className="py-2 text-lg text-white justify-self-center">
                Servicio
              </p>
              <p className="py-2 text-lg text-white justify-self-center">
                Sesiones
              </p>
              <p className="py-2 text-lg text-white justify-self-center">
                Total
              </p>
            </div>
            {/* Contenido de los servicios pagados */}

            <div className="rounded-xl shadow-md w-[40rem] mx-auto my-5 h-auto border-2 border-gray">
              <div>
                <div className="grid grid-cols-3 my-5 place-items-center">
                  <p>Facial</p>
                  <p>3 sesiones</p>
                  <p>1700</p>
                </div>
                <div className="flex-grow border-t border-[#ec5766]" />
              </div>
              <div>
                <div className="grid grid-cols-3 my-5 place-items-center">
                  <p>Maquillaje</p>
                  <p>6 sesiones</p>
                  <p>2400</p>
                </div>
                <div className="flex-grow border-t border-[#ec5766]" />
              </div>
              <div>
                <div className="grid grid-cols-3 my-5 place-items-center">
                  <p>Depilación</p>
                  <p>6 sesiones</p>
                  <p>1500</p>
                </div>
                <div className="flex-grow border-t border-[#ec5766]" />
              </div>
              <div className="shadow-md w-[15rem] mr-20 my-5 h-auto border-2 border-gray">
                <div className=" grid grid-cols-2 place-items-center">
                  <p>Total</p>
                  <p>$4300</p>
                </div>
              </div>
            </div>
            {/* Botones */}
            <div>
              <div className="flex justify-end mb-4">
                <button className="bg-[#ec5766] text-white px-10 py-2 mr-10 rounded-full duration-200 hover:bg-[#ffb5a7]">
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalizacionPagoServ;
