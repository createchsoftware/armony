import React, { useState, useEffect } from 'react';
import Paginacion from '../ui/Paginacion';
import Paquete from '../ui/Paquete';

function ContenedorPaquetes({ paquetes }) {
    // const [products2, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paquetesPerPage] = useState(4); // Cambia esto según la cantidad de productos por página que desees mostrar    

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         // Suponiendo que tienes un endpoint API que soporta la paginación
    //         // Ejemplo: `/api/products?page=${currentPage}&limit=${productsPerPage}`
    //         const response = await fetch(`/api/products?page=${currentPage}&limit=${productsPerPage}`);
    //         const data = await response.json();
    //         setProducts(data.products); // Asegúrate de que la respuesta tenga este formato
    //     };

    //     fetchProducts();
    // }, [currentPage, productsPerPage]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         // Carga de datos desde un archivo JSON local
    //         const response = await fetch('../../data/productos.json');
    //         const data = await response.json();
    //         const indexOfLastProduct = currentPage * productsPerPage;
    //         const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    //         const currentProducts = data.products.slice(indexOfFirstProduct, indexOfLastProduct);
    //         setProducts(currentProducts); // Ajusta los productos a los que corresponden a la página actual
    //     };

    //     fetchProducts();
    // }, [currentPage, productsPerPage]);

    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

    if (!paquetes || paquetes.length === 0) return <p className='m-auto'>No se encontraron paquetes disponibles</p>;

    const lastPostIndex = currentPage * paquetesPerPage;
    const firstPostIndex = lastPostIndex - paquetesPerPage;
    const currentPaquetes = paquetes.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='grid w-full gap-2 '>
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