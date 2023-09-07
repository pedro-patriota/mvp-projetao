import { Button, FormControl, FormLabel, Input, Link, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import SignUpImage from "../../assets/signup.svg";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import { UserSchema } from "../../../../backend/common/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/users";

export default function SignUp() {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const parse = UserSchema.safeParse({ fullName, email, password });

        if (parse.success) {
            await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, email, password }),
            })
                .then((response) => {
                    if (response.status === 404 || response.status === 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    } else {
                        toast.success("Conta criada!", {
                            position: "bottom-center",
                            theme: "light",
                        });

                        navigate("/singin");
                    }
                })
                .catch(() => {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });
        } else {
            toast.error("Preencha os campos corretamente", {
                position: "bottom-center",
                theme: "light",
            });
        }
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
                                gap: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                            }}>
                            <FormLabel>Nome completo</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Nome..."
                                required
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                            <FormLabel>Email</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Email..."
                                required
                                startDecorator={<AccountCircleIcon></AccountCircleIcon>}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <FormLabel>Senha</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Senha..."
                                required
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                startDecorator={<KeyIcon></KeyIcon>}
                            />
                            <Button
                                sx={{ width: "100%" }}
                                type="button"
                                onClick={() => handleSubmit()}>
                                Cadastrar
                            </Button>
                            <FormControl
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                }}></FormControl>
                        </Box>
                        <Typography color="neutral" fontSize="sm">
                            Já tem um conta? clique aqui para <Link href="/singin">entrar</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
