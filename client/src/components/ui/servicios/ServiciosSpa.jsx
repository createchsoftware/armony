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
import { Slider, Box } from "@mui/material";
//import { products } from '../../data/productos.json'
import Rating from "@mui/material/Rating";
import Servicio from "../../../components/ui/Servicio.jsx";
import Peluqueria from "../../../../public/pictures/peluqueria.png";
import Unas from "../../../../public/pictures/unas.png";
import Pedicura from "../../../../public/pictures/pedicura.png";
import Presentacion from "../../../components/ui/PresentacionSpa.jsx";
import Filtro from "../../../components/ui/FiltrosServicios.jsx";
import Hydro from "../../../../public/pictures/Hydrafacial.png";
import Peeling from "../../../../public/pictures/PeelingQuímico.png";
import Meso from "../../../../public/pictures/MesoterapiaVirtual.png";
import Cavitacion from "../../../../public/pictures/Cavitación.png";
import Radio from "../../../../public/pictures/Radiofrecuencia.png";
import Vac from "../../../../public/pictures/Vacumterapia.png";

var estetica = [
  {
    id: 1,
    nombre: "Servicio de peluquería",
    descripcion: "Espacio de transformación y renovación personal",
    espDesc1:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
    espDesc2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
    precio: "1,350.00",
    img: Peluqueria,
    rating: 5,
    fav: true,
  },
  {
    id: 2,
    nombre: "Uñas",
    descripcion: "Transformación de las manos elevando confianza",
    espDesc1:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
    espDesc2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
    precio: "1,200.00",
    img: Unas,
    rating: 5,
    fav: true,
  },
  {
    id: 3,
    nombre: "Pedicura",
    descripcion: "Tratamiento estético para los pies",
    espDesc1:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
    espDesc2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
    precio: "1,800.00",
    img: Pedicura,
    rating: 5,
    fav: true,
  },
];

var faciales = [
  {
    id: 1,
    nombre: "HydroFacial",
    descripcion: "Estimula la restauración natural de la piel",
    espDesc1:
      "Representa la más avanzada tecnología para estimular la restauración natural de la piel sin dolor ni tiempo de recuperación es un a limpieza facial profunda.",
    espDesc2:
      "El procedimiento HydraFacial se realiza en tres etapas: \n1er. Etapa: La renovación de la piel \n2da. Etapa: Limpieza profunda \n3ra. Etapa: Solución rica en vitaminas antioxidantes altamente hidratante.",
    precio: "1,800.00",
    img: Hydro,
    rating: 5,
    fav: true,
  },
  {
    id: 2,
    nombre: "Mesoterapia virtual",
    descripcion: "Aumenta la permeabilidad de la piel",
    espDesc1:
      "La Mesoterapia Virtual o electroporación es un tratamiento que surgió buscando una alternativa a la propia mesoterapia. Es decir, lograr el paso de activos a la dermis sin tener que usar las temidas agujas.",
    espDesc2:
      "Esta técnica permite mediante la emisión de una corriente de baja intensidad aumentar la permeabilidad de piel y conseguir el paso de los activos a la dermis de forma gradual.",

    precio: "1,800.00",
    img: Meso,
    rating: 5,
    fav: true,
  },
  {
    id: 3,
    nombre: "Peeling químico",
    descripcion:
      "Las capas de la pielm reveladas son más nuevas y por lo tanto más suaves y jóveens",
    espDesc1:
      "El peeling químico es un tratamiento de rejuvenecimiento de la piel en el que se le aplica una solución química con el fin de eliminar las capas superiores dañadas.",
    espDesc2:
      "Al finalizar el peeling, las capas de piel reveladas son mas nuevas y por tanto más suaves y jóvenes.",

    precio: "1,800.00",
    img: Peeling,
    rating: 5,
    fav: true,
  },
];

var corporales = [
  {
    id: 1,
    nombre: "Cavitación",
    descripcion:
      "Elimina la grasa localizada mediante el uso de ultrasonidos de baja frecuencia",
    espDesc1:
      "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
    espDesc2:
      "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
    precio: "1,350.00",
    img: Cavitacion,
    rating: 5,
    fav: true,
  },
  {
    id: 2,
    nombre: "Radiofrecuencia",
    descripcion: "Reafirmación de la piel y reducción de volumen corporal",
    espDesc1:
      "La Radiofrecuencia o Diatermia está con nosotros desde hace 75 años. En medicina es conocida en el ámbito quirúrgico para la coagulación de tejidos y eliminación de tumores.",
    espDesc2:
      "En estética es el tratamiento más empleado para la reafirmación de la piel y reducción de volumen corporal.",
    precio: "1,350.00",
    img: Radio,
    rating: 5,
    fav: true,
  },
  {
    id: 3,
    nombre: "Vacumterapia",
    descripcion:
      "Drena el tejido adiposo movilizando la grasa localizada hacia el sistema linfático",
    espDesc1:
      "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
    espDesc2:
      "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
    precio: "1,350.00",
    img: Vac,
    rating: 5,
    fav: true,
  },
];

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
    id: 'categoria',
    name: 'Favoritos',
    options: [
      { label: 'Ascendente', checked: false },
      { label: 'Descendente', checked: false },
    ],
  },
];

const filters = [
  {
    id: 'Marca',
    name: 'Tipo de servicio',
    options: [
      { value: 'ponds', label: 'Masajes', checked: false },
      { value: 'hidraSense', label: 'Faciales', checked: false },
      { value: 'savasana', label: 'Maquillaje', checked: false },
      { value: 'ceraVe', label: 'Servicio tradicional', checked: false },
      { value: 'cetaphil', label: 'Servicio con tecnología', checked: false },
      { value: 'mizon', label: 'Rejuvenecimiento', checked: false },
    ],
  },
  {
    id: 'Ofertas',
    name: 'Ofertas',
    options: [
      { value: 'ponds', label: 'Ofertas de tiempo limitado', checked: false },
      { value: 'hidraSense', label: 'Descuentos', checked: false },
      { value: 'savasana', label: 'Producto nuevo', checked: false },
      { value: 'ceraVe', label: 'Rebajas', checked: false },
    ],
  }]


export default function ServicioEstetica() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOption, setSortOption] = useState(ordenamiento[0])
  const [allProducts, setAllProducts] = useState(estetica)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [busqueda, setSearch] = useState("");
  const [rating, setRating] = useState(0);
  const [precio, setPrecio] = useState(null);

  const [toggleState, setToggleService] = useState(1);
  const [color1, setColor1] = useState("#EB5765");
  const [color2, setColor2] = useState("#F6B3B9");

  //useEffect from api call
  // useEffect(() => {
  //     fetch('/products')
  //         .then(res => res.json())
  //         .then(data => setProducts(data))
  //         .catch(err => console.log(err))
  // }, [])

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
    fetch("/api/admin/productos/getProducts")
      .then(response => response.json())
      .then(data => {
        setAllProducts(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

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
        (product) => product.valoracion == rating
      );
    }

    // Filtro por precio
    if (precio === null)
      updatedProducts = updatedProducts;

    if (precio === 0)
      updatedProducts = updatedProducts;

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

    //multifiltro de checkboxes
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

  const toggleService = (index) => {
    if (index === 1) {
      setColor1("#EB5765");
      setColor2("#F6B3B9");
      setToggleService(index);
    } else {
      setColor2("#EB5765");
      setColor1("#F6B3B9");
      setToggleService(index);
    }
  };

  return (
    <>
      <Presentacion />

      <div className="w-full mx-auto mt-16 md:w-1/2">
        <p className=" text-4xl md:text-6xl text-center font-[ILoveGlitter] text-[#036C65]">
          Servicios del Spa
        </p>
        <div className="grid grid-cols-2 my-16">
          <a
            style={{ backgroundColor: color1 }}
            onClick={() => toggleService(1)}
            className="px-10 py-4 mx-auto text-sm text-white rounded-full hover:cursor-pointer hover:bg-opacity-80 md:text-base"
          >
            Tratamientos faciales
          </a>
          <a
            style={{ backgroundColor: color2 }}
            onClick={() => toggleService(2)}
            className="px-10 py-4 mx-auto text-xs text-white rounded-full hover:cursor-pointer hover:bg-opacity-80 md:text-base "
          >
            Tratamientos corporales
          </a>
        </div>
        <div className={toggleState === 1 ? "block" : "hidden"}>
          <p className="w-3/4 mx-auto text-center md:w-full">
            Los tratamientos faciales son procedimientos cosméticos diseñados
            para mejorar la apariencia y la salud de la piel del rostro.
          </p>
        </div>
        <div className={toggleState === 2 ? "block" : "hidden"}>
          <p className="w-3/4 mx-auto text-center md:w-full">
            Los tratamientos corporales son procedimientos estéticos y que
            mejoran la apariencia y la salud de la piel y el cuerpo general.
          </p>
        </div>
      </div>
      <div className="">
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

              <div className="grid md:gap-12 md:flex">
                {/* Filters */}
                <form className="hidden w-64 lg:block">
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
                                max={1000}
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

                {/* <div className='flex rounded-lg ring-4 ring-[#E2B3B7]'>
                  {filteredProducts.map((servicio) => (
                    <Servicio
                      nombre={servicio.nombre}
                      descripcion={servicio.descripcion}
                      espDesc1={servicio.espDesc1}
                      espDesc2={servicio.espDesc2}
                      precio={servicio.precio}
                      imagen={servicio.img}
                      rating={servicio.rating}
                      isFavorite={servicio.fav}
                    />
                  ))}
                </div> */}

                <div className="grid md:relative">
                  <div
                    className={toggleState === 1 ? "block h-auto" : "hidden"}
                  >
                    {/*<Filtro className="relative float-start" />*/}
                    <div className="grid grid-cols-2 md:grid-cols-3 w-[100%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
                      {faciales.length > 0 ? (
                        faciales.map((servicio) => (
                          <Servicio
                            key={servicio.nombre}
                            nombre={servicio.nombre}
                            descripcion={servicio.descripcion}
                            espDesc1={servicio.espDesc1}
                            espDesc2={servicio.espDesc2}
                            precio={servicio.precio}
                            imagen={servicio.img}
                            rating={servicio.rating}
                            isFavorite={servicio.fav}
                          />
                        ))
                      ) : (
                        <p className='m-auto'>No hay servicios faciales disponibles</p>
                      )}
                    </div>
                  </div>
                  <div className={toggleState === 2 ? "block" : "hidden"}>
                    <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[100%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
                      {corporales.length > 0 ? (
                        corporales.map((servicio) => (
                          <Servicio
                            key={servicio.nombre}
                            nombre={servicio.nombre}
                            descripcion={servicio.descripcion}
                            espDesc1={servicio.espDesc1}
                            espDesc2={servicio.espDesc2}
                            precio={servicio.precio}
                            imagen={servicio.img}
                            rating={servicio.rating}
                            isFavorite={servicio.fav}
                          />
                        ))
                      ) : (
                        <p className='m-auto'>No hay servicios corporales disponibles</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="w-full mx-auto my-16 text-center">
              <p className="text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
                ¿No están los servicios que usas?
              </p>
              <p className="w-3/4 mx-auto my-10 text-center md:w-full">
                Tal vez los encuentres en los servicios de nuestra estética.
              </p>
              <a
                href="/spa/servicios/estetica"
                className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
                aria-label="Ir a estética"
              >
                Ver servicios de estética
              </a>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// import Presentacion from "../../../components/ui/PresentacionEstetica.jsx";
// import Servicio from "../../../components/ui/Servicio.jsx";
// import Peluqueria from "../../../../public/pictures/peluqueria.png";
// import Unas from "../../../../public/pictures/unas.png";
// import Pedicura from "../../../../public/pictures/pedicura.png";

// var estetica = [
//   {
//     id: 1,
//     nombre: "Servicio de peluquería",
//     descripcion: "Espacio de transformación y renovación personal",
//     espDesc1:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
//     espDesc2:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
//     precio: "1,350.00",
//     img: Peluqueria,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 2,
//     nombre: "Uñas",
//     descripcion: "Transformación de las manos elevando confianza",
//     espDesc1:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
//     espDesc2:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
//     precio: "1,200.00",
//     img: Unas,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 3,
//     nombre: "Pedicura",
//     descripcion: "Tratamiento estético para los pies",
//     espDesc1:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore numquam at excepturi ",
//     espDesc2:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quasi repudiandae delectus recusandae accusantium deleniti, sit cupiditate quae culpa aut inventore",
//     precio: "1,800.00",
//     img: Pedicura,
//     rating: 5,
//     fav: true,
//   },
// ];

// const ServiciosEstetica = () => {
//   return (
//     <div>
//       <Presentacion />
//       <div className="w-full mx-auto my-16">
//         <p className=" text-4xl md:text-6xl text-center mb-8 font-[iloveglitter] text-[#036C65]">
//           Servicios de la estética
//         </p>
//         <p className="w-3/4 mx-auto mt-8 text-center md:w-full">
//           El ambiente de un centro de estética está diseñado para ser
//           profesional y enfocado en la belleza y el cuidado de la piel y el
//           cabello.
//         </p>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
//         {estetica.map((servicio) => (
//           <Servicio
//             nombre={servicio.nombre}
//             descripcion={servicio.descripcion}
//             espDesc1={servicio.espDesc1}
//             espDesc2={servicio.espDesc2}
//             precio={servicio.precio}
//             imagen={servicio.img}
//             rating={servicio.rating}
//             isFavorite={servicio.fav}
//           />
//         ))}
//       </div>
//       <div className="w-full mx-auto my-16 text-center">
//         <p className="text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
//           ¿No están los servicios que usas?
//         </p>
//         <p className="w-3/4 mx-auto my-10 text-center md:w-full">
//           Tal vez los encuentres en los servicios de nuestro spa.
//         </p>
//         <a
//           href="/spa/servicios/spa"
//           className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
//           aria-label="Ir a estética"
//         >
//           Ver servicios de spa
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ServiciosEstetica;

// import Servicio from "../../../components/ui/Servicio.jsx";
// import { useState } from "react";
// import Presentacion from "../../../components/ui/PresentacionSpa.jsx";
// import Filtro from "../../../components/ui/FiltrosServicios.jsx";
// import Hydro from "../../../../public/pictures/Hydrafacial.png";
// import Peeling from "../../../../public/pictures/PeelingQuímico.png";
// import Meso from "../../../../public/pictures/MesoterapiaVirtual.png";
// import Cavitacion from "../../../../public/pictures/Cavitación.png";
// import Radio from "../../../../public/pictures/Radiofrecuencia.png";
// import Vac from "../../../../public/pictures/Vacumterapia.png";
// var faciales = [
//   {
//     id: 1,
//     nombre: "HydroFacial",
//     descripcion: "Estimula la restauración natural de la piel",
//     espDesc1:
//       "Representa la más avanzada tecnología para estimular la restauración natural de la piel sin dolor ni tiempo de recuperación es un a limpieza facial profunda.",
//     espDesc2:
//       "El procedimiento HydraFacial se realiza en tres etapas: \n1er. Etapa: La renovación de la piel \n2da. Etapa: Limpieza profunda \n3ra. Etapa: Solución rica en vitaminas antioxidantes altamente hidratante.",
//     precio: "1,800.00",
//     img: Hydro,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 2,
//     nombre: "Mesoterapia virtual",
//     descripcion: "Aumenta la permeabilidad de la piel",
//     espDesc1:
//       "La Mesoterapia Virtual o electroporación es un tratamiento que surgió buscando una alternativa a la propia mesoterapia. Es decir, lograr el paso de activos a la dermis sin tener que usar las temidas agujas.",
//     espDesc2:
//       "Esta técnica permite mediante la emisión de una corriente de baja intensidad aumentar la permeabilidad de piel y conseguir el paso de los activos a la dermis de forma gradual.",

//     precio: "1,800.00",
//     img: Meso,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 3,
//     nombre: "Peeling químico",
//     descripcion:
//       "Las capas de la pielm reveladas son más nuevas y por lo tanto más suaves y jóveens",
//     espDesc1:
//       "El peeling químico es un tratamiento de rejuvenecimiento de la piel en el que se le aplica una solución química con el fin de eliminar las capas superiores dañadas.",
//     espDesc2:
//       "Al finalizar el peeling, las capas de piel reveladas son mas nuevas y por tanto más suaves y jóvenes.",

//     precio: "1,800.00",
//     img: Peeling,
//     rating: 5,
//     fav: true,
//   },
// ];

// var corporales = [
//   {
//     id: 1,
//     nombre: "Cavitación",
//     descripcion:
//       "Elimina la grasa localizada mediante el uso de ultrasonidos de baja frecuencia",
//     espDesc1:
//       "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
//     espDesc2:
//       "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
//     precio: "1,350.00",
//     img: Cavitacion,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 2,
//     nombre: "Radiofrecuencia",
//     descripcion: "Reafirmación de la piel y reducción de volumen corporal",
//     espDesc1:
//       "La Radiofrecuencia o Diatermia está con nosotros desde hace 75 años. En medicina es conocida en el ámbito quirúrgico para la coagulación de tejidos y eliminación de tumores.",
//     espDesc2:
//       "En estética es el tratamiento más empleado para la reafirmación de la piel y reducción de volumen corporal.",
//     precio: "1,350.00",
//     img: Radio,
//     rating: 5,
//     fav: true,
//   },
//   {
//     id: 3,
//     nombre: "Vacumterapia",
//     descripcion:
//       "Drena el tejido adiposo movilizando la grasa localizada hacia el sistema linfático",
//     espDesc1:
//       "La cavitación es una técnica no quirúrgica para eliminar la grasa localizada mediante el uso de ultrasonidos de baja frecuencia.",
//     espDesc2:
//       "Su principal ventaja es que ofrece la posibilidad de conseguir los mismos resultados que unaliposucción, pero sin la necesidad de una intervención quirúrgica, por eso cada vez más personas prefieren la cavitación como alternativa indolora, sin anestesia y muy efectiva, y sin dejar ningún tipo de señal o cicatriz en la piel.",
//     precio: "1,350.00",
//     img: Vac,
//     rating: 5,
//     fav: true,
//   },
// ];

// const ServiciosSpa = () => {
//   const [toggleState, setToggleService] = useState(1);
//   const [color1, setColor1] = useState("#EB5765");
//   const [color2, setColor2] = useState("#F6B3B9");

//   const toggleService = (index) => {
//     if (index === 1) {
//       setColor1("#EB5765");
//       setColor2("#F6B3B9");
//       setToggleService(index);
//     } else {
//       setColor2("#EB5765");
//       setColor1("#F6B3B9");
//       setToggleService(index);
//     }
//   };
//   return (
//     <div>
//       <Presentacion />
//       <div className="w-full mx-auto my-16 md:w-1/2">
//         <p className=" text-4xl md:text-6xl text-center font-[ILoveGlitter] text-[#036C65]">
//           Servicios del Spa
//         </p>
//         <div className="grid grid-cols-2 my-16">
//           <a
//             style={{ backgroundColor: color1 }}
//             onClick={() => toggleService(1)}
//             className="px-10 py-4 mx-auto text-sm text-white rounded-full md:text-base"
//           >
//             Tratamientos faciales
//           </a>
//           <a
//             style={{ backgroundColor: color2 }}
//             onClick={() => toggleService(2)}
//             className="px-10 py-4 mx-auto text-xs text-white rounded-full md:text-base "
//           >
//             Tratamientos corporales
//           </a>
//         </div>
//         <div className={toggleState === 1 ? "block" : "hidden"}>
//           <p className="w-3/4 mx-auto text-center md:w-full">
//             Los tratamientos faciales son procedimientos cosméticos diseñados
//             para mejorar la apariencia y la salud de la piel del rostro.
//           </p>
//         </div>
//         <div className={toggleState === 2 ? "block" : "hidden"}>
//           <p className="w-3/4 mx-auto text-center md:w-full">
//             Los tratamientos corporales son procedimientos estéticos y que
//             mejoran la apariencia y la salud de la piel y el cuerpo general.
//           </p>
//         </div>
//       </div>
//       <div className="grid md:relative">
//         <div className={toggleState === 1 ? "block h-auto" : "hidden"}>
//           {/*<Filtro className="relative float-start" />*/}
//           <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
//             {faciales.map((servicio) => (
//               <Servicio
//                 nombre={servicio.nombre}
//                 descripcion={servicio.descripcion}
//                 espDesc1={servicio.espDesc1}
//                 espDesc2={servicio.espDesc2}
//                 precio={servicio.precio}
//                 imagen={servicio.img}
//                 rating={servicio.rating}
//                 isFavorite={servicio.fav}
//               />
//             ))}
//           </div>
//         </div>
//         <div className={toggleState === 2 ? "block" : "hidden"}>
//           <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] md:w-[60%] rounded-lg ring-4 ring-[#E2B3B7] mx-auto mb-10">
//             {corporales.map((servicio) => (
//               <Servicio
//                 nombre={servicio.nombre}
//                 descripcion={servicio.descripcion}
//                 espDesc1={servicio.espDesc1}
//                 espDesc2={servicio.espDesc2}
//                 precio={servicio.precio}
//                 imagen={servicio.img}
//                 rating={servicio.rating}
//                 isFavorite={servicio.fav}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="w-full mx-auto text-center my-28">
//         <p className=" text-4xl md:text-6xl w-3/4 md:w-full my-10 mx-auto text-center font-[ILoveGlitter] text-[#036C65]">
//           ¿No están los servicios que usas?
//         </p>
//         <p className="w-3/4 mx-auto my-10 text-center md:w-full">
//           Tal vez los encuentres en los servicios de nuestra estética.
//         </p>
//         <a
//           href="/spa/servicios/estetica"
//           className="inline-block bg-[#EB5765] text-white text-xl rounded-full px-4 py-4 mx-auto hover:bg-red-200"
//           aria-label="Ir a estética"
//         >
//           Ver servicios de estética
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ServiciosSpa;
