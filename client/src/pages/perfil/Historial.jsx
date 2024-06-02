import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon
} from "@heroicons/react/20/solid";
//import { products } from '../../data/productos.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Compras from "../../components/ui/Compras";

function classNames(...clases) {
  return clases.filter(Boolean).join(" ");
}

const compras = [
  {
    id: 1,
    nombre: "Producto 1",
    precio: 100,
    fecha: "2021-10-01",
    cantidad: 1,
    total: 100,
  },
  {
    id: 2,
    nombre: "Producto 2",
    precio: 200,
    fecha: "2021-10-01",
    cantidad: 1,
    total: 200,
  },
  {
    id: 3,
    nombre: "Producto 3",
    precio: 300,
    fecha: "2021-10-01",
    cantidad: 1,
    total: 300,
  },
  {
    id: 4,
    nombre: "Producto 4",
    precio: 400,
    fecha: "2021-10-01",
    cantidad: 1,
    total: 400,
  },
];

const sortOptions = [
  { name: "Todas", current: true },
  { name: "Por dia", current: true },
  { name: "Por mes", current: false },
  { name: "Por año", current: false },
];

const tipoMovimiento = [
  { name: "General", current: true },
  { name: "Monedero", current: true },
  { name: "Puntos", current: false },
  { name: "Servicios", current: false },
  { name: "Productos", current: false },
];

function Historial() {
  async function checkLogin() {
    let respuestaJson = null;
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      respuestaJson = await respuesta.json();

      if (respuestaJson.logueado != true) {
        window.location.href = "/spa";
      }
    } catch (error) {
      window.location.href = "/spa";
    }
  }

  useEffect(() => checkLogin(), []);

  const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
  const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION

  async function recibido() {
    const respuesta = await fetch("/api/logueado", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      setNombre(null);
      setCorreo(null);
    }

    let respuestaJson = await respuesta.json();

    if (respuestaJson.logueado == true) {
      setNombre(respuestaJson.nombre);
      setCorreo(respuestaJson.email);
    } else {
      setNombre(null);
      setCorreo(null);
    }
  }

  useEffect(() => {
    recibido();
  }, []);

  return (
    <LayoutPrincipal>
      <main className="grid gap-6 mb-12 mt-24 w-[60%] m-auto">
        <section className="rounded-2xl mt-12 w-[100%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-6">
          <a
            className="flex items-baseline content-center text-sm gap-x-4"
            href="/perfil"
          >
            {" "}
            <IoIosArrowBack className="" />
            Volver
          </a>
          <img
            className="w-32 m-auto my-8 -mt-24 rounded-full aspect-square"
            src="../../pictures/historialMarco.png"
            alt=""
          />
          <img
            className="w-16 m-auto my-8 -mt-32 aspect-square"
            src="../../pictures/historial.png"
            alt="Bienvenida al historial."
          />
          <div className="m-auto text-center">
            <h1 className="mt-10 text-[#036C65] font-semibold text-2xl mb-2">
              Historial de movimientos
            </h1>
            <p>Actividades registradas de tus productos y servicios</p>
          </div>
        </section>
        <div className="flex justify-between gap-4 ">
          <div className="max-w-md border-gray-400 border-1">
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
                aria-label="Buscar."
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
            </div>
          </div>
          <div className="flex items-center ">
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
                <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
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
          </div>
          <div className="flex items-center ">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                  Tipo de movimiento
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
                <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {tipoMovimiento.map((option) => (
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
          </div>
          <p className="place-content-center">{15} Compras</p>
        </div>
        <div className="rounded-xl flex justify-start place-content-center place-items-center px-12 py-4 gap-96  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <a href="#" className="">
            <FontAwesomeIcon style={{ fontSize: "" }} icon={faAngleLeft} />{" "}
            Volver
          </a>
          <h1 className="text-2xl text-rose-400">Por dia</h1>
        </div>

        <div className="grid gap-6">
          {compras.map((compra) => (
            <Compras key={compra.id} compras={compra} />
          ))}
        </div>
      </main>
    </LayoutPrincipal>
  );
}

export default Historial;
