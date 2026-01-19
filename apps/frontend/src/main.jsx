import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import "./main.css";

/***************
|   CONTAINERS  |
 ***************/
import { Home } from "./containers/Home/Home";
import { FormLogin } from "./containers/FormLogin/FormLogin";
import { FormRegister } from "./containers/FormRegister/FormRegister";


/***************
|   COMPONENTS  |
 ***************/
import { ValidateJWT } from "./components/ValidateJWT/ValidateJWT";
import { CheckJWT } from "./components/CheckJWT/CheckJWT";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import axios from "axios";

//config for axios for to sent the cookies
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>

                <Route element={<CheckJWT/>}>
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/register" element={<FormRegister/>}/> 
                </Route>
                

                {/* for protect all the routes */}
                <Route element={<ValidateJWT />}> 
                    <Route path="/home" element={<Home />} />

                    <Route path="/" element={<Navigate to="/home" replace />} />
                </Route>

                {/* for not found  */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>

        </AuthProvider>
        
    </BrowserRouter>
);
