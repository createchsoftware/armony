import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/FooterSecundario";
import { Helmet, HelmetProvider } from "react-helmet-async";

function LayoutSecundario(props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../scripts/index.js"></script>
        </Helmet>
      </HelmetProvider>
      <div>
        <Navbar />
        {<div>{props.children}</div>}
        <Footer />
      </div>
    </>
  );
}

export default LayoutSecundario;
