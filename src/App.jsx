import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import Navbar from './components/ui/Navbar.jsx'
import Hero from './components/ui/Hero.jsx'
import Presentacion from './components/ui/Presentacion.jsx'
import Membresias from './components/ui/Membresias.jsx'
import Popular from './components/ui/Popular.jsx'
import Foot from './components/ui/Foot.jsx'
import Tarjetas from './components/ui/Tarjetas.jsx'
import Comentarios from './components/ui/Comentarios.jsx'
import Opiniones from './components/ui/Opiniones.jsx'
import Productos from './components/ui/Productos.jsx'
import Button from './components/ui/Button.jsx'
import Start from './components/ui/Start.jsx'
// import Start from './components/ui/Start.jsx'

const heroCafeteria = {
  url: '../public/pictures/Cafeteria.png',
  title: 'Cafeteria',
  subtitle: 'Cultura & Art',
  description: 'Tu lugar de encuentro, donde el buen café y las sonrisas se mezclan.'
}


function App() {

  return (
    <>
      {/* ENCABEZADO TRANSPARTE / SÓLIDO */}
      <Start />
      {/* LO MAS POPULAR */}
      <Popular />
      {/* MEMBRESIAS */}
      <Membresias />
      {/* OPINIONES */}
      <Opiniones />
      {/* CONTACTANOS / Footer */}
      <Foot />


      {/*Pagina SPA */}
      {/* <Navbar />
      <Hero {...heroCafeteria} ></Hero >
      <Presentacion />
      <Productos />
      <Tarjetas />
      <Comentarios /> */}
    </>
  )
}


export default App
