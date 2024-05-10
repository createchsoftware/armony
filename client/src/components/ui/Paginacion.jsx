function Paginacion({ currentPage, totalProducts, productsPerPage, setCurrentPage }) {
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }


    const getButtonClassName = () => {
        return 'flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';
    }

    const getLinkClassName = (page) => {
        if (currentPage === page) {
            return 'flex items-center justify-center w-8 h-8 bg-[#036C65] text-white font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';
        } else {
            return 'flex items-center justify-center w-8 h-8 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';
        }

    }

    return (
        <nav className="m-auto mt-12">
            <ul className="flex">
                <button
                    disabled={currentPage === 1}
                    className={getButtonClassName()}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                    </svg>
                    Anterior
                </button>
                {pageNumbers.map((page, index) => (
                    <a key={index} onClick={() => setCurrentPage(page)} className={getLinkClassName(page)}>
                        {page}
                    </a>
                ))}
                <button
                    disabled={currentPage === pageNumbers.length}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={getButtonClassName()}
                    type="button">
                    Siguiente
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                    </svg>
                </button>
            </ul>
        </nav>
    );
}

export default Paginacion;