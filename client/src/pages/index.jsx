import Membresias from '../components/ui/Membresias.jsx'
import Popular from '../components/ui/Popular.jsx'
// import Foot from '../components/ui/Footer.jsx'
import Opiniones from '../components/ui/Opiniones.jsx'
import Start from '../components/ui/Start.jsx'
// import { Helmet } from "react-helmet";
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx'

const Home = () => {
  return (
    <>
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