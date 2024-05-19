import LayoutPrincipal from "../layouts/LayoutPrincipal";
import { ChevronRight } from 'lucide-react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconoAgregarAlCarrito } from '../components/ui/Iconos.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Filtros from '../components/ui/Filtros.jsx'
import Ofertas from '../components/ui/Ofertas.jsx'
import Reseña from "../components/ui/Reseña.jsx";
import { faTrash, faCircleXmark, faCircleMinus, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCarrito } from '../components/ui/Carrito.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from "react-router-dom";
import PagoProducto from './PagoProducto';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../components/ui/ScrollToTop';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const reseñas = [
    {
        id: 1,
        nombre: 'Luisa',
        calificacion: 5,
        titulo: 'Excelente producto',
        comentario: 'Me encantó el producto, lo recomiendo mucho.',
    },
    {
        id: 2,
        nombre: 'Ana',
        calificacion: 4,
        titulo: 'Buena calidad',
        comentario: 'Buena calidad, aunque un poco caro.',
    },
    {
        id: 3,
        nombre: 'Pedro',
        calificacion: 3,
        titulo: 'Regular',
        comentario: 'No es lo que esperaba, pero está bien.',
    },
    {
        id: 4,
        nombre: 'María',
        calificacion: 2,
        titulo: 'No me gustó',
        comentario: 'No me gustó el producto, no lo recomiendo.',
    },]

const ofertas = [
    {
        id: 1,
        nombre: 'Esponjabon',
        precio: 10,
        descripcion: 'Esponjabon floor para baño, formul...',
        imagen: '../../pictures/oferta1.png'
    },
    {
        id: 2,
        nombre: 'Body butter',
        precio: 20,
        descripcion: 'Crema corporal, artesanal, 239 ml.',
        imagen: '../../pictures/oferta2.png'
    },
    {
        id: 3,
        nombre: 'Tónito facial',
        precio: 15,
        descripcion: 'Tónito facial dermatológico...',
        imagen: '../../pictures/oferta3.png'
    },
    {
        id: 4,
        nombre: 'Mascarilla',
        precio: 25,
        descripcion: 'Combina el poder de la arcilla verde...',
        imagen: '../../pictures/oferta4.png'
    },
]

const initialProduct = {
    id: 1,
    nombre: 'Producto 1',
    precio: 10,
    descripcion: 'Descripción del producto',
    valoracion: 5,
    imagen: './pictures/producto1.png',
    cantidad: 1,
}

function Producto() {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state.product || {};

    console.log(product);

    const navigate = useNavigate();
    const notify = () => toast("Producto agregado al carrito");

    // const [product, setProduct] = useState(initialProduct);
    const [cantidad, setCantidad] = useState(1);
    const [selectedRatingIndex, setSelectedRatingIndex] = useState(null);
    const [generalRating, setGeneralRating] = useState(null);
    const [filteredReviews, setFilteredReviews] = useState(reseñas);
    const [newReviewClicked, setNewReviewClicked] = useState(false);
    const [reviewButtonMessage, setReviewButtonMessage] = useState('Escribir una reseña');
    const [reviewRating, setReviewRating] = useState(0);

    const { agregarAlCarrito } = useCarrito();


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Si los datos no vienen en el estado de navegación, puedes hacer una
    // llamada a la API para obtener los datos del producto basado en el id.
    // Ejemplo:
    // useEffect(() => {
    //   if (!product) {
    //     fetchProductById(id).then(setProduct);
    //   }
    // }, [id, product]);

    if (!product) {
        return <div>Cargando ...</div>; // O manejar de alguna otra forma
    }

    // Función para manejar el evento de agregar al carrito
    const handleAddCart = () => {
        notify();
        const producto = {
            id: product.id,
            nombre: product.nombre,
            precio: parseFloat(product.precio),
            cantidad: cantidad,
            descripcion: product.descripcion,
            valoracion: product.valoracion,
            imagen: product.imagen,
        };
        agregarAlCarrito(producto);
    };

    // Función para manejar el evento de comprar
    const handleComprar = () => {
        // navigate('/spa/comprar');
        const producto = {
            id: product.id,
            nombre: product.nombre,
            precio: parseFloat(product.precio),
            cantidad: cantidad,
            descripcion: product.descripcion,
            valoracion: product.valoracion,
            imagen: product.imagen,
        };
        navigate('/spa/comprar', { state: { producto: [producto] } });
    };

    // Función para manejar cambios en el nuevo rating de la reseña
    const handleReviewRating = (event) => {
        setReviewRating(event.target.value);
    };

    const handleNewReview = () => {
        setNewReviewClicked(!newReviewClicked);
        if (newReviewClicked) {
            setReviewButtonMessage('Escribir una reseña');
        } else {
            setReviewButtonMessage('Cancelar reseña nueva');
        }
    };

    const increaseQuantity = () => {
        setCantidad(cantidad + 1);
    };

    const decreaseQuantity = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const handleSelectedRating = (index) => () => {
        setSelectedRatingIndex(index);
    };

    useEffect(() => {
        if (selectedRatingIndex === null) {
            setFilteredReviews(reseñas);
            return;
        }
        setFilteredReviews(reseñas.filter(reseña => reseña.calificacion === selectedRatingIndex));
    }, [selectedRatingIndex]);

    return (
        <LayoutPrincipal>
            <main className="flex flex-col gap-12 my-24">
                <section className=' flex  rounded-3xl w-[80%] overflow-hidden m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <div className="text-white bg-[#056761] w-1/2 px-6 pb-12 pt-4 grid place-content-center gap-6">
                        <a className='flex items-baseline text-md gap-x-4' href="/spa/productos"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg> Volver
                        </a>
                        <img className="w-[100%] aspect-square" src={product.imagen} alt="" />
                        <div className="flex justify-center gap-4">
                            <img className="w-14 aspect-square h-14" src={product.imagen} alt="" />
                            <img className="w-14 aspect-square h-14" src={product.imagen} alt="" />
                            <img className="w-14 aspect-square h-14" src={product.imagen} alt="" />
                            <img className="w-14 aspect-square h-14" src={product.imagen} alt="" />
                            <img className="w-14 aspect-square h-14" src={product.imagen} alt="" />
                        </div>
                    </div>
                    <div className="grid w-1/2 gap-0 p-12">
                        <div>
                            <Box
                                className="float-right"
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <StyledRating
                                    name="customized-color"
                                    defaultValue={0}
                                    max={1}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={1}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                />
                            </Box>
                            <h1 className="text-[#056761] text-3xl font-bold">{product.nombre}</h1>
                            <hr className="my-4 text-black bg-black border-2 rounded-full border-gray" />
                            <div className="flex mb-4 justify-items-center">
                                <Rating className='' value={product.valoracion} readOnly unratedColor="amber" ratedColor="amber" />
                                <p>Valoraciones</p>
                            </div>
                            <p className="text-[#056761] my-6 text-2xl font-bold">{product.precio}</p>

                            <p className="text-[#056761] text-xl">Detalles</p>
                            <p className="text-xl">{product.descripcion}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 ">
                            <button className="flex gap-4 bg-[#D9D9D9]  w-full rounded-full items-center justify-center">
                                <button onClick={decreaseQuantity} className="">
                                    <FontAwesomeIcon icon={faCircleMinus} onClick={decreaseQuantity} />
                                </button>
                                <span>{cantidad}</span>
                                <button onClick={increaseQuantity} className="">
                                    <FontAwesomeIcon icon={faCirclePlus} onClick={increaseQuantity} />
                                </button>
                            </button>
                            <button onClick={handleAddCart} className="text-[#EB5765] w-full bg-opacity-30 bg-[#EB5765] hover:bg-opacity-90 hover:text-white rounded-full">
                                Agregar al carrito
                            </button>
                            <button onClick={handleComprar} className="bg-[#EB5765] col-span-2 text-white rounded-full hover:bg-opacity-80 hover:text-white w-full">
                                Comprar ahora
                            </button>
                        </div>
                    </div>
                </section>

                <hr className="my-4 text-black bg-black border-2 rounded-full border-gray w-[80%] m-auto" />

                <section className=' rounded-2xl w-[80%] m-auto px-6 py-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <h1 className='pb-4 ml-12 text-2xl'>Productos Similares</h1>
                    <section className=' w-[100%] bg-white m-auto rounded-xl border-8 border-[#E2B3B7] py-6'>
                        <hr />
                        <div className='mx-auto p-6 md:mx-28 md:p-0 selection:bg-[#EB5765] selection:text-white'>
                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlay
                                autoPlaySpeed={3000}
                                centerMode={false}
                                className="z-0"
                                containerclassName="container-with-dots z-0"
                                dotListclassName=""
                                // draggable
                                focusOnSelect={false}
                                infinite
                                itemclassName=""
                                keyBoardControl
                                minimumTouchDrag={80}
                                pauseOnHover
                                renderArrowsWhenDisabled={false}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                responsive={{
                                    desktop: {
                                        breakpoint: {
                                            max: 3000,
                                            min: 1024
                                        },
                                        items: 4,
                                        partialVisibilityGutter: 40
                                    },
                                    mobile: {
                                        breakpoint: {
                                            max: 464,
                                            min: 0
                                        },
                                        items: 1,
                                        partialVisibilityGutter: 30
                                    },
                                    tablet: {
                                        breakpoint: {
                                            max: 1024,
                                            min: 464
                                        },
                                        items: 2,
                                        partialVisibilityGutter: 30
                                    }
                                }}
                                rewind={false}
                                rewindWithAnimation={false}
                                rtl={false}
                                shouldResetAutoplay
                                showDots={false}
                                sliderclassName=""
                                slidesToSlide={1}
                                swipeable
                            // className=''
                            >
                                {ofertas.map(oferta => (
                                    <Ofertas key={oferta.id} producto={oferta} />
                                ))}

                            </Carousel>
                        </div>
                    </section>
                </section>

                <hr className="my-4 text-black bg-black border-2 rounded-full border-gray w-[80%] m-auto" />

                <section className=' flex justify-around rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <div className="grid w-full gap-6 px-12">
                        <h1 className="text-3xl">Reseñas de Clientes</h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center gap-12">
                                <div className="text-center">
                                    <p className="text-3xl font-medium text-gray-500 ms-1 dark:text-gray-400">4.95</p>
                                    <Rating className='' value={selectedRatingIndex} readOnly unratedColor="amber" ratedColor="amber" />
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{5} Reseñas</p>
                                </div>
                                <div className="w-56">
                                    {['5', '4', '3', '2', '1'].map((label, index) => (
                                        <div className="flex items-center mt-1" key={index} onClick={handleSelectedRating(parseInt(label))}>
                                            <a href="#" className="text-sm font-medium hover:underline">{label}</a>
                                            <div className="w-2/4 h-4 mx-4 bg-gray-200 rounded-full dark:bg-gray-700 hover:cursor-pointer">
                                                <div className="h-4 bg-[#EB5765] rounded-full" style={{ width: `${(5 - index) * 20 - 10}%` }}></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{`${(5 - index) * 20 - 10}%`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleNewReview} className="text-[#EB5765] bg-opacity-30 bg-[#EB5765] hover:bg-opacity-90 hover:text-white rounded-3xl py-2 px-6 mr-12">{reviewButtonMessage}</button>
                        </div>
                        <div>
                            {newReviewClicked ? (
                                <>
                                    <main className='grid gap-4'>
                                        <div className="flex items-center gap-4">
                                            <form className="grid gap-1">
                                                <p>Selecciona una valoración:</p>
                                                <Rating className='' onChange={handleReviewRating} value={reviewRating} unratedColor="amber" ratedColor="amber" />
                                                <div className="flex gap-8 mt-4">
                                                    <div className="flex items-start gap-4">
                                                        <label className="pt-2">Titulo:</label>
                                                        <input className="rounded-md resize-none" type="text" maxLength={20} placeholder="" />
                                                    </div>
                                                    <div className="flex items-start gap-4">
                                                        <label className="pt-2">Comentario:</label>
                                                        <textarea rows={4} cols={60} name="" maxLength={255} className="rounded-md resize-none " placeholder=""></textarea>
                                                    </div>
                                                </div>
                                                <button className="text-[#EB5765] w-1/4 mt-6  m-auto bg-opacity-30 bg-[#EB5765] hover:bg-opacity-90 hover:text-white rounded-3xl py-2 px-6">Enviar</button>
                                            </form>
                                        </div>
                                    </main>
                                </>) : null}
                            {filteredReviews.map(reseña => (
                                <Reseña key={reseña.id} reseña={reseña} />
                            ))}

                        </div>
                    </div>
                </section>
            </main>
            <ToastContainer position={'bottom-right'} theme={'light'} />
        </LayoutPrincipal >
    );
}

export default Producto;