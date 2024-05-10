import { ChevronRight } from 'lucide-react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function Ofertas({ producto }) {
    return (
        <div className='m-2 font-[abeatbyKai]'>
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
            <a href="/spa"><img className='w-60 h-60' src={producto.imagen} alt="" /></a>
            <hr />
            <p className='text-[#0BC26A] pt-4 text-lg text-center'>{'$' + producto.precio + ' MXN'}</p>
            <div className='flex justify-center'>
                <Rating className='' value={5} readOnly unratedcolor="amber" ratedcolor="amber" />
            </div>
            <h6 className='pt-2 text-xl font-bold text-center'>{producto.nombre}</h6>
            <p className='text-center'>{producto.descripcion}</p>
            <div className='mt-2'>
                <button className=" text-xs transition-all duration-300 px-2 m-auto hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agregar</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
            </div>
        </div>
    )
}

export default Ofertas;