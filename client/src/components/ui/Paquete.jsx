import React, { useState } from 'react';

function Paquete({ paquetes }) {
    const [selectedItem, setSelectedItem] = useState(null); ``

    const handleClick = (item) => {
        setSelectedItem(item);
    }

    const isDisabled = (item) => {
        return selectedItem && selectedItem !== item;
    }



    return (
        paquetes.map((paquete) => (
            <>
                <div className="flex justify-between w-full gap-8">
                    <div className="grid items-center w-1/2 place-items-center">
                        <h2>{paquete.nombre}</h2>
                        <div className="px-4 py-2 border-2 border-black rounded-full shadow-[0_0px_5px_rgb(0,0,0,0.2)] cursor-pointer shadow-purple-600 md:py-4 md:w-full hover:bg-slate-50 text-center">{paquete.descripcion}</div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="grid place-items-center">
                            <div className="p-2 border-2 border-black rounded-full cursor-pointer shadow-[0_0px_5px_rgb(0,0,0,0.2)]  shadow-purple-600 hover:bg-slate-50"> {'$ ' + paquete.precio} </div>
                        </div>
                        <div className="grid place-items-center">
                            <div className="p-2 border-2 border-black rounded-full shadow-[0_0px_5px_rgb(0,0,0,0.2)] cursor-pointer shadow-purple-600 hover:bg-slate-50"> {'$ ' + paquete.precio * 5} </div>
                        </div>
                        <div className="grid place-items-center">
                            <div className="p-2 border-2 mr-12 border-black rounded-full shadow-[0_0px_5px_rgb(0,0,0,0.2)] cursor-pointer shadow-purple-600 hover:bg-slate-50"> {'$ ' + paquete.precio * 10} </div>
                        </div>
                    </div>
                </div>
            </>
        )))
}

export default Paquete;