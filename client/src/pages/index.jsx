import Membresias from '../components/ui/Membresias.jsx'
import Popular from '../components/ui/Popular.jsx'
import Opiniones from '../components/ui/Opiniones.jsx'
import Start from '../components/ui/Start.jsx'
import { Helmet, HelmetProvider } from "react-helmet-async"
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx'
import Tarjetas from '../components/ui/Tarjetas.jsx'

const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../scripts/index.js"></script>
        </Helmet>
      </HelmetProvider>
      <LayoutPrincipal>

        <Start />
        {/* ENCABEZADO TRANSPARTE / SÓLIDO */}
        {/* LO MAS POPULAR */}
        <Popular />
        {/* MEMBRESIAS */}
        <Membresias />
        {/* RANGOS */}
        <Tarjetas />
        {/* OPINIONES */}
        <Opiniones />
        {/* CONTACTANOS / Footer */}

      </LayoutPrincipal>
    </>
  )
};

export default Home;