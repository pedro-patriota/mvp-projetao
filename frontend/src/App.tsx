import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Casos from "./pages/app/Casos";
import AppLayout from "./layouts/AppLayout";
import SignIn from "./pages/home/SignIn";
import SignUp from "./pages/home/SignUp";
import HomeLayout from "./layouts/HomeLayout";
import NovaColeta from "./pages/app/NovaColeta";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FilesExample() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="singin" element={<SignIn />}></Route>
                        <Route path="singup" element={<SignUp />}></Route>
                    </Route>
                    <Route path="app" element={<AppLayout />}>
                        <Route path="casos" element={<Casos />}></Route>
                        <Route path="nova-coleta" element={<NovaColeta />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
