import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";

import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import MenuIcon from "@mui/icons-material/Menu";

// custom
import Link from "@mui/joy/Link";
import { Outlet } from "react-router-dom";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import CssBaseline from "@mui/joy/CssBaseline";
import "./App.css";
import Button from "@mui/joy/Button";
import Logo from "../components/Logo";

import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <CssVarsProvider disableTransitionOnChange>
            {/* <div style={{ position: "absolute", bottom: 12, right: 12, zIndex: 2 }}>
                <ColorSchemeToggle />
            </div> */}
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
                        <Link href="/">Home</Link>
                        <Link href="about">Sobre</Link>
                        <Link href="info">Acesso à informação</Link>
                        <Link href="suporte">Suporte</Link>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
                        <Button variant="soft" onClick = {() => navigate("/signin") }>
                            Entrar
                        </Button>
                        <Button onClick = {() => navigate("/signup") }>
                            Cadastrar
                        </Button>
                    </Box>
                </Box>
                <Outlet></Outlet>
            </Box>
        </CssVarsProvider>
    );
}