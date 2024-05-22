var servicios = [
  { id: 1, nombre: "Facial", sesiones: 3, total: 1700 },
  { id: 2, nombre: "Maquillaje", sesiones: 6, total: 2400 },
  { id: 3, nombre: "Depilación", sesiones: 1, total: 1500 },
];

const FinalizacionPagoServ = () => {
  let total;
  const setTotal = () => {
    total = 0;
    for (let i = 0; i < servicios.length; i++) {
      total += servicios[i].total;
    }
  };
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
              {servicios.map((servicio) => {
                if (servicio.sesiones === 1) {
                  sm = "sesión";
                } else {
                  sm = "sesiones";
                }
                setTotal();
                return (
                  <div>
                    <div className="grid grid-cols-3 my-5 place-items-center">
                      <p>{servicio.nombre}</p>
                      <p>
                        {servicio.sesiones} {sm}
                      </p>
                      <p>${servicio.total}</p>
                    </div>
                    <div className="flex-grow border-b-2 border-[#ec5766] mx-5" />
                  </div>
                );
              })}
              <div className="shadow-md w-[15rem] my-5 ml-[22rem] h-auto border-2 border-gray">
                <div className="grid grid-cols-2  place-items-center">
                  <p>Total</p>
                  <p className="text-[rgb(3,109,99)] font-bold">${total}</p>
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
