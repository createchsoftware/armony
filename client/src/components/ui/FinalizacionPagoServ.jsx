const FinalizacionPagoServ = ({ next }) => {
  var servicios = JSON.parse(localStorage.getItem("citas")) || [];
  console.log(localStorage.getItem("citas"));
  // let total;
  // let puntos;
  // const setTotal = () => {
  //   total = 0;
  //   for (let i = 0; i < servicios.length; i++) {
  //     total += servicios[i].precioServicio;
  //   }
  //   puntos = parseFloat(total) / 10;
  // };
  // Calcular subTotal
  const subTotal = servicios
    .reduce((acc, item) => acc + Number(item.precioServicio) * 1, 0)
    .toFixed(2);

  // Calcular IVA
  // const ivaTotal = (parseFloat(subTotal) * 0.08).toFixed(2);

  // // Calcular total
  // const total = (parseFloat(subTotal) + parseFloat(ivaTotal)).toFixed(2);

  // Calcular puntos
  var puntos = JSON.parse(localStorage.getItem("puntos")) || [];

  //En caso de ser Socio VVV
  //const puntos = (parseInt(totalIva))/5;
  let sm = "sesiones";
  return (
    <>
      <div className="grid">
        <h1 className="justify-self-center text-2xl px-8 border-b-2 border-b-[#ec5766] font-bold mb-10">
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
                return (
                  <div key={servicio.nombreServicio}>
                    <div className="grid grid-cols-3 my-5 place-items-center">
                      <p className="text-center">{servicio.nombreServicio}</p>
                      <p className="text-center">
                        {servicio.sesiones} {sm}
                      </p>
                      <p className="text-center">${servicio.precioServicio}</p>
                    </div>
                    <div className="flex-grow border-b-2 border-[#ec5766] mx-5" />
                  </div>
                );
              })}
              <div className="shadow-md w-[18rem] py-3 my-5 ml-[21rem] h-auto border-2 rounded-md border-gray">
                <div className="grid grid-cols-2 overflow-hidden place-items-center">
                  <p>Total + IVA</p>
                  <p className="text-[rgb(3,109,99)] font-bold">${subTotal}</p>
                </div>
              </div>
            </div>
            {/* Botones */}
            <div>
              <div className="flex justify-end mb-4 mr-8">
                <p className="text-[#056761] text-xl">
                  Puntos obtenidos: {parseInt(puntos)}
                </p>
              </div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => next()}
                  className="bg-[#ec5766] text-white px-10 py-2 mr-10 rounded-full duration-200 hover:bg-[#ffb5a7]"
                >
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
