import React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";

import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import MenuIcon from "@mui/icons-material/Menu";

// custom
import Link from "@mui/joy/Link";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import CssBaseline from "@mui/joy/CssBaseline";
import "./App.css";

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
            <div style={{ position: "absolute", bottom: 12, right: 12, zIndex: 2 }}>
                <ColorSchemeToggle />
            </div>
            <CssBaseline />
            <Layout.Root
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <Layout.Header sx={{ paddingX: "1.5rem" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                        }}>
                        <IconButton variant="outlined" size="sm" sx={{ display: { sm: "none" } }}>
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            size="sm"
                            variant="soft"
                            sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                            <FindInPageRoundedIcon />
                        </IconButton>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Typography component="h1" fontWeight="xl" textColor="primary.500">
                                Geno
                            </Typography>
                            <Typography component="h1" fontWeight="xl">
                                flow
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2.5 }}>
                        <Link href="#basics">Painel</Link>
                        <Link href="#basics">Coleta</Link>
                        <Link href="#basics">Analise</Link>
                        <Link href="#basics">Casos</Link>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
                        <Menu
                            id="app-selector"
                            control={
                                <Avatar sx={{ cursor: "pointer" }}>
                                    <Typography component="span" fontWeight="xs">
                                        C
                                    </Typography>
                                </Avatar>
                            }
                            menus={[
                                {
                                    label: "Configurações",
                                    href: "/joy-ui/getting-started/templates/team/",
                                },
                                {
                                    label: "Sair",
                                    active: true,
                                    "aria-current": "page",
                                    href: "/joy-ui/getting-started/templates/files/",
                                },
                            ]}
                        />
                    </Box>
                </Layout.Header>
                <Outlet></Outlet>
            </Layout.Root>
        </CssVarsProvider>
    );
}
