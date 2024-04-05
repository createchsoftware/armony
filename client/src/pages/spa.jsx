import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import Navbar from '../components/ui/Navbar.jsx'
import Hero from '../components/ui/Hero.jsx'
import Presentacion from '../components/ui/Presentacion.jsx'
import Membresias from '../components/ui/Membresias.jsx'
import Popular from '../components/ui/Popular.jsx'
import Foot from '../components/ui/Foot.jsx'
import Tarjetas from '../components/ui/Tarjetas.jsx'
import Comentarios from '../components/ui/Comentarios.jsx'
import Opiniones from '../components/ui/Opiniones.jsx'
import Productos from '../components/ui/Productos.jsx'
import Button from '../components/ui/Button.jsx'
import Start from '../components/ui/Start.jsx'
 
const heroCafeteria = {
    url: '../videos/3Spa.mp4',
    title: 'Spa',
    subtitle: 'Salon & Beauty',
    description: 'Relájate y déjate llevar por la serenidad mientras nuestros expertos cuidan de tú bienestar en nuestro spa exclusivo.'
  }
  

const Spa = () => {
    return (
        <>
          {/*Pagina SPA */}
      <Navbar />
      <Hero {...heroCafeteria} ></Hero >
      <Presentacion />
      <Productos />
      <Tarjetas />
      <Comentarios />
      <Foot />
        </>
      )
};
 
export default Spa;