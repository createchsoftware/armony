import React, { useState, useEffect } from 'react';
import Paginacion from '../ui/Paginacion';
import Paquete from '../ui/Paquete';

function ContenedorPaquetes({ paquetes }) {
    // const [products2, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paquetesPerPage] = useState(4); // Cambia esto según la cantidad de productos por página que desees mostrar    

    if (!paquetes || paquetes.length === 0) return <p className='m-auto'>No se encontraron paquetes disponibles</p>;

    const lastPostIndex = currentPage * paquetesPerPage;
    const firstPostIndex = lastPostIndex - paquetesPerPage;
    const currentPaquetes = paquetes.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='grid w-full gap-10 '>
            <Paquete paquetes={currentPaquetes} />
            <Paginacion
                currentPage={currentPage}
                totalProducts={paquetes.length}
                productsPerPage={paquetesPerPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ContenedorPaquetes;