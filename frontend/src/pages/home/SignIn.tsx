import { Button, FormControl, FormLabel, Input, Link, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import React, { useState } from "react";
import SignInImage from "../../assets/signin.svg";
import Logo from "../../components/Logo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../../../../backend/common/user";

const URL = "http://localhost:3000/users/login";

export default function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const parse = UserSchema.pick({ email: true, password: true }).safeParse({
            email,
            password,
        });

        if (parse.success) {
            await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
                .then((response) => {
                    if (response.status === 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    } else if (response.status === 404) {
                        toast.warning("Email ou senha incorretos.", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    } else {
                        toast.success("Bem-vindo(a)!", {
                            position: "bottom-center",
                            theme: "light",
                        });

                        navigate("/app/casos");
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
                            <Typography level="h1">Entrar</Typography>
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
                                <FormLabel>Email</FormLabel>
                                <Input
                                    sx={{ width: "100%" }}
                                    placeholder="Email..."
                                    startDecorator={<AccountCircleIcon></AccountCircleIcon>}
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    sx={{ width: "100%" }}
                                    placeholder="Senha..."
                                    type="password"
                                    startDecorator={<KeyIcon></KeyIcon>}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Button sx={{ width: "100%" }} type="button" onClick={() => handleSubmit()}>
                            Entrar
                        </Button>
                        <Typography color="neutral" fontSize="sm">
                            Caso não tenha conta, clique aqui para se{" "}
                            <Link href="/signup">cadastrar</Link>
                        </Typography>
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
