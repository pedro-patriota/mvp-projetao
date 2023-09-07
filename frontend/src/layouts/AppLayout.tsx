import React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
// custom
import { Outlet } from "react-router-dom";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import CssBaseline from "@mui/joy/CssBaseline";
import "./App.css";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Logo from "../components/Logo";

function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton variant="soft" color="neutral" />;
    }
    return (
        <IconButton
            id="toggle-mode"
            variant="soft"
            color="neutral"
            onClick={() => {
                if (mode === "light") {
                    setMode("dark");
                } else {
                    setMode("light");
                }
            }}>
            {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function AppLayout() {
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
                        <Link href="#basics" fontWeight="lg">
                            Dashboard
                        </Link>
                        <Link href="#basics" fontWeight="lg">
                            Cadastro
                        </Link>
                        <Link href="#basics" fontWeight="lg">
                            Novo Caso
                        </Link>
                        <Link href="#basics" fontWeight="lg">
                            Analise
                        </Link>
                        <Link href="#basics" fontWeight="lg">
                            Casos
                        </Link>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
                        <Button variant="soft">Costa</Button>
                        <Button>Sair</Button>
                    </Box>
                </Box>
                <Outlet></Outlet>
            </Box>
        </CssVarsProvider>
    );
}
