import React, { useState } from "react";
import { LoginScreen, RegisterScreen } from "../pages";
import { Routes, Route } from "react-router-dom";

const AuthComponents = (props) => {
    const { loginCbHandler } = props;

    return(
        <>
            <Routes>
                <Route path="" element={<LoginScreen loginCbHandler={loginCbHandler}></LoginScreen>} />
                <Route path="register" element={<RegisterScreen></RegisterScreen>} />
            </Routes>
        </>
    );
}

export default AuthComponents;