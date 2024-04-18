import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import Spa from "./pages/spa";
import Favicon from "react-favicon";
 
function App() {
    return (
        <>
        <Favicon url="/favicon.ico" />
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/spa" element={<Spa />} />
            </Routes>
        </Router>
        </>
    );
}
 
export default App;