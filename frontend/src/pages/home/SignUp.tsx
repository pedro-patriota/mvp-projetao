import { Button, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import SignUpImage from "../../assets/signup.svg";
import React from "react";
import Logo from "../../components/Logo";

export default function SignUp() {
    return (
        <Box
            sx={{
                paddingX: "4rem",
                paddingY: "2rem",
                width: "100vw",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}>
                <Box
                    sx={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: "neutral",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <img
                        src={SignUpImage}
                        loading="lazy"
                        alt="singin-image"
                        style={{ width: "28rem", objectFit: "cover" }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem",
                    }}>
                    <Box
                        sx={{
                            width: "100%",
                            maxHeight: "max-content",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#d1d5db",
                            boxShadow:
                                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                            paddingX: "2rem",
                            paddingY: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            alignItems: "center",
                        }}>
                        <Box
                            sx={{
                                width: "100%",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>
                            <Typography level="h1">Cadastrar</Typography>
                            <Logo />
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                            }}>
                            <FormControl
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                }}>
                                <FormLabel>Nome completo</FormLabel>
                                <Input sx={{ width: "100%" }} placeholder="Nome..." />
                                <FormLabel>Email</FormLabel>
                                <Input
                                    sx={{ width: "100%" }}
                                    placeholder="Email..."
                                    startDecorator={<AccountCircleIcon></AccountCircleIcon>}
                                />
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    sx={{ width: "100%" }}
                                    placeholder="Senha..."
                                    type="password"
                                    startDecorator={<KeyIcon></KeyIcon>}
                                />
                            </FormControl>
                        </Box>
                        <Button sx={{ width: "100%" }}>Cadastrar</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
