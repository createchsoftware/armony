import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import { Helmet, HelmetProvider } from "react-helmet-async";

function LayoutPrincipal(props) {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <script src="../../scripts/index.js"></script>
                </Helmet>
            </HelmetProvider>
            <div>
                <Navbar />
                {<div className="container">
                    {props.children}
                </div>}
                <Footer />
            </div>
        </>
    );
}

export default LayoutPrincipal;