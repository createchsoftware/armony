import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

function LayoutPrincipal(props) {
    return (
        <div>
            <Navbar />
            {<div className="container">
                {props.children}
            </div>}
            <Footer />
        </div>
    );
}

export default LayoutPrincipal;