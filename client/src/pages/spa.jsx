import Navbar from '../components/ui/Navbar.jsx'
import Hero from '../components/ui/Hero.jsx'
import Presentacion from '../components/ui/Presentacion.jsx'
import Foot from '../components/ui/Footer.jsx'
import Tarjetas from '../components/ui/Tarjetas.jsx'
import Comentarios from '../components/ui/Comentarios.jsx'
import NuestrosProductos from '../components/ui/NuestrosProductos.jsx'
import Favoritos from '../components/ui/Favoritos.jsx'
import { Helmet } from "react-helmet";



const Spa = () => {
  return (
    <>
      {/*Pagina SPA */}
      <Helmet>
        <script src="../../scripts/index.js"></script>
      </Helmet>
      <Navbar />
      <Hero />
      <Presentacion />
      <Favoritos />
      <NuestrosProductos />
      <Tarjetas />
      <Comentarios />
      <Foot />
    </>
  )
};

export default Spa;