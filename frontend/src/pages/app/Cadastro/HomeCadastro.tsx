import { Button, FormControl, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import SignInImage from "../../../assets/signin.svg";

export default function HomeCadastro() {
    const navigate = useNavigate();

    const navigateTo = (variable: any) => {
        navigate("nova-coleta", { state: { type: variable } });
    };

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
                        width: "100%",
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
                            paddingX: "4rem",
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
                            <Typography level="h1">Cadastro de Usuários</Typography>
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
                                <Button
                                    sx={{
                                        width: "100%",
                                        fontSize: "1.5rem",
                                    }}
                                    onClick={() => navigateTo("Pai")}>
                                    Pai
                                </Button>
                                <Button
                                    sx={{
                                        width: "100%",
                                        fontSize: "1.5rem",
                                    }}
                                    onClick={() => navigateTo("Mãe")}>
                                    Mãe
                                </Button>
                                <Button
                                    sx={{
                                        width: "100%",
                                        fontSize: "1.5rem",
                                    }}
                                    onClick={() => navigateTo("Filho(a)")}>
                                    Filho(a)
                                </Button>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "primary",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <img
                        src={SignInImage}
                        loading="lazy"
                        alt="signin-image"
                        style={{ width: "28rem", objectFit: "cover" }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
