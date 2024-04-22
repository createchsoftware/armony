import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages";
import Spa from "./pages/spa";
import Error from "./pages/Error"
import Favicon from "react-favicon";
 
function App() {
    return (
        <>
        <Favicon url="/favicon.ico" />
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/spa" element={<Spa />} />

                <Route path="/error" element={<Error />}/>
                <Route path="*" element={<Navigate to="/error" replace />} />
            </Routes>
        </Router>
        </>
    );
}
 
export default App;