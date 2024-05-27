import React, { useState } from 'react';

function Paquete({ paquetes }) {
    const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
    const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);

    const handleClickPackage = (index) => {
        setSelectedPackageIndex(index);
    }

    const handleClickPrice = (packageIndex, priceIndex, event) => {
        if (selectedPackageIndex === packageIndex && selectedPriceIndex === priceIndex) {
            // Desmarcar si el mismo precio se selecciona de nuevo
            setSelectedPackageIndex(null);
            setSelectedPriceIndex(null);
        } else {
            setSelectedPackageIndex(packageIndex);
            setSelectedPriceIndex(priceIndex);
        }
    }
    const getPackageClass = (index) => {
        if (selectedPackageIndex === null) {
            // Cuando ninguno está seleccionado, todos están activos sin opacidad reducida.
            return 'hover:cursor-pointer flex justify-between rounded-full';
        } else if (selectedPackageIndex === index) {
            // El seleccionado no tiene opacidad reducida.
            return 'hover:cursor-pointer bg-slate-100 flex justify-between rounded-full';
        } else {
            // Los no seleccionados tienen opacidad reducida.
            return 'flex justify-between opacity-30';
        }
    }
    const getPriceClass = (priceIndex) => {
        let baseClass = "p-2 border-2  border-black rounded-full cursor-pointer shadow-[0_0px_5px_rgb(0,0,0,0.2)] shadow-purple-600 hover:bg-slate-50";
        if (selectedPriceIndex == priceIndex) {
            return `${baseClass} opacity-30`;
        }
        return baseClass;
    }

    return (
        paquetes.map((paquete, packageIndex) => (
            <div key={packageIndex} className={getPackageClass(packageIndex)} onClick={() => handleClickPackage(packageIndex)}>
                <div className="grid items-center w-1/2 place-items-center">
                    <h2>{paquete.nombre}</h2>
                    <div className="px-4 py-2 border-2 border-black rounded-full shadow-[0_0px_5px_rgb(0,0,0,0.2)] cursor-pointer shadow-purple-600 md:py-4 md:w-full hover:bg-slate-50 text-center">{paquete.descripcion}</div>
                </div>
                {paquete.precios.map((precio, priceIndex) => (
                    <div key={priceIndex} className="grid place-items-center">
                        <div className={getPriceClass(packageIndex, priceIndex)} onClick={(e) => handleClickPrice(packageIndex, priceIndex, e)}>
                            {'$ ' + precio}
                        </div>
                    </div>
                ))}
            </div>
        ))
    );
}

export default Paquete;
