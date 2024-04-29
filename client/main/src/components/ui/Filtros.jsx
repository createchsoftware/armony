import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ContenedorProductos from './ContenedorProductos'
import { products } from '../../data/productos.json'



function classNames(...clases) {
    return clases.filter(Boolean).join(' ')
}

const sortOptions = [
    { name: 'Más Popular', current: true },
    { name: 'Mejor Calificado', current: false },
    { name: 'Más Nuevo', current: false },
    { name: 'Precio: Bajo a Alto', current: false },
    { name: 'Precio: Alto a Bajo', current: false },
]

const subCategories = [
    { name: 'smartphones' },
    { name: 'laptops' },
    { name: 'Tipo 3' },
    { name: 'Tipo 4' },
    { name: 'Tipo 5' },
]

const filters = [
    {
        id: 'color',
        name: 'Pestañas',
        options: [
            { value: 'white', label: 'Blanco', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Azul', checked: true },
            { value: 'brown', label: 'Café', checked: false },
            { value: 'green', label: 'Verde', checked: false },
            { value: 'purple', label: 'Morado', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Facial',
        options: [
            { value: 'new', label: 'Nuevos', checked: false },
            { value: 'sale', label: 'Ofertas', checked: false },
            { value: 'travel', label: 'Próximamente', checked: true },
            { value: 'organization', label: 'Organización', checked: false },
            { value: 'accessories', label: 'Accesorios', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Cejas',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Depilación',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
    {
        id: 'size',
        name: 'Spa',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]
export default function Filtros() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [sortOption, setSortOption] = useState(sortOptions[0])
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [category, setCategory] = useState()
    const [search, setSearch] = useState('');
    //    const [filter, setFilter] = useState();

    useEffect(() => {
        setFilteredProducts(products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())))
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
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
    }, [search, category, sortOption, products]);

    return (
        <div className="mt-6 bg-white">

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
                                        <h3 className="sr-only">Categorias</h3>
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
                                                                        <PlusIcon className="w-5 h-5" aria-hidden="true" />
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

                        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-4xl">Categorias</h1>
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
                        <div class='max-w-md mx-auto border-1 border-gray-400'>
                            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-b-2 border-gray">
                                <div class="grid place-items-center h-full w-12 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <input
                                    class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
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
                            Products
                        </h2>

                        <div className="grid md:flex">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a className='cursor-pointer' href={category.href}
                                                onClick={() => { setCategory(category) }}
                                            >{category.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="py-6 border-b border-gray-200">
                                        {({ open }) => (
                                            <>
                                                <h3 className="flow-root -my-3">
                                                    <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
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
                            </form>

                            <ContenedorProductos products={filteredProducts} />


                        </div>

                    </section>
                </main>
            </div>
        </div>
    )
}