import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ContenedorProductos from './ContenedorProductos'
//import { products } from '../../data/productos.json'
import Rating from '@mui/material/Rating';



function classNames(...clases) {
    return clases.filter(Boolean).join(' ')
}

const sortOptions = [
    { name: 'Más Relevante', current: true },
    { name: 'Más Reciente', current: false },
    { name: 'Top Ventas', current: false },
    { name: 'Precio: Bajo a Alto', current: false },
    { name: 'Precio: Alto a Bajo', current: false },
]

const subCategories = [
    {
        id: 'categoria',
        name: 'Categorias',
        options: [
            { label: 'Cosméticos', checked: false },
            { label: 'Facial', checked: false },
            { label: 'Crema', checked: false },
            { label: 'Spray', checked: false },
            { label: 'Serúm', checked: false },
            { label: 'Depilación', checked: false },
        ],
    },
]


const filters = [
    // {
    //     id: 'precio',
    //     name: 'Precio',
    //     options: [
    //         { value: 'white', label: 'Blanco', checked: false },
    //         { value: 'beige', label: 'Beige', checked: false },
    //         { value: 'blue', label: 'Azul', checked: true },
    //         { value: 'brown', label: 'Café', checked: false },
    //         { value: 'green', label: 'Verde', checked: false },
    //         { value: 'purple', label: 'Morado', checked: false },
    //     ],
    // },
    // {
    //     id: 'valoraciones',
    //     name: 'Valoraciones',
    //     options: [
    //         { value: 'new', label: 'Nuevos', checked: false },
    //         { value: 'sale', label: 'Ofertas', checked: false },
    //         { value: 'travel', label: 'Próximamente', checked: true },
    //         { value: 'organization', label: 'Organización', checked: false },
    //         { value: 'accessories', label: 'Accesorios', checked: false },
    //     ],
    // },
    {
        id: 'Marca',
        name: 'Marca',
        options: [
            { value: 'ponds', label: 'POND’S', checked: false },
            { value: 'hidraSense', label: 'Hidra Sense', checked: false },
            { value: 'savasana', label: 'Savasana', checked: false },
            { value: 'ceraVe', label: 'CeraVe', checked: false },
            { value: 'cetaphil', label: 'Cetaphil', checked: false },
            { value: 'mizon', label: 'Mizon', checked: false },
            { value: 'gojo', label: 'Gojo', checked: false },
        ],
    },
    // {
    //     id: 'masVendidos',
    //     name: 'Más Vendidos',
    //     options: [
    //         { value: '2l', label: '2L', checked: false },
    //         { value: '6l', label: '6L', checked: false },
    //         { value: '12l', label: '12L', checked: false },
    //         { value: '18l', label: '18L', checked: false },
    //         { value: '20l', label: '20L', checked: false },
    //         { value: '40l', label: '40L', checked: true },
    //     ],
    // },
]
export default function Filtros() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [sortOption, setSortOption] = useState(sortOptions[0])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [category, setCategory] = useState()
    const [search, setSearch] = useState('');
    //    const [filter, setFilter] = useState();

    //useEffect from api call
    // useEffect(() => {
    //     fetch('/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    //         .catch(err => console.log(err))
    // }, [])


    useEffect(() => {
        fetch("/api/admin/productos/getProducts")
            .then(response => response.json())
            .then(data => {
                setFilteredProducts(data);

            })
            .catch(error => {
                console.log('error', error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    /*useEffect(() => {
        let updatedProducts = products;

        // Filtrar por búsqueda
        if (search) {
            updatedProducts = updatedProducts.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Aplicar filtros adicionales
        // filters.forEach(filter => {
        //     filter.options.forEach(option => {
        //         if (option.checked) {
        //             updatedProducts = updatedProducts.filter(product =>
        //                 product[filter.id] === option.value
        //             );
        //         }
        //     });
        // });

        // Filtrar por categoría
        if (category && category.name) {
            updatedProducts = updatedProducts.filter(product =>
                product.category === category.name
            );
        }

        // Ordenar productos
        switch (sortOption.name) {
            case 'Más Popular':
                break;
            case 'Mejor Calificado':
                updatedProducts = [...updatedProducts].sort((a, b) => b.rating - a.rating);
                break;
            case 'Más Nuevo':
                updatedProducts = [...updatedProducts].sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'Precio: Bajo a Alto':
                updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
                break;
            case 'Precio: Alto a Bajo':
                updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredProducts(updatedProducts);
    }, [search, category, sortOption, products]);*/

    return (
        <div className="mt-6 bg-[#F4F1ED]">

            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-90">
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a href={category.href}
                                                        onClick={() => { setCategory(category) }}
                                                        className="block px-2 py-3 cursor-pointer">
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>


                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="px-4 py-6 border-t border-gray-200">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="flow-root -mx-2 -my-3">
                                                            <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="flex items-center ml-6">
                                                                    {open ? (
                                                                        <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon classNa me="w-5 h-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="flex-1 min-w-0 ml-3 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="grid justify-around gap-8 pt-24 pb-6 border-b border-gray-200 md:grid-cols-3 grid-cols2 ">

                        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-4xl">Filtrar por:</h1>
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                                        Ordenar por
                                        <ChevronDownIcon
                                            className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={() => { setSortOption(option) }}
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900 cursor-pointer' : 'text-gray-500',
                                                                active ? 'bg-gray-100 cursor-pointer' : 'cursor-pointer',
                                                                'block px-4 py-2 text-sm cursor-pointer'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>



                            <button type="button" className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className='max-w-md mx-auto border-gray-400 border-1'>
                            <div className="relative flex items-center w-full h-12 overflow-hidden bg-white border-b-2 rounded-lg focus-within:shadow-lg border-gray">
                                <div className="grid w-12 h-full text-gray-300 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <input
                                    className="w-full h-full pr-2 text-sm text-gray-700 outline-none peer"
                                    type="text"
                                    id="search"
                                    placeholder="Buscar..."
                                    onChange={(e) => { handleSearch(e) }}
                                />
                            </div>
                        </div>
                    </div>



                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Productos
                        </h2>

                        <div className="grid md:flex">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                {subCategories.map((section) => (
                                    <Disclosure as="div" key={section.id} className="py-6 border-b border-gray-200">
                                        {({ open }) => (
                                            <>
                                                <h3 className="flow-root -my-3">
                                                    <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="flex items-center ml-6">
                                                            {open ? (
                                                                <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (

                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>


                                            </>

                                        )}
                                    </Disclosure>
                                ))}

                                <Disclosure as="div" className="py-6 border-b border-gray-200">
                                    {({ open }) => (
                                        <>
                                            <h3 className="flow-root -my-3">
                                                <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Precio</span>
                                                    <span className="flex items-center ml-6">
                                                        {open ? (
                                                            <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">

                                                    <input id="default-range" type="range" value="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                <Disclosure as="div" className="py-6 border-b border-gray-200">
                                    {({ open }) => (
                                        <>
                                            <h3 className="flow-root -my-3">
                                                <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Valoraciones</span>
                                                    <span className="flex items-center ml-6">
                                                        {open ? (
                                                            <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">

                                                    <Rating className='m-auto' value={0} unratedColor="amber" ratedColor="amber" />

                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="py-6 border-b border-gray-200">
                                        {({ open }) => (
                                            <>
                                                <h3 className="flow-root -my-3">
                                                    <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="flex items-center ml-6">
                                                            {open ? (
                                                                <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (

                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>


                                            </>

                                        )}
                                    </Disclosure>
                                ))}

                                <Disclosure as="div" className="py-6 border-b border-gray-200">
                                    {({ open }) => (
                                        <>
                                            <h3 className="flow-root -my-3">
                                                <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Más Vendidos</span>

                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">


                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>


                            </form>




                            <ContenedorProductos products={filteredProducts} />


                        </div>

                    </section>
                </main>
            </div>
        </div>
    )
}