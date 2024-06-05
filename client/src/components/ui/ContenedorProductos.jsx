import React, { useState, useEffect } from 'react';
import Productos from '../ui/Productos';
import Paginacion from '../ui/Paginacion';

function ContenedorProductos({ products, st, log, idUser }) {
    // const [products2, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12); // Cambia esto según la cantidad de productos por página que desees mostrar    

    if (!products || products.length === 0) return <p className='m-auto'>No se encontraron productos</p>;

    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    const currentProducts = products.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='grid  w-[100%] gap-2 place-content-center '>
            <Productos productos={currentProducts} st={st} log={log} idUser={idUser} />
            <Paginacion
                currentPage={currentPage}
                totalProducts={products.length}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ContenedorProductos;