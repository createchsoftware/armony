import React, { useState, useEffect } from 'react';
import Productos from '../ui/Productos';
import Paginacion from '../ui/Paginacion';

function ContenedorProductos({ products }) {
    // const [products2, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8); // Cambia esto según la cantidad de productos por página que desees mostrar    

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

    if (!products || products.length === 0) return <p className='m-auto'>No se encontraron productos</p>;

    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    const currentProducts = products.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='grid  w-[80%] gap-2 place-content-center '>
            <Productos productos={currentProducts} />
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