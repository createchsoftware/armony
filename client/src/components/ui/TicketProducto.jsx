import { useState } from "react";
import Soon from "./Proximamente";
import QrCode from "react-qr-code";
import { FaWhatsapp } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";

const TicketProducto = () => {
  const [soon, setSoon] = useState(false);

  localStorage.removeItem('cartItems');

  const toggleSoon = () => {
    setSoon(!soon);
  };
  var value = localStorage.getItem('idventaProduct')

  var onImageDownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <>
      <div className="grid items-center content-center m-auto font-bold place-items-center">
        <h1 className="justify-self-center text-2xl px-8 border-b-2 border-b-[#ec5766] font-bold mb-10">
          Ticket
        </h1>
        <div className="flex justify-center mx-16">
          <div className="border-2 shadow-md rounded-xl border-gray">
            <div className="grid bg-[rgb(3,109,99)] rounded-t-xl">
              <p className="py-2 text-lg text-white justify-self-center">
                Ticket #{value}
              </p>
            </div>
            <h1 className="mt-8 mb-4 mx-[10rem]">
              ¡Tu compra se ha realizado exitosamente!
            </h1>
            <div className="ring-4 ring-rose-200 mx-[10rem]">
              <QrCode
                id="QRCode"
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
              <button
                onClick={toggleSoon}
                className="flex py-3 justify-center w-[10rem] h-[3rem] rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.8)] text-sm font-[ABeeZee]"
              >
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
              <button
                onClick={onImageDownload}
                className="flex py-3 justify-center w-[10rem] h-[3rem] rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.8)] text-sm font-[ABeeZee]"
              >
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
      {soon && (
        <div className="soon-fondo">
          <div className="soon-fx" onClick={toggleSoon}>
            <Soon />
          </div>
        </div>
      )}
    </>
  );
};

export default TicketProducto;
