import Membresias from '../components/ui/Membresias.jsx'
import Navbar from '../components/ui/Navbar.jsx'
import Popular from '../components/ui/Popular.jsx'
import Foot from '../components/ui/Foot.jsx'
import Opiniones from '../components/ui/Opiniones.jsx'
import Start from '../components/ui/Start.jsx'
import { Helmet, HelmetProvider } from "react-helmet-async";
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx';

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
        {/* OPINIONES */}
        <Opiniones />
        {/* CONTACTANOS / Footer */}

      </LayoutPrincipal>
    </>
  )
};

export default Home;