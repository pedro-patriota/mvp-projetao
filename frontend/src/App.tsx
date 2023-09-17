//import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Casos from "./pages/app/Casos/Casos";
import AppLayout from "./layouts/AppLayout";
import SignIn from "./pages/home/SignIn";
import SignUp from "./pages/home/SignUp";
import HomeLayout from "./layouts/HomeLayout";
import Coleta from "./pages/app/Coleta/Coleta";
import Sequenciamento from "./pages/app/Sequenciamento/Sequenciamento";
import Sequenciamentos from "./pages/app/Sequenciamento/Sequenciamentos";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import Analise from "./pages/app/Analise/Analise";
import PaginaPacientes from "./pages/app/Pacientes/Pacientes";
import Paciente from "./pages/app/Pacientes/Paciente";
import Caso from "./pages/app/Casos/Caso";
import Cadastro from "./pages/app/Cadastro/Cadastro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FilesExample() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="home" element={<Navigate to="/" />}></Route>
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="signin" element={<SignIn />}></Route>
                        <Route path="signup" element={<SignUp />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Route>
                    <Route path="app" element={<AppLayout />}>
                        <Route path="casos" element={<Casos />}></Route>
                        <Route path="caso/:id" element={<Caso />}></Route>
                        <Route path="cadastro/:casoId/:step" element={<Cadastro />}></Route>
                        <Route path="analise/:casoId" element={<Analise />}></Route>
                        <Route
                            path="sequenciamento/:sequenciamentoId"
                            element={<Sequenciamento />}></Route>
                        <Route path="sequenciamentos" element={<Sequenciamentos />}></Route>
                        <Route
                            path="pacientes"
                            element={<PaginaPacientes></PaginaPacientes>}></Route>
                        <Route path="paciente/:pacientCPF" element={<Paciente></Paciente>}></Route>
                        <Route path="coleta/:casoId/:processId" element={<Coleta />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
