import React, { useState } from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const FinalizacionPagoProd = ({ producto, next }) => {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date
      .toLocaleDateString("en-CA", options)
      .replace(/,/, "")
      .replace(/(\d+\/\d+\/\d+),/, "$1");
  };

  const location = useLocation();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState(() => {
    if (producto) {
      // Si hay un producto en el prop, lo utilizamos
      return producto;
    } else {
      // Si no hay un producto en el prop, intentamos obtenerlo del localStorage
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
  });

  const subTotal = allProducts
    .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    .toFixed(2);
  const ivaTotal = (parseFloat(subTotal) * 0.08).toFixed(2);
  const total = (parseFloat(subTotal) + parseFloat(ivaTotal)).toFixed(2);

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
                Cantidad
              </p>
              <p className="py-2 text-lg text-white justify-self-center">
                Producto
              </p>
              <p className="py-2 text-lg text-white justify-self-center">
                Total
              </p>
            </div>
            {/* Contenido de los servicios pagados */}

            <div className="rounded-xl shadow-md overflow-y-auto w-[40rem] mx-auto my-5  border-2 border-gray">
              {allProducts.map((producto) => {
                return (
                  <div>
                    <div className="grid grid-cols-3 my-5 place-items-center">
                      <p className="text-center">{producto.cantidad}</p>
                      <p className="text-center">{producto.nombre}</p>
                      <p className="text-center">
                        ${producto.precio * producto.cantidad}
                      </p>
                    </div>
                    <div className="flex-grow border-b-2 border-[#ec5766] mx-5" />
                  </div>
                );
              })}
            </div>
            <div className="shadow-md w-[15rem] py-3 my-5 ml-[22rem] h-auto border-2 rounded-md border-gray">
              <div className="grid grid-cols-2 place-items-center">
                <p>Total</p>
                <p className="text-[rgb(3,109,99)] font-bold">${total}</p>
              </div>
            </div>
            {/* Botones */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div></div>
                <div className="">
                  <p>TICKET DE VENTA</p>
                  <p>{formatDate(new Date())}</p>
                  <p>¡ GRACIAS POR SU COMPRA !</p>
                </div>
                <button
                  onClick={() => next()}
                  className="bg-[#FFA3A3] text-white px-10 py-2 mr-10 rounded-full duration-200 hover:bg-[#ec5766]"
                >
                  <IoArrowForwardSharp
                    style={{ fontSize: "32px", color: "#000000" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalizacionPagoProd;
