//import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Casos from "./pages/app/Casos";
import AppLayout from "./layouts/AppLayout";
import SignIn from "./pages/home/SignIn";
import SignUp from "./pages/home/SignUp";
import HomeLayout from "./layouts/HomeLayout";
import NovaColeta from "./pages/app/Cadastro/Cadastro";
//import HomeCadastro from "./pages/app/Cadastro/HomeCadastro";
import SequenciadorSeletor from "./pages/app/SequenciadorSeletor";
import SequenciamentoLista from "./pages/app/SequenciamentoLista";
import NotFound from "./pages/NotFound";
//import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FilesExample() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "home" element = { <Navigate to = "/"/> }></Route>
                <Route path = "/" element = {<HomeLayout />} >
                    <Route path = "signin" element = {<SignIn />}></Route>
                    <Route path = "signup" element = {<SignUp />}></Route>
                    <Route path = "*" element = {<NotFound />}></Route>
                </Route>
                <Route path = "app" element = {<AppLayout />}>
                    <Route path = "casos" element = {<Casos />}></Route>
                    <Route path = "cadastro">
                        <Route path = "nova-coleta" element = {<NovaColeta />}></Route>
                    </Route>
                    <Route
                      path="sequenciador-seletor"
                      element = {<SequenciadorSeletor />}
                    ></Route>
                    <Route
                      path = "sequenciador-lista"
                      element = {<SequenciamentoLista />}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
