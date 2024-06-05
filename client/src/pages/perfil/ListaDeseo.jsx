import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconoAgregarAlCarrito } from '../../components/ui/Iconos'
import { faBasketShopping, faHandHoldingHeart, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/ui/Navbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Fragment } from 'react'
import Box from '@mui/material/Box';
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import PopupLogin from '../../components/ui/Login/PopupLogin';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function ListaDeseo() {

    const navigate = useNavigate();

    const [boton1, setBoton1] = useState('lista-boton');
    const [boton2, setBoton2] = useState('lista-boton');
    const [resumen, setResumen] = useState('lista-resumen-off');
    const [width, setWidth] = useState('w-full');
    const [tipoProducto, settipoProducto] = useState('all');
    const [showProduct, setShowProduct] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sideBar, setSiderBar] = useState(false);
    const [barSize, setBarSize] = useState('sideBar-Off')
    const [cols, setCols] = useState('grid-cols-4')
    const [sort, setSort] = useState('')
    const [log, setLog] = useState(false); //<<< PARA EL INICIO DE SESION
    const [login, setLogin] = useState(false);

    //  useEffect(()=>{
    //         localStorage.removeItem("favoritos")
    //             },[])
    async function recibido() {
        const respuesta = await fetch("/api/logueado", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!respuesta.ok) {
            setLog(false);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setLog(true);
        } else {
            setLog(false);
        }
    }

    useEffect(() => {
        recibido();
    }, []);

    const filtrar = (type) => {
        settipoProducto(type);
    }

    const [contResumen, setContResumen] = useState([
        // CONTENIDO COMENTADO. ¡¡¡USAR SOLAMENTE PARA PRUEBAS ES CASO DE NO HABER AUN CONEXION FRONT-BACK!!!
        // {
        //     id: 1,
        //     tipo: '1',
        //     nombre: 'Producto 1',
        //     precio: 100,
        //     categoria: 'Cosméticos',
        //     marca: 'POND’S',
        //     valoracion: 4,
        //     imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        //     descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        // },
        // {
        //     id: 2,
        //     tipo: '1',
        //     nombre: 'Producto 2',
        //     precio: 200,
        //     categoria: 'Facial',
        //     marca: 'Hidra Sense',
        //     valoracion: 3,
        //     imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        //     descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        // },
        // {
        //     id: 3,
        //     tipo: '1',
        //     nombre: 'Producto 3',
        //     precio: 300,
        //     categoria: 'Crema',
        //     marca: 'Savasana',
        //     valoracion: 2,
        //     imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        //     descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        // },
        // {
        //     id: 4,
        //     tipo: '1',
        //     nombre: 'Producto 4',
        //     precio: 400,
        //     categoria: 'Spray',
        //     marca: 'CeraVe',
        //     valoracion: 1,
        //     imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        //     descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        // },
        // {
        //     id: 5,
        //     tipo: '1',
        //     nombre: 'Producto 5',
        //     precio: 500,
        //     categoria: 'Serúm',
        //     marca: 'Cetaphil',
        //     valoracion: 5,
        //     imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg',
        //     descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        // },
        // {
        //     id: 6,
        //     tipo: '1',
        //     nombre: 'Producto 6',
        //     precio: 600,
        //     categoria: 'Depilación',
        //     marca: 'Mizon',
        //     valoracion: 4,
        //     imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-06.jpg',
        //     descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        // },
        // {
        //     id: 7,
        //     tipo: '2',
        //     nombre: "HydroFacial",
        //     descripcion: "Estimula la restauración natural de la piel",
        //     precio: 1800,
        //     imagen: "../../../public/pictures/Hydrafacial.png",
        //     valoracion: 5,
        //     fav: true,
        // },
        // {
        //     id: 8,
        //     tipo: '2',
        //     nombre: "Mesoterapia virtual",
        //     descripcion: "Aumenta la permeabilidad de la piel",
        //     precio: 1800,
        //     imagen: "../../../public/pictures/MesoterapiaVirtual.png",
        //     valoracion: 5,
        //     fav: true,
        // },
        // {
        //     id: 9,
        //     tipo: '2',
        //     nombre: "Uñas",
        //     descripcion: "Transformación de las manos elevando confianza",
        //     precio: 1200,
        //     imagen: "../../../public/pictures/unas.png",
        //     valoracion: 5,
        //     fav: true,
        // },
        // {
        //     id: 10,
        //     tipo: '2',
        //     nombre: "Pedicura",
        //     descripcion: "Tratamiento estético para los pies",
        //     precio: 1800,
        //     imagen: "../../../public/pictures/pedicura.png",
        //     valoracion: 5,
        //     fav: true,
        // }
    ])



    const [Uid, setUid] = useState(null)
    useEffect(() => {
        const getidUser = () => {// aqui veificamos si hay una cookie con este nombre 
            const cookie = obteneridCookie('Naruto_cookie')
            if (cookie) {

                const decode = jwtDecode(cookie)//aqui decodificaremos la cokie
                setUid(decode.user)
            }
        }
        getidUser()
    }, [])


    const obteneridCookie = (namecookie) => { //en este metodo lo que hacemos es destructurar la cokie para 
        // obtener el user y luego el id
        const cookies = document.cookie.split(';');
        for (let cokie of cookies) {
            const [key, value] = cokie.split('=')
            if (key.trim() === namecookie) {
                return value;//retornara el valor
            }
        }
        return null;
    }

    useEffect(() => {
        iterateArray();
    }, []);


    const iterateArray = async () => {
        let myArray = await JSON.parse(localStorage.getItem("favoritos")) || [];
        console.log(myArray);
    };

    useEffect(() => {
        const Prod = async () => {
            if (Uid) {
                try {
                    //este fetch traera todos los favoritos del cliente,solo incluyendo servicios y productos
                    const response = await fetch(`/api/admin/favoritos/FavoritosbyId/${Uid}`)
                    const data = await response.json();
                    setContResumen(data)
                } catch (error) {
                    console.error("hubo error :", error)
                }
            } else {
                let myArray = await JSON.parse(localStorage.getItem("favoritos")) || [];
                setContResumen(myArray)
            }
        }
        Prod()
    }, [Uid])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }


    // variable por la cual filtrar -> tipoProducto   (si es 'null' es un servicio y si es 'venta' es un producto)
    const presionar1 = () => {
        if (boton1 !== 'lista-boton-on') {
            setBoton1('lista-boton-on')
            setBoton2('lista-boton')
            setResumen('lista-resumen-on')
            setWidth('w-1/2')
            filtrar('venta')
            setShowProduct(true)
            setCols('grid-cols-3')
        } else {
            setBoton1('lista-boton')
            setResumen('lista-resumen-off')
            setWidth('w-full')
            filtrar('all')
            setShowProduct(false)
            setCols('grid-cols-4')
        }

    }
    const presionar2 = () => {
        if (boton2 !== 'lista-boton-on') {
            setBoton2('lista-boton-on')
            setBoton1('lista-boton')
            setResumen('lista-resumen-off')
            setWidth('w-full')
            filtrar(null)
            setShowProduct(false)
            setCols('grid-cols-4')
        } else {
            setBoton2('lista-boton')
            filtrar('all')
        }

    }

    const removeProducto = (itemId) => {
        if (Uid) {
            eliminarFav(itemId)
            setContResumen(contResumen.filter(item => item.pkIdPS !== itemId));
        } else {
            RLSFavoritos(itemId)
            setContResumen(contResumen.filter(item => item.pkIdPS !== itemId));
        }
    };
    const RLSFavoritos = (id) => {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        favoritos = favoritos.filter((obj) => obj.pkIdPS !== id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    };

    const eliminarFav = async (idProServ) => {
        try {
            await fetch("/api/admin/favoritos/delFavorito", {
                method: "POST",
                body: JSON.stringify({ idCliente: Uid, IdProducto: idProServ }),
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.log("error", error)
        }
    }

    const resumenList = contResumen.map(item => (
        (item.tipoProducto === 'venta' &&
            <li key={item.PKidPS} className='flex justify-between gap-2 mb-2'>
                <h1 className='truncate'>{item.nombre}</h1>
                <h1 className='text-[#036d63]'>${item.precio}</h1>
            </li>
        )
    ))

    const handleSortChange = (event) => {
        setSort(event.target.value)
    }

    const handleViewMoreProduct = (producto) => {
        // navigate to the product page with the product current id
        const product = {
            id: producto.pkIdPS,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio),
            descripcion: producto.descripcion,
            valoracion: producto.valoracion || 5,
            imagen: producto.img,
        };
        navigate(`/spa/producto/${product.id}`, { state: { product } });
    }

    const handleViewMoreService = (producto) => {
        // navigate to the services with link
        // 
    }

    const handleComprar = (productoComprar) => {
        // navigate('/spa/comprar');
        const productoBuy = {
            id: productoComprar.id,
            nombre: productoComprar.nombre,
            precio: parseFloat(productoComprar.precio),
            cantidad: 1,
            descripcion: productoComprar.descripcion,
            valoracion: productoComprar.valoracion,
            imagen: productoComprar.img,
        };
        navigate('/spa/comprar', { state: { producto: [productoBuy] } });
    };

    const filteredProducts = contResumen.filter(producto =>
        (tipoProducto === 'all' || producto.tipoProducto === tipoProducto) &&
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (sort === 'nombre-asc') {
            return a.nombre.localeCompare(b.nombre);
        } else if (sort === 'nombre-desc') {
            return b.nombre.localeCompare(a.nombre);
        } else if (sort === 'precio-asc') {
            return b.precio - a.precio;
        } else if (sort === 'precio-desc') {
            return a.precio - b.precio;
        } else {
            return 0;
        }
    })


    const contenido = filteredProducts.map(producto => (
        <li key={producto.pkIdPS} className='grid border-4 bg-white border-[#E2B3B7] p-6 py-2 rounded-xl mx-6 mb-6'>
            <Box
                className="z-0 grid justify-end"
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <StyledRating
                    name="customized-color"
                    defaultValue={1}
                    max={1}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    onClick={() => removeProducto(producto.pkIdPS)}
                />
            </Box>
            <img data-tooltip-id="ver" data-tooltip-content={producto.tipoProducto === "venta" ? "Ver produto" : "Ver servicio"} onClick={producto.tipoProducto === "venta" ? () => handleViewMoreProduct(producto) : () => handleViewMoreService(producto)} className='w-4/5 m-auto mb-4 rounded-lg hover:cursor-pointer hover:opacity-60 justify-self-center aspect-square'
                src={producto.img}
                alt={producto.nombre}
            />
            <div>
                <p className='mt-2  text-[#0BC26A] text-lg'>{'$' + producto.precio + ' MXN'}</p>
                <Rating className='' value={producto.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                <h3 className='mt-0 text-xl font-bold'>{producto.nombre}</h3>
                <p className='mt-0 text-xs text-justify'>
                    {producto.descripcion.length > 120 ? (
                        producto.descripcion.substring(0, 120) + '...'
                    ) : (
                        producto.descripcion
                    )}
                </p>
            </div>
            <div className='grid mt-2'>
                {log ? (
                    producto.tipoProducto === "venta" ? (
                        <button onClick={() => handleComprar(producto)} className=" text-xs gap-2  transition-all duration-300 px-8  hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Comprar</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                    ) : (
                        <a href='/spa/agendar' className=" text-xs gap-2  transition-all duration-300 px-8  hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agendar</span><div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></a>
                    )
                ) : (
                    producto.tipoProducto === "venta" ? (
                        <button onClick={() => setLogin(!login)} className=" text-xs gap-2  transition-all duration-300 px-8  hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Comprar</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                    ) : (
                        <button onClick={() => setLogin(!login)} className=" text-xs gap-2  transition-all duration-300 px-8  hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agendar</span><div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                    )
                )}

            </div>
        </li>
    ))

    const handleComprarTodo = () => {
        const contProducts = contResumen
            .filter(producto => producto.tipoProducto === 'venta')
            .map(producto => ({
                id: producto.id,
                nombre: producto.nombre,
                precio: parseFloat(producto.precio),
                cantidad: 1,
                descripcion: producto.descripcion,
                valoracion: producto.valoracion,
                imagen: producto.img,
            }));
        navigate('/spa/comprar', { state: { producto: contProducts } });
    };

    const precioTotal = contResumen
        .filter(producto => producto.tipoProducto === 'venta')
        .reduce((total, producto) => total + parseFloat(producto.precio), 0)
        .toFixed(2);

    const cantProductos = contResumen
        .filter(producto => producto.tipoProducto === 'venta')
        .length;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleBar = () => {
        setSiderBar(!sideBar)
        sideBar ? (
            setBarSize('sideBar-Off')
        ) : (
            setBarSize('sideBar-On')
        )
    }

    return (
        <>
            <Navbar />
            <div className='w-full overflow-hidden'>
                <div className='flex w-[120%]'>
                    <div className='flex w-[100%]'>
                        <div className={barSize} >
                            <aside className='menu-deseo bg-[#fb9ea6] w-full' >
                                <nav className='flex flex-col h-full'>
                                    <div className='flex items-center py-8 mx-8 cursor-pointer' onClick={toggleBar}>
                                        <FontAwesomeIcon className='text-2xl hover:text-white' icon={faBars} />
                                        {sideBar &&
                                            <p className='ml-8 text-xl truncate'>Mi lista de deseos</p>
                                        }
                                    </div>
                                    <ul className='flex-1 text-xl'>
                                        <li className={boton1} onClick={presionar1}>
                                            <FontAwesomeIcon className='ml-6' icon={faBasketShopping} />
                                            {sideBar &&
                                                <p className='ml-3 truncate'>Productos</p>
                                            }
                                        </li>
                                        <li className={boton2} onClick={presionar2}>
                                            <FontAwesomeIcon className='ml-6' icon={faHandHoldingHeart} />
                                            {sideBar &&
                                                <p className='ml-3 truncate'>Servicios</p>
                                            }
                                        </li>
                                    </ul>
                                </nav>
                            </aside>
                        </div>
                        <div className='grid content-start w-full h-full menu-deseo'>
                            <img src="../../../pictures/decoArmony1.png" alt="" className='absolute -rotate-90 -right-7 w-60 h-180 top-60 -z-10' />
                            <div className='flex justify-center mt-5 h-max'>
                                <form action="" className='flex h-10 items-center w-4/5 justify-center border-2 border-[rgb(255,181,167)] rounded-lg'>
                                    <input
                                        className='w-full h-full px-5 py-2 rounded-lg'
                                        type="buscar"
                                        placeholder="Buscar..."
                                        onChange={handleSearch}
                                    />
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className='mx-4 text-[rgb(255,181,167)] text-xl' />
                                </form>
                            </div>
                            <div className='flex justify-end py-2 pr-24 h-max'>
                                <div className="flex items-center">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                                                Ordenanamiento por
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
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleSortChange({ target: { value: 'nombre-asc' } })}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:font-bold'
                                                                )}
                                                            >
                                                                Nombre (A-Z)
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleSortChange({ target: { value: 'nombre-desc' } })}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:font-bold'
                                                                )}
                                                            >
                                                                Nombre (Z-A)
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleSortChange({ target: { value: 'precio-asc' } })}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:font-bold'
                                                                )}
                                                            >
                                                                Precio: Mayor a menor
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleSortChange({ target: { value: 'precio-desc' } })}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:font-bold'
                                                                )}
                                                            >
                                                                Precio: Menor a mayor
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                            <div className='grid h-full px-12 overflow-y-scroll mb-14'>
                                {/* Contenido */}
                                {contResumen.length === 0 ? (
                                    !showProduct && boton2 !== 'lista-boton-on' &&
                                    <p className='m-auto'>No se encontraron artículos</p>
                                ) : (
                                    <ul className={'grid h-max gap-2 duration-200 ' + cols}>
                                        {contenido}
                                    </ul>
                                )}
                                {showProduct && contResumen.filter(producto => producto.tipoProducto === 'venta').length === 0 &&
                                    <p className='m-auto'>No se encontraron productos.</p>
                                }
                                {boton2 === 'lista-boton-on' && contResumen.filter(producto => producto.tipoProducto === null).length === 0 &&
                                    <p className='m-auto'>No se encontraron servicios.</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={resumen}>
                        <div className={width}>
                            {/* {contResumen.filter(producto => producto.tipoProducto === 'venta').length === 0 ? ( */}
                            {contResumen.filter(producto => producto.tipoProducto === 'venta').length === 0 ? (
                                <h1 className='py-6 text-xl text-center'>No hay productos</h1>
                            ) : (
                                <>
                                    <h1 className='py-6 text-xl text-center'>Total artículos ({cantProductos})</h1>
                                    <hr className='w-full border-2 border-black' />
                                    <ul className='p-8'>{resumenList}</ul>
                                    <hr className='w-full mb-6 border-2 border-black' />
                                    <h1 className='px-6 mb-4 text-xl text-left'>Gastos de envío</h1>
                                    <p className='px-6 text-left text-gray-500 text-l'>Si tu compra supera $1,000 conseguiras gastos de envío gratis.</p>
                                    {precioTotal >= 1000 ? (
                                        <p className='text-right text-[#45b59c] text-l px-6'>Envío gratis.</p>
                                    ) : (
                                        <p className='text-right text-[#45b59c] text-l px-6'>Envío NO gratis.</p>
                                    )}
                                    <hr className='w-full my-6 border-2 border-black' />
                                    <div className='flex justify-between px-8'>
                                        <h1 className='text-xl'>Total:</h1>
                                        <h1 className='text-[#036d63] text-xl'>${precioTotal}</h1>
                                    </div>
                                    <div className='grid'>
                                        {log ? (
                                            <button onClick={handleComprarTodo} className='bg-[#ec5766] p-2 text-center text-white mx-6 rounded-xl my-2 duration-200 hover:bg-[#ffb5a7]'>Comprar</button>
                                        ) : (
                                            <button onClick={() => setLogin(!login)} className='bg-[#ec5766] p-2 text-center text-white mx-6 rounded-xl my-2 duration-200 hover:bg-[#ffb5a7]'>Comprar</button>
                                        )}
                                    </div>
                                </>
                            )}
                            {/* ):''} */}
                        </div>
                    </div>
                </div>
            </div>
            {login && <PopupLogin cerrar={() => setLogin(!login)} />}
            <Tooltip id="ver" />
        </>
    );
}

export default ListaDeseo;