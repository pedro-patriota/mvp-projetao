import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Casos from "./pages/app/Casos";
import AppLayout from "./layouts/AppLayout";

export default function FilesExample() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="app" element={<AppLayout />}>
                    <Route path="casos" element={<Casos />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
