import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Case } from "../../../../../backend/common/case";
import { Process, ProcessName } from "../../../../../backend/common/process";
import { Box, Button, Stack, Table, Typography } from "@mui/joy";
import Modal from '@mui/material/Modal';
import Barloader from "react-spinners/BarLoader";
import { AdsClick, Visibility } from "@mui/icons-material";
import { StyledModalBackdrop } from "@mui/joy/Modal/Modal";
import {ModalCadastro} from "../Cadastro/ModalCadastro";

const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const URL = "http://localhost:3000/cases?id=";

interface CasoRowProps {
    id: string;
    caseData: Case;
}

function CasoRow({ id, caseData }: CasoRowProps) {
    const [processData, setProcessData] = useState<(Process & { updatedAt: string }) | undefined>(
        undefined
        );
        
        const navigate = useNavigate();
        
        useEffect(() => {
            const loader = async () => {
            await fetch("http://localhost:3000/processes?id=" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (res) => {
                if (res.status === 500) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                        });
                        
                        return;
                    }
                    
                    await res
                    .json()
                    .then((response: Process) => {
                        setProcessData({ ...response } as Process & { updatedAt: string });
                        })
                        .catch(() => {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });
                        });
                    })
                    .catch(() => {
                        toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });
        };

        loader();
    }, []);

    
    
    const handleAction = async () => {
        if (processData == undefined) return;
        
        const actions: Record<ProcessName, () => Promise<void>> = {
            CADASTRO: async () => {
                navigate(`/app/cadastro/${caseData.id}/mother`);
            },
            COLETA: async () => {
                navigate(`/app/coleta/${caseData.id}/${id}`);
            },
            ANALISE: async () => {},
            SEQUENCIAMENTO: async () => {},
            DOCUMENTAÇÃO: async () => {},
            CONCLUÍDO: async () => {},
        };
        await actions[processData.name]();
    };

    const [open, setOpen] = React.useState(true);
    const handleSee = async () => {
        if (processData == undefined) return;
        const actions: Record<ProcessName, () => Promise<void>> = {
            CADASTRO: async () => {
                
                ModalCadastro();                
            },
            COLETA: async () => {},
            ANALISE: async () => {},
            SEQUENCIAMENTO: async () => {},
            DOCUMENTAÇÃO: async () => {},
            CONCLUÍDO: async () => {},
        };
        await actions[processData.name]();
    };

    return (
        <tr>
            
            <td>{processData == undefined ? "CARREGANDO..." : processData.name}</td>
            <td>
                {processData == undefined
                    ? "CARREGANDO..."
                    : new Date(processData.updatedAt).toLocaleString()}
            </td>
            <td>
                {processData == undefined ? (
                    "CARREGANDO..."
                ) : (
                    <>
                        <Typography
                            sx={{ width: "max-content", paddingX: "1rem", placeSelf: "center" }}
                            variant="solid"
                            color={
                                processData.status == "PENDENTE"
                                    ? "neutral"
                                    : processData.status == "FAZENDO"
                                    ? "primary"
                                    : "success"
                            }>
                            {processData.status}
                        </Typography>
                    </>
                )}
            </td>
            <td>{processData == undefined ? "CARREGANDO..." : processData.detalhes}</td>
            <td>
                <Box sx={{ display: "flex", gap: 1 }}>
                    {processData == undefined || processData.name != "CONCLUÍDO" ? (
                        <Button
                            onClick={() => handleAction()}
                            startDecorator={<AdsClick />}
                            size="sm"
                            variant="soft"
                            color="success"
                            disabled={
                                processData == undefined ||
                                processData.status == "FEITO" ||
                                processData.status == "PENDENTE"
                            }>
                            Fazer
                        </Button>
                    ) : (
                        <></>
                    )}

                    <Button
                        startDecorator={<Visibility />}
                        onClick={() => handleSee()}
                        size="sm"
                        variant="soft"
                        color="primary"
                        disabled={processData == undefined || processData.status != "FEITO"}>
                        Ver
                    </Button>
                </Box>
            </td>
        </tr>
    );
}

export default function Caso() {
    const [caseData, setCaseData] = React.useState<Case | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(true);
    const { id } = useParams();

    useEffect(() => {
        const loader = async () => {
            if (id == undefined) return;

            await fetch(URL + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(async (res) => {
                    if (res.status === 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });

                        return;
                    }

                    await res
                        .json()
                        .then((response) => {
                            setCaseData({
                                ...response,
                                processes: JSON.parse(response.processes),
                            } as Case & { updatedAt: string });
                            setLoading(false);
                        })
                        .catch(() => {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });
                        });
                })
                .catch(() => {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });
        };

        loader();
    }, []);

    useEffect(() => {
        const loader = async () => {
            if (caseData == undefined) return;

            await fetch("");
        };

        loader();
    }, []);

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
                            height: "100%",
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
                            alignItems: "start",
                        }}>
                        {loading == true || caseData == undefined ? (
                            <Barloader
                                color="#0B6BCB"
                                loading={loading}
                                cssOverride={override}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        ) : (
                            <Stack spacing={2}>
                                <Typography level="h3">Caso {caseData.id}</Typography>
                                <Stack direction="row" spacing={4}>
                                    <Typography level="body-md">
                                        Mãe:{" "}
                                        {caseData.motherId == "" ? (
                                            <Typography variant="solid" color="danger">
                                                Não registrado
                                            </Typography>
                                        ) : (
                                            <Typography>{caseData.motherId}</Typography>
                                        )}
                                    </Typography>
                                    <Typography level="body-md">
                                        Filho:{" "}
                                        {caseData.fatherId == "" ? (
                                            <Typography variant="solid" color="danger">
                                                Não registrado
                                            </Typography>
                                        ) : (
                                            <Typography>{caseData.fatherId}</Typography>
                                        )}
                                    </Typography>
                                    <Typography level="body-md">
                                        Suposto pai:{" "}
                                        {caseData.sonId == "" ? (
                                            <Typography variant="solid" color="danger">
                                                Não registrado
                                            </Typography>
                                        ) : (
                                            <Typography>{caseData.sonId}</Typography>
                                        )}
                                    </Typography>
                                </Stack>
                                <Table borderAxis="both">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "15%" }}>Processo</th>
                                            <th style={{ width: "20%" }}>Modificado em</th>
                                            <th style={{ width: "12%" }}>Status</th>
                                            <th style={{ width: "34%" }}>Detalhes</th>
                                            <th style={{ width: "20%" }}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {caseData.processes.map((process) => (
                                            <React.Fragment key={process}>
                                                <CasoRow id={process} caseData={caseData} />
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </Stack>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
