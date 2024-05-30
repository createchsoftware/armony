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

    const subTotal = localStorage.getItem('totalSuscripcion');
    const puntos = localStorage.getItem('puntosSuscripcion');
    const ivaTotal = (parseFloat(subTotal) * 0.08).toFixed(2);
    const total = (parseFloat(subTotal) + parseFloat(ivaTotal)).toFixed(2);

    console.log(subTotal);
    console.log(puntos);
    console.log(ivaTotal);
    console.log(total);


    return (
        <>
            <div className="grid">
                <h1 className="justify-self-center text-2xl px-8 mb-4 border-b-2 border-b-[#ec5766] font-bold">
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

                        <div className="rounded-xl shadow-md overflow-y-auto w-[40rem] mx-auto my-5 h-[10rem] border-2 border-gray">
                            <div>
                                <div className="grid grid-cols-3 my-5 place-items-center">
                                    <p className="text-center">{1}</p>
                                    <p className="text-center">{'Suscripción'}</p>
                                    <p className="text-center">
                                        ${total + ' MXN'}
                                    </p>
                                </div>
                                <div className="flex-grow border-b-2 border-[#ec5766] mx-5" />
                            </div>
                            <div>
                                <div className="grid grid-cols-2 my-5 place-items-center place-content-between">
                                    <p className="text-center text-[#056761]">{'Puntos obtenidos:'}</p>
                                    <p className="text-center text-[#056761]">
                                        ${puntos}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-grow border-b-2 border-[#ec5766] mx-5" />
                        </div>
                        <div className="shadow-md w-[15rem] py-3 my-5 ml-[22rem] h-auto border-2 rounded-md border-gray">
                            <div className="grid grid-cols-2 place-items-center">
                                <p>Total</p>
                                <p className="text-[rgb(3,109,99)] font-bold">${total}</p>
                            </div>
                        </div>
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
                    {/* Botones */}
                </div>
            </div>
        </>
    );
};

export default FinalizacionPagoProd;
