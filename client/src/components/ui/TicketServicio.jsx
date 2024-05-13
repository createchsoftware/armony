import { QrCode } from "react-qr-code";

const TicketServicio = () => {
  var numTicket = 123456;
  var value = "lo que sea";
  return (
    <>
      <div className="grid">
        <h1 className="justify-self-center text-2xl px-8  border-b-2 border-b-[#ec5766] font-bold mb-10">
          Ticket
        </h1>
        <div className="flex justify-between mx-16">
          <div className="rounded-xl shadow-md w-[45%] border-2 border-gray">
            <div className="grid bg-[rgb(3,109,99)] rounded-t-xl">
              <p className="py-2 text-lg text-white justify-self-center">
                Ticket #{numTicket}
              </p>
            </div>
            <h1>¡Tu cita se ha generado exitosamente!</h1>
            <div className="ring-1 ring-rose-300">
              <QrCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={value}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketServicio;
