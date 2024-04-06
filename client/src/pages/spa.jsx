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
import Favoritos from '../components/ui/Favoritos.jsx'
import Button from '../components/ui/Button.jsx'
import Start from '../components/ui/Start.jsx'
import { Helmet } from "react-helmet";



const Spa = () => {
  return (
    <>
      {/*Pagina SPA */}
      <Helmet>
        <script src="../../scripts/index.js"></script>
      </Helmet>
      <Hero />
      <Presentacion />
      <Favoritos />
      <Productos />
      <Tarjetas />
      <Comentarios />
      <Foot />
    </>
  )
};

export default Spa;