import QrCode from "react-qr-code";
import { FaWhatsapp } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";

const TicketServicio = () => {
  var numTicket = 123456;
  var value = "lo que sea";
  return (
    <>
      <div className="grid items-center content-center m-auto place-items-center font-bold">
        <h1 className="justify-self-center text-2xl px-8 border-b-2 border-b-[#ec5766] font-bold mb-10">
          Ticket
        </h1>
        <div className="flex justify-center mx-16">
          <div className="border-2 shadow-md rounded-xl border-gray">
            <div className="grid bg-[rgb(3,109,99)] rounded-t-xl">
              <p className="py-2 text-lg text-white justify-self-center">
                Ticket #{numTicket}
              </p>
            </div>
            <h1 className="mt-8 mb-4 mx-[10rem]">
              ¡Tu cita se ha generado exitosamente!
            </h1>
            <div className="ring-4 ring-rose-200 mx-[10rem]">
              <QrCode
                size={256}
                style={{
                  height: "20rem",
                  maxWidth: "100%",
                  width: "20rem",
                  padding: "10px",
                }}
                value={value}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="grid grid-cols-2 m-8 place-items-center">
              <button className="flex py-3 justify-center w-[10rem] h-[3rem] rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.8)] text-sm font-[ABeeZee]">
                Enviar por{" "}
                <FaWhatsapp
                  style={{
                    color: "#25D366",
                    fontSize: "20px",
                    marginLeft: "0.5rem",
                  }}
                />
              </button>
              {/*<button>Escanear QR </button>*/}
              <button className="flex py-3 justify-center w-[10rem] h-[3rem] rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.8)] text-sm font-[ABeeZee]">
                Guardar QR{" "}
                <CiSaveDown2
                  style={{
                    color: "#919191",
                    fontSize: "20px",
                    marginLeft: "0.5rem",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketServicio;
