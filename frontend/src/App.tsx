import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Casos from "./pages/app/Casos";
import AppLayout from "./layouts/AppLayout";
import SignIn from "./pages/home/SignIn";
import SignUp from "./pages/home/SignUp";
import HomeLayout from "./layouts/HomeLayout";
import NovaColeta from "./pages/app/NovaColeta";
import SequenciadorSeletor from "./pages/app/SequenciadorSeletor";
import SequenciamentoLista from "./pages/app/SequenciamentoLista";

export default function FilesExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="singin" element={<SignIn />}></Route>
          <Route path="singup" element={<SignUp />}></Route>
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route path="casos" element={<Casos />}></Route>
          <Route path="nova-coleta" element={<NovaColeta />}></Route>
          <Route
            path="sequenciador-seletor"
            element={<SequenciadorSeletor />}
          ></Route>
          <Route
            path="sequenciador-lista"
            element={<SequenciamentoLista />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
