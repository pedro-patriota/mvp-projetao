import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Stack, Typography } from "@mui/joy";
import { Check, Person } from "@mui/icons-material";
import { Navigate, useParams } from "react-router-dom";
import { Process } from "../../../../../backend/common/process";
import Barloader from "react-spinners/BarLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Case } from "../../../../../backend/common/case";

const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Coleta() {
    const { processId, casoId } = useParams();
    const [processData, setProcessData] = useState<Process | undefined>(undefined);
    const [caseData, setCaseData] = useState<Case | undefined>(undefined);

    const handleNextStep = () => {
        if (processData == undefined) return;

        if (
            processData.father == "false" ||
            processData.mother == "false" ||
            processData.son == "false"
        ) {
            toast.error("Colete todas as amostras antes de prosseguir.", {
                position: "bottom-center",
                theme: "light",
            });

            return;
        }

        window.location.replace(`/app/caso/${casoId}`);
    };

    const handleToggleMae = async () => {
        if (processData == undefined || casoId == undefined) return;

        const now = new Date().toUTCString();

        await fetch("http://localhost:3000/processes?id=" + processId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mother: processData.mother != "false" ? "false" : `${now}` }),
        }).then((res) => {
            console.log(res);

            if (res.status == 500) {
                toast.error("Colete todas as amostras antes de prosseguir.", {
                    position: "bottom-center",
                    theme: "light",
                });

                return;
            }

            setProcessData((current) => {
                if (current == undefined) {
                    return undefined;
                } else {
                    console.log(new Date(`${processData.mother}`));
                    return {
                        ...current,
                        mother: processData.mother != "false" ? "false" : `${now}`,
                    };
                }
            });
        });
    };

    const handleToggleFilho = async () => {
        if (processData == undefined || casoId == undefined) return;

        const now = new Date().toUTCString();

        await fetch("http://localhost:3000/processes?id=" + processId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ son: processData.son != "false" ? "false" : `${now}` }),
        }).then((res) => {
            console.log(res);

            if (res.status == 500) {
                toast.error("Colete todas as amostras antes de prosseguir.", {
                    position: "bottom-center",
                    theme: "light",
                });

                return;
            }

            setProcessData((current) => {
                if (current == undefined) {
                    return undefined;
                } else {
                    console.log(new Date(`${processData.son}`));
                    return {
                        ...current,
                        son: processData.son != "false" ? "false" : `${now}`,
                    };
                }
            });
        });
    };

    const handleTogglePai = async () => {
        if (processData == undefined || caseData == undefined) return;

        const now = new Date().toUTCString();

        await fetch("http://localhost:3000/processes?id=" + processId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                father: processData.father != "false" ? "false" : `${now}`,
                status: "FEITO",
            } as Partial<Process>),
        }).then(async (res) => {
            if (res.status == 500) {
                toast.error("Colete todas as amostras antes de prosseguir.", {
                    position: "bottom-center",
                    theme: "light",
                });

                return;
            }

            await fetch("http://localhost:3000/processes?id=" + caseData.processes[2], {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "FAZENDO" } as Partial<Process>),
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });

                        return;
                    }

                    setProcessData((current) => {
                        if (current == undefined) {
                            return undefined;
                        } else {
                            return {
                                ...current,
                                father: processData.father != "false" ? "false" : `${now}`,
                                status: "FEITO",
                            };
                        }
                    });
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });
        });
    };

    useEffect(() => {
        const loader = async () => {
            if (processId == undefined) return;

            await fetch("http://localhost:3000/processes?id=" + processId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((response: Process) => {
                    setProcessData(response);
                })
                .catch((e) => {
                    console.log(e);
                });

            await fetch("http://localhost:3000/cases?id=" + casoId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((response: Case) => {
                    setCaseData({
                        ...response,
                        processes: JSON.parse(response.processes as any as string),
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        loader();
    }, []);

    if (processData == undefined) {
        return (
            <Box
                sx={{
                    width: "100%",
                    flexGrow: 1,
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    paddingY: "1rem",
                    alignItems: "center",
                }}>
                <Box
                    sx={{
                        width: "90%",
                        height: "100%",
                        overflowY: "auto",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#d1d5db",
                        boxShadow:
                            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    <Barloader
                        color="#0B6BCB"
                        loading={true}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: "2rem",
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    width: "90%",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#d1d5db",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflowY: "auto",
                }}>
                <Typography level="body-lg">Coleta de amostras</Typography>
                <Typography level="body-sm">
                    Nesse processo você irá coletar as amostras da mãe, filho e pai.
                </Typography>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={() => handleToggleMae()}
                            startDecorator={processData.mother != "false" ? <Check /> : <Person />}
                            size="lg"
                            sx={{ width: "max-content" }}
                            variant={processData.mother != "false" ? "soft" : "solid"}>
                            Coletar amostra mãe
                        </Button>
                        {processData.mother != "false" ? (
                            <Typography level="body-xs" sx={{ placeSelf: "end" }}>
                                Coletado em: {new Date(processData.mother).toLocaleString()}
                            </Typography>
                        ) : null}
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={() => handleToggleFilho()}
                            startDecorator={processData.son != "false" ? <Check /> : <Person />}
                            size="lg"
                            sx={{ width: "max-content" }}
                            variant={processData.son != "false" ? "soft" : "solid"}>
                            Coletar amostra filho
                        </Button>
                        {processData.son != "false" ? (
                            <Typography level="body-xs" sx={{ placeSelf: "end" }}>
                                Coletado em: {new Date(processData.son).toLocaleString()}
                            </Typography>
                        ) : null}
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={() => handleTogglePai()}
                            startDecorator={processData.father != "false" ? <Check /> : <Person />}
                            size="lg"
                            sx={{ width: "max-content" }}
                            variant={processData.father != "false" ? "soft" : "solid"}>
                            Coletar amostra pai
                        </Button>
                        {processData.father != "false" ? (
                            <Typography level="body-xs" sx={{ placeSelf: "end" }}>
                                Coletado em: {new Date(processData.father).toLocaleString()}
                            </Typography>
                        ) : null}
                    </Stack>
                </Stack>
                <Button
                    sx={{ position: "absolute", bottom: "2rem", right: "2rem" }}
                    onClick={() => handleNextStep()}>
                    Finalizar
                </Button>
            </Box>
        </Box>
    );
}
