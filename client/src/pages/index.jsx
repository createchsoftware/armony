import Membresias from '../components/ui/Membresias.jsx'
import Popular from '../components/ui/Popular.jsx'
import Foot from '../components/ui/Foot.jsx'
import Opiniones from '../components/ui/Opiniones.jsx'
import Start from '../components/ui/Start.jsx'
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <script src="../../scripts/index.js"></script>
      </Helmet>
      <Start />
      {/* ENCABEZADO TRANSPARTE / SÓLIDO */}
      {/* LO MAS POPULAR */}
      <Popular />
      {/* MEMBRESIAS */}
      <Membresias />
      {/* OPINIONES */}
      <Opiniones />
      {/* CONTACTANOS / Footer */}
      <Foot />
    </>
  )
};

export default Home;