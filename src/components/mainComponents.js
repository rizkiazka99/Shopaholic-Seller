import React from "react";
import { ProductsScreen } from "../pages";
import { Routes, Route } from "react-router-dom";


const MainComponents = () => {
    return(
        <>
            <div className="container pt-3">
                <Routes>
                    <Route path='' element={<ProductsScreen></ProductsScreen>} />
                </Routes>
            </div>
        </>
    );
}

export default MainComponents;