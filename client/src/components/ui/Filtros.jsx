import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ContenedorProductos from "./ContenedorProductos";
import { Slider, Box } from "@mui/material";
//import { products } from '../../data/productos.json'
import Rating from "@mui/material/Rating";
import Soon from "./Proximamente";

function classNames(...clases) {
  return clases.filter(Boolean).join(" ");
}

const ordenamiento = [
  { name: "Más Relevante", current: true },
  { name: "Más Reciente", current: false },
  { name: "Top Ventas", current: false },
  { name: "Precio: Bajo a Alto", current: false },
  { name: "Precio: Alto a Bajo", current: false },
];

const subCategories = [
  {
    id: "categoria",
    name: "Categorias",
    options: [
      { label: "Cosméticos", checked: false },
      { label: "Facial", checked: false },
      { label: "Crema", checked: false },
      { label: "Spray", checked: false },
      { label: "Serúm", checked: false },
      { label: "Depilación", checked: false },
    ],
  },
];

const filters = [
  {
    id: "Marca",
    name: "Marca",
    options: [
      { value: "ponds", label: "POND’S", checked: false },
      { value: "hidraSense", label: "Hidra Sense", checked: false },
      { value: "savasana", label: "Savasana", checked: false },
      { value: "ceraVe", label: "CeraVe", checked: false },
      { value: "cetaphil", label: "Cetaphil", checked: false },
      { value: "mizon", label: "Mizon", checked: false },
      { value: "gojo", label: "Gojo", checked: false },
    ],
  },
];

export default function Filtros() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState(ordenamiento[0]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productosFavorites, setProductosFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [busqueda, setSearch] = useState("");
  const [rating, setRating] = useState(0);
  const [precio, setPrecio] = useState(null);
  const [id, setId] = useState(0);
  const [soon, setSoon] = useState(false);

  async function getId() {
    let respuestaJson = null;
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      respuestaJson = await respuesta.json();
      console.log("id en uso: ", respuestaJson.clave);
      await setId(respuestaJson.clave);
    } catch (error) {
      console.log("Error");
    }
  }

  const toggleSoon = () => {
    setSoon(!soon);
  };

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("idFavoritos:", id);
      fetch(`/api/admin/favoritos/ProductFavoritosbyId/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener productos favoritos");
          }
          return response.json();
        })
        .then((data) => {
          setProductosFavorites(data);
          console.log("favoritos" + data);
        })
        .catch((error) => {
          //setErrorSpa(error.message);
        });
      // fetch(`/api/admin/productos/FavoritosbyId/${id}`)
      //     .then(response => response.json())
      //     .then(data => {
      //         setProductosFavorites(data);
      //         console.log("favoritos" + data);
      //     })
      //     .catch(error => {
      //         console.log('error', error);
      //     });
    }, [1000]);
  }, [id]);

  // Función para manejar cambios en las categorías
  const handleCategoryChange = (label, isChecked) => {
    setCategories((prev) => {
      if (isChecked) {
        return [...prev, label];
      } else {
        return prev.filter((item) => item !== label);
      }
    });
  };

  // Función para manejar cambios en las marcas
  const handleMarcaChange = (label, isChecked) => {
    setMarcas((prev) => {
      if (isChecked) {
        return [...prev, label];
      } else {
        return prev.filter((item) => item !== label);
      }
    });
  };

  const handleClickFacial = (e) => {
    e.preventDefault();
    setCategories(["Facial"]);
  };

  // Función para manejar cambios en las categorías
  const handleClickManicuraPedicura = (e) => {
    e.preventDefault();
    setCategories(["Manicura y pedicura"]);
  };

  // Función para manejar cambios en las categorías
  const handleClickCapilar = (e) => {
    e.preventDefault();
    setCategories(["Cuidado capilar"]);
  };

  // Función para manejar cambios en las categorías
  const handleClickAll = (e) => {
    e.preventDefault();
    setCategories([]);
  };

  // Función para manejar cambios en el rating
  const handleChange = (event, newValue) => {
    setRating(newValue);
  };

  // Función para manejar cambios en el slider de precio
  const handlePriceChange = (event, newValue) => {
    setPrecio(newValue);
  };

  //useEffect para obtener los productos
  useEffect(() => {
    setTimeout(() => {
      console.log("idFinal:", id);
      fetch(`/api/admin/productos/getProducts/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los productos");
          }
          return response.json();
        })
        .then((data) => {
          setAllProducts(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, [1000]);
  }, [id]);

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // useEffect para filtrar los productos según los filtros aplicados
  useEffect(() => {
    let updatedProducts = allProducts;

    // Filtrar por búsqueda
    if (busqueda) {
      updatedProducts = updatedProducts.filter((product) =>
        product.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro por categorías múltiples
    if (categories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        categories.includes(product.categoria)
      );
    }

    // Filtro por múltiples marcas
    if (marcas.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        marcas.includes(product.marca)
      );
    }

    // Filtro por valoración
    if (rating) {
      updatedProducts = updatedProducts.filter(
        (product) => Math.floor(parseFloat(product.valoracion)) === rating
      );
    }

    // Filtro por precio
    if (precio === null) updatedProducts = updatedProducts;

    if (precio === 0) updatedProducts = updatedProducts;

    if (precio) {
      updatedProducts = updatedProducts.filter(
        (product) => product.precio <= precio
      );
    }

    // Ordenar productos
    switch (sortOption.name) {
      case "Más Relevante":
        break;
      case "Más Reciente":
        updatedProducts = [...updatedProducts].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      case "Top Ventas":
        updatedProducts = [...updatedProducts].sort(
          (a, b) => b.masVendido - a.masVendido
        );
        break;
      case "Precio: Bajo a Alto":
        updatedProducts = [...updatedProducts].sort(
          (a, b) => a.precio - b.precio
        );
        break;
      case "Precio: Alto a Bajo":
        updatedProducts = [...updatedProducts].sort(
          (a, b) => b.precio - a.precio
        );
        break;
      default:
        break;
    }

    // Multifiltro de checkboxes
    filters.forEach((filter) => {
      const selectedOptions = filter.options
        .filter((option) => option.checked)
        .map((option) => option.label);
      if (selectedOptions.length) {
        updatedProducts = updatedProducts.filter((product) =>
          selectedOptions.includes(product[filter.id])
        );
      }
    });

    setFilteredProducts(updatedProducts);
  }, [busqueda, categories, sortOption, allProducts, marcas, rating, precio]);

  return (
    <>
      <section className="grid grid-cols-1 gap-8 m-auto my-20 text-center lg:grid-cols-4 md:grid-cols-2">
        <div
          onClick={handleClickFacial}
          className="grid items-center content-between justify-center max-w-xs grid-cols-1 gap-4 p-6 align-bottom transition duration-300 ease-in-out bg-white hover:cursor-pointer hover:scale-105 rounded-xl "
        >
          <h1 className="m-auto text-xl ">Cuidado facial</h1>
          <img
            className="h-64 m-auto rounded-xl border- w-60"
            src={"../../pictures/facial.png"}
            alt=""
          />
          <button className="m-auto transition-all duration-300 w-36  hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200">
            <span>Ver más...</span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div
          onClick={handleClickManicuraPedicura}
          className="grid items-center content-between justify-center max-w-xs grid-cols-1 gap-4 p-6 align-bottom transition duration-300 ease-in-out bg-white hover:cursor-pointer hover:scale-105 rounded-xl "
        >
          <h1 className="m-auto text-xl ">Manicura y pedicura</h1>
          <img
            className="h-64 m-auto rounded-xl border- w-60"
            src={"../../pictures/manicura.png"}
            alt=""
          />
          <button className="m-auto transition-all duration-300 w-36  hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200">
            <span>Ver más...</span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div
          onClick={handleClickCapilar}
          className="grid items-center content-between justify-center max-w-xs grid-cols-1 gap-4 p-6 align-bottom transition duration-300 ease-in-out bg-white hover:cursor-pointer hover:scale-105 rounded-xl "
        >
          <h1 className="m-auto text-xl ">Cuidado capilar</h1>
          <img
            className="h-64 m-auto rounded-xl border- w-60"
            src={"../../pictures/capilar.png"}
            alt=""
          />
          <button className="m-auto transition-all duration-300 w-36  hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200">
            <span>Ver más...</span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div
          onClick={handleClickCapilar}
          className="grid items-center content-between justify-center max-w-xs grid-cols-1 gap-4 p-6 align-bottom transition duration-300 ease-in-out bg-white hover:cursor-pointer hover:scale-105 rounded-xl "
        >
          <h1 className="m-auto text-xl ">Productos de spa</h1>
          <img
            className="h-64 m-auto rounded-xl border- w-60"
            src={"../../pictures/spa.png"}
            alt=""
          />
          <button className="m-auto transition-all duration-300 w-36  hover:bg-[#036C65] hover:ring-2 hover:[#036C65] hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] p-4 font-[abeatbykai] text-neutral-200">
            <span>Ver más...</span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </section>

      <div className="bg-[#F4F1ED]">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
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
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
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
                      <ul
                        role="list"
                        className="px-2 py-3 font-medium text-gray-90"
                      >
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a
                              href={category.href}
                              onClick={() => {
                                setCategory(category.label);
                              }}
                              className="block px-2 py-3 cursor-pointer"
                            >
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="px-4 py-6 border-t border-gray-200"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="flow-root -mx-2 -my-3">
                                <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="flex items-center ml-6">
                                    {open ? (
                                      <MinusIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        classNa
                                        me="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="w-4 h-4 border-gray-300 rounded text-rose-400 focus:ring-rose-400 "
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
              <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Filtrar por:
              </h1>
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
                        {ordenamiento.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                onClick={() => {
                                  setSortOption(option);
                                }}
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900 cursor-pointer"
                                    : "text-gray-500",
                                  active
                                    ? "bg-gray-100 cursor-pointer"
                                    : "cursor-pointer",
                                  "block px-4 py-2 text-sm cursor-pointer"
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

                <button
                  type="button"
                  className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
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
              <div className="max-w-md mx-auto border-gray-400 border-1">
                <div className="relative flex items-center w-full h-12 overflow-hidden bg-white border-b-2 rounded-lg focus-within:shadow-lg border-gray">
                  <div className="grid w-12 h-full text-gray-300 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <input
                    className="w-full h-full pr-2 text-sm text-gray-700 outline-none peer"
                    type="text"
                    id="search"
                    placeholder="Buscar..."
                    onChange={(e) => {
                      handleSearch(e);
                    }}
                  />
                </div>
              </div>
            </div>

            <section aria-labelledby="products-heading " className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Productos
              </h2>

              <div className="grid md:flex">
                {/* Filters */}
                <form className="hidden lg:block">
                  {subCategories.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="py-6 border-b border-gray-200"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="flow-root -my-3">
                            <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="flex items-center ml-6">
                                {open ? (
                                  <MinusIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={(e) =>
                                      handleCategoryChange(
                                        option.label,
                                        e.target.checked
                                      )
                                    }
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="w-4 h-4 border-gray-300 rounded text-rose-400 focus:ring-rose-400 "
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

                  <Disclosure
                    as="div"
                    className="py-6 border-b border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Precio
                            </span>
                            <span className="flex items-center ml-6">
                              {open ? (
                                <MinusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            <Box sx={{}}>
                              <Slider
                                value={precio}
                                onChange={handlePriceChange}
                                aria-labelledby="input-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={1500}
                                className="text-red-600 "
                                sx={{ color: "#ec5766" }}
                              />
                              <Box sx={{ textAlign: "center" }}>${precio}</Box>
                            </Box>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure
                    as="div"
                    className="py-6 border-b border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Valoraciones
                            </span>
                            <span className="flex items-center ml-6">
                              {open ? (
                                <MinusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            <Rating
                              onChange={handleChange}
                              className="m-auto"
                              value={rating}
                              unratedColor="red"
                              ratedColor="blue"
                            />
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="py-6 border-b border-gray-200"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="flow-root -my-3">
                            <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="flex items-center ml-6">
                                {open ? (
                                  <MinusIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    onChange={(e) =>
                                      handleMarcaChange(
                                        option.label,
                                        e.target.checked
                                      )
                                    }
                                    defaultChecked={option.checked}
                                    className="w-4 h-4 border-gray-300 rounded text-rose-400 focus:ring-rose-400 "
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

                  <Disclosure
                    as="div"
                    className="py-6 border-b border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Más Vendidos
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4"></div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>

                <ContenedorProductos products={filteredProducts} />
              </div>
            </section>
            {soon && (
              <div className="soon-fondo">
                <div className="text-black soon-fx" onClick={toggleSoon}>
                  <Soon />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
