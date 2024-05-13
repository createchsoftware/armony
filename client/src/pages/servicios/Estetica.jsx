import ServiciosEstetica from "../../components/ui/servicios/ServiciosEstetica";
import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ServicioEstetica = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <script src="../../../public/scripts/index.js"></script>
        </Helmet>
      </HelmetProvider>
      <LayoutPrincipal>
        <ServiciosEstetica />
      </LayoutPrincipal>
    </>
  );
}
export default ServicioEstetica;