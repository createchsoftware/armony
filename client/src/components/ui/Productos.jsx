import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function Productos({ productos }) {
    return (
        <div className="w-2/3 m-auto md:w-auto">
            <ul className='grid grid-cols-1 gap-2 md:grid-cols-4 md:ml-28'>
                {
                    productos.map(producto => (
                        <li key={productos.id} className='grid place-content-between justify-between border-4 bg-white border-[#E2B3B7] p-6 py-2 rounded-xl'>
                            <Box
                                className="float-right "
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
                            <img className='w-2/3 m-auto mb-4 rounded-lg aspect-square'
                                src={'https://i.imgur.com/CCBFmSi.png'}
                                alt={producto.nombre}
                            />
                            <div>
                                <p className='mt-2  text-[#0BC26A] text-lg'>{'$' + producto.precio + ' MXN'}</p>
                                <Rating className='' value={5} readOnly unratedColor="amber" ratedColor="amber" />
                                <h3 className='mt-0 text-lg'>{producto.nombre}</h3>
                                <p className='mt-0 text-xs text-justify'>
                                    {producto.descripcion}
                                </p>
                            </div>
                            <div className='mt-2'>
                                <button className=" text-xs transition-all duration-300 px-10  hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agregar</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Productos