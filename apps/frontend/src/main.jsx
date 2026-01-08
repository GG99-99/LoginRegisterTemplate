import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import "./main.css";
import { Home } from "./containers/Home/Home";
import { FormLogin } from "./containers/FormLogin/FormLogin";

import { ValidateJWT } from "./components/ValidateJWT/ValidateJWT";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<FormLogin />} />

			{/* for protect all the routes */}
            <Route element={<ValidateJWT />}> 
                <Route path="/home" element={<Home />} />

                <Route path="/" element={<Navigate to="/home" replace />} />
            </Route>

            {/* for not found  */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);
