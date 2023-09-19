import React from "react";
import Box from "@mui/joy/Box";
import { Outlet, useNavigate } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import "./App.css";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Logo from "../components/Logo";

export default function AppLayout() {
    const navigate = useNavigate();

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        paddingX: "1.5rem",
                        paddingY: "0.5rem",
                        justifyContent: "space-between",
                        boxShadow:
                            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                        }}>
                        <Logo />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2.5 }}>
                        <Link href="/app/casos" fontWeight="lg">
                            Casos
                        </Link>
                        <Link href="/app/pacientes" fontWeight="lg">
                            Pacientes
                        </Link>
                        <Link href="/app/sequenciamentos" fontWeight="lg">
                            Sequenciamentos
                        </Link>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
                        <Button variant="soft">Costa</Button>
                        <Button onClick={() => navigate("/signin")}>Sair</Button>
                    </Box>
                </Box>
                <Outlet></Outlet>
            </Box>
        </CssVarsProvider>
    );
}
