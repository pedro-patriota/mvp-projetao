import React, { CSSProperties, useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Case } from "../../../../../backend/common/case";
import { Process, ProcessName } from "../../../../../backend/common/process";
import { Box, Button, Input, Modal, ModalClose, Sheet, Stack, Table, Typography } from "@mui/joy";
import Barloader from "react-spinners/BarLoader";
import { AdsClick, Replay, Undo, UndoRounded, Visibility } from "@mui/icons-material";
import { Patient } from "../../../../../backend/common/patients";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const loadPatient = async (cpf: string): Promise<Patient | undefined> => {
    if (cpf == "") return undefined;

    const result = await fetch("http://localhost:3000/patients?cpf=" + cpf, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response: Patient) => response)
        .catch((e) => {
            console.log(e);

            return undefined;
        });

    return result;
};

interface ProcessRowProps {
    id: string;
    caseData: Case;
}

function ProcessRow({ id, caseData }: ProcessRowProps) {
    const [processData, setProcessData] = useState<(Process & { updatedAt: string }) | undefined>(
        undefined
    );

    const navigate = useNavigate();
    const [details, setDetails] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleSaveDetails = async () => {
        if (details == "") {
            return;
        }

        await fetch("http://localhost:3000/processes?id=" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ detalhes: details } as Partial<Process>),
        })
            .then((res) => {
                if (res.status === 500) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                toast.success("Processo atualizado!", {
                    position: "bottom-center",
                    theme: "light",
                });
            })
            .catch(() => {
                toast.error("Algo deu errado :/", {
                    position: "bottom-center",
                    theme: "light",
                });
            });
    };

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
                            setDetails(response.detalhes);
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
            SEQUENCIAMENTO: async () => {
                navigate(`/app/sequenciamentos`);
            },
            ANALISE: async () => {
                navigate(`/app/analise/${caseData.id}`);
            },
            DOCUMENTAÇÃO: async () => {
                navigate(`/app/documentos/${caseData.id}`);
            },
            CONCLUÍDO: async () => {},
        };

        await actions[processData.name]();
    };

    const handleRollback = async () => {
        if (processData == undefined) return;

        const actions: Record<"CADASTRO" | "COLETA" | "SEQUENCIAMENTO", () => Promise<void>> = {
            CADASTRO: async () => {
                toast("Limpando dados...", {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                });

                const result = await fetch("http://localhost:3000/processes/rollback", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ caseId: caseData.id, type: "CADASTRO" }),
                })
                    .then((res) => {
                        if (res.status == 500) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (result == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                location.reload();
            },
            COLETA: async () => {
                toast("Limpando dados...", {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                });

                const result = await fetch("http://localhost:3000/processes/rollback", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ caseId: caseData.id, type: "COLETA" }),
                })
                    .then((res) => {
                        if (res.status == 500) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (result == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                location.reload();
            },
            SEQUENCIAMENTO: async () => {
                toast("Limpando dados...", {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                });

                const result = await fetch("http://localhost:3000/processes/rollback", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ caseId: caseData.id, type: "SEQUENCIAMENTO" }),
                })
                    .then((res) => {
                        if (res.status == 500) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (result == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                location.reload();
            },
        };

        await actions[processData.name as "CADASTRO" | "COLETA" | "SEQUENCIAMENTO"]();
    };

    return (
        <>
            <tr>
                <td>
                    {processData == undefined ? (
                        "CARREGANDO..."
                    ) : (
                        <Typography sx={{ textAlign: "start", fontWeight: 600 }}>
                            {processData.name}
                        </Typography>
                    )}
                </td>
                <td>
                    {processData == undefined ? (
                        "CARREGANDO..."
                    ) : (
                        <>
                            <Typography sx={{ textAlign: "start" }}>
                                {new Date(processData.updatedAt).toLocaleString()}
                            </Typography>
                        </>
                    )}
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
                <td>
                    {processData == undefined ? (
                        "CARREGANDO..."
                    ) : (
                        <Stack direction="row" spacing={1}>
                            <Input
                                value={details}
                                sx={{ width: "100%" }}
                                placeholder="Detalhes..."
                                onChange={(event) => setDetails(event.target.value)}
                            />
                            <Button onClick={() => handleSaveDetails()} size="sm" variant="soft">
                                Salvar
                            </Button>
                        </Stack>
                    )}
                </td>
                <td>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        {processData == undefined || processData.name == "CONCLUÍDO" ? (
                            <></>
                        ) : (
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
                        )}
                        {processData == undefined ||
                        processData.name == "CONCLUÍDO" ||
                        processData.name == "DOCUMENTAÇÃO" ||
                        processData.name == "ANALISE" ? (
                            <></>
                        ) : (
                            <Button
                                onClick={() => handleRollback()}
                                startDecorator={<Replay />}
                                size="sm"
                                variant="soft"
                                color="warning"
                                disabled={processData.status != "FEITO"}>
                                Refazer
                            </Button>
                        )}
                        {processData == undefined || processData.name == "CONCLUÍDO" ? (
                            <></>
                        ) : (
                            <Button
                                startDecorator={<Visibility />}
                                onClick={() => setOpenModal(true)}
                                size="sm"
                                variant="soft"
                                color="primary"
                                disabled={
                                    processData == undefined || processData.status != "FEITO"
                                }>
                                Ver
                            </Button>
                        )}
                    </Box>
                </td>
            </tr>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openModal}
                onClose={() => setOpenModal(false)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Sheet
                    variant="outlined"
                    sx={{
                        width: "40rem",
                        borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                    }}>
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h2"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}>
                        Detalhes do processo
                    </Typography>
                    <Typography level="h4">
                        Mãe:{" "}
                        <Typography level="body-md">
                            {processData == undefined
                                ? "Carregando..."
                                : new Date(processData.mother).toLocaleString()}
                        </Typography>
                    </Typography>
                    <Typography level="h4">
                        Criança:{" "}
                        <Typography level="body-md">
                            {processData == undefined
                                ? "Carregando..."
                                : new Date(processData.son).toLocaleString()}
                        </Typography>
                    </Typography>
                    <Typography level="h4">
                        Pai:{" "}
                        <Typography level="body-md">
                            {processData == undefined
                                ? "Carregando..."
                                : new Date(processData.father).toLocaleString()}
                        </Typography>
                    </Typography>
                </Sheet>
            </Modal>
        </>
    );
}

export default function Caso() {
    const [mother, setMother] = useState<Patient | undefined>(undefined);
    const [father, setFather] = useState<Patient | undefined>(undefined);
    const [son, setSon] = useState<Patient | undefined>(undefined);
    const [caseData, setCaseData] = useState<Case | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams();

    useEffect(() => {
        const loader = async () => {
            if (id == undefined) return;

            await fetch("http://localhost:3000/cases?id=" + id, {
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
                        .then(async (response: Case) => {
                            const caseWithData = {
                                ...response,
                                processes: JSON.parse(response.processes as any as string),
                            };

                            const mother = await loadPatient(response.motherId);
                            const father = await loadPatient(response.fatherId);
                            const son = await loadPatient(response.sonId);

                            setMother(mother);
                            setFather(father);
                            setSon(son);

                            setCaseData(caseWithData);
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
                                        {mother == undefined ? (
                                            <Typography variant="solid" color="danger">
                                                Não registrado
                                            </Typography>
                                        ) : (
                                            <Typography>{mother.name}</Typography>
                                        )}
                                    </Typography>
                                    <Typography level="body-md">
                                        Filho:{" "}
                                        {son == undefined ? (
                                            <Typography variant="solid" color="danger">
                                                Não registrado
                                            </Typography>
                                        ) : (
                                            <Typography>{son.name}</Typography>
                                        )}
                                    </Typography>
                                    <Typography level="body-md">
                                        Suposto pai:{" "}
                                        {father == undefined ? (
                                            <Typography variant="solid" color="danger">
                                                Não registrado
                                            </Typography>
                                        ) : (
                                            <Typography>{father.name}</Typography>
                                        )}
                                    </Typography>
                                </Stack>
                                <Table borderAxis="both">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "15%", fontWeight: 600 }}>
                                                Processo
                                            </th>
                                            <th style={{ width: "17%", fontWeight: 600 }}>
                                                Modificado em
                                            </th>
                                            <th style={{ width: "12%", fontWeight: 600 }}>
                                                Status
                                            </th>
                                            <th style={{ width: "29%", fontWeight: 600 }}>
                                                Detalhes
                                            </th>
                                            <th style={{ width: "28%", fontWeight: 600 }}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {caseData.processes.map((process) => (
                                            <Fragment key={process}>
                                                <ProcessRow id={process} caseData={caseData} />
                                            </Fragment>
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
