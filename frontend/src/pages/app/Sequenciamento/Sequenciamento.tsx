import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Barloader from "react-spinners/BarLoader";
import { TuneRounded } from "@mui/icons-material";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Done from "@mui/icons-material/Done";
import Box from "@mui/joy/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import { Input, Modal, ModalDialog, SvgIcon } from "@mui/joy";
import { Sequencing } from "../../../../../backend/common/sequencing";
import { Case } from "../../../../../backend/common/case";
import { Process } from "../../../../../backend/common/process";
import Spreadsheet from "react-spreadsheet";
import { styled } from "@mui/joy";
import "./Sequenciamento.css";

const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

interface ConfigDrawerProps {
    cases: Case[];
    sequencingData: Sequencing;
    updateData: (data: { didBy: string; kit: string; cases: string[] }) => void;
}

function ConfigDrawer({ cases, updateData, sequencingData }: ConfigDrawerProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [responsavel, setResponsavel] = useState<string>(sequencingData.didBy);
    const [kit, setKit] = useState<string>(sequencingData.kit);
    const [selectedCases, setSelectedCases] = useState<string[]>(sequencingData.cases);

    const handleUpdateData = () => {
        updateData({ kit, didBy: responsavel, cases: selectedCases });
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<TuneRounded />}
                onClick={() => setOpen(true)}>
                Configurações
            </Button>
            <Drawer
                size="md"
                anchor="right"
                variant="plain"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: "transparent",
                            p: { md: 3, sm: 0 },
                            boxShadow: "none",
                        },
                    },
                }}>
                <Sheet
                    sx={{
                        borderRadius: "md",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        height: "100%",
                        overflow: "auto",
                    }}>
                    <DialogTitle>Configurações</DialogTitle>
                    <ModalClose />
                    <DialogContent sx={{ gap: 0.5 }}>
                        <Typography level="title-md" sx={{ mt: 1 }}>
                            Responsável
                        </Typography>
                        <Input
                            sx={{ width: "100%" }}
                            value={responsavel}
                            onChange={(event) => {
                                setResponsavel(event.target.value);
                            }}
                        />
                        <Typography level="title-md" sx={{ mt: 1 }}>
                            Kit utilizado
                        </Typography>
                        <Input
                            value={kit}
                            sx={{ width: "100%" }}
                            onChange={(event) => {
                                setKit(event.target.value);
                            }}
                        />
                        <Typography component="div" level="title-md">
                            Casos
                        </Typography>
                        <div role="group" aria-labelledby="rank">
                            <List
                                orientation="horizontal"
                                size="sm"
                                wrap
                                sx={{
                                    "--List-gap": "12px",
                                    "--ListItem-radius": "20px",
                                }}>
                                {cases.map((item) => {
                                    const selected = selectedCases.includes(item.id);

                                    return (
                                        <ListItem key={item.id}>
                                            <AspectRatio
                                                variant={selected ? "solid" : "outlined"}
                                                color={selected ? "primary" : "neutral"}
                                                ratio={1}
                                                sx={{
                                                    width: 20,
                                                    borderRadius: 20,
                                                    ml: -0.5,
                                                    mr: 0.75,
                                                }}>
                                                <div>{selected && <Done />}</div>
                                            </AspectRatio>
                                            <Checkbox
                                                size="sm"
                                                color="neutral"
                                                disableIcon
                                                overlay
                                                label={item.id}
                                                variant="outlined"
                                                checked={selected}
                                                onChange={(event) =>
                                                    setSelectedCases((current) => {
                                                        const set = new Set([...current, item.id]);

                                                        if (!event.target.checked) {
                                                            set.delete(item.id);
                                                        }

                                                        return [...set];
                                                    })
                                                }
                                                slotProps={{
                                                    action: {
                                                        sx: {
                                                            "&:hover": {
                                                                bgcolor: "transparent",
                                                            },
                                                        },
                                                    },
                                                }}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    </DialogContent>
                    <Divider sx={{ mt: "auto" }} />
                    <Stack direction="row" justifyContent="space-between" useFlexGap spacing={1}>
                        <Button onClick={() => handleUpdateData()}>Salvar alterações</Button>
                    </Stack>
                </Sheet>
            </Drawer>
        </React.Fragment>
    );
}

const createNewTable = () => {
    let array = [];

    for (let i = 0; i < 12; i++) {
        array.push(
            new Array(8).fill({
                value: "",
            })
        );
    }

    return array;
};

export default function Sequenciamento() {
    const [sequencingData, setSequencingData] = useState<
        (Sequencing & { createdAt: string; updatedAt: string }) | undefined
    >(undefined);
    const [casesData, setCasesData] = useState<Case[] | undefined>();
    const [sequencingTable, setSequnecingTable] = useState<{ value: string }[][]>(createNewTable());
    const { sequenciamentoId } = useParams();

    const [openModal, setOpenModal] = useState<boolean>(false);

    const populateTable = () => {
        const newTable = createNewTable();
        let currentCaseIndex = 0;
        let tempCounter = 0;

        for (let column = 0; column < 8; column++) {
            for (let row = 0; row < 12; row++) {
                if (column == 0 && row == 0) {
                    newTable[row][column] = { value: "Cpos" };
                } else if (column == 0 && row == 1) {
                    newTable[row][column] = { value: "Cneg" };
                } else {
                    if (sequencingData == undefined || sequencingData.cases.length == 0) {
                        return newTable;
                    }

                    if (tempCounter == 0) {
                        newTable[row][column] = {
                            value: `M_${sequencingData.cases[currentCaseIndex]}`,
                        };
                        tempCounter = 1;
                    } else if (tempCounter == 1) {
                        newTable[row][column] = {
                            value: `P_${sequencingData.cases[currentCaseIndex]}`,
                        };
                        tempCounter = 2;
                    } else {
                        newTable[row][column] = {
                            value: `F_${sequencingData.cases[currentCaseIndex]}`,
                        };
                        tempCounter = 0;
                        currentCaseIndex += 1;

                        if (currentCaseIndex == sequencingData.cases.length) {
                            return newTable;
                        }
                    }
                }
            }
        }

        return newTable;
    };

    useEffect(() => {
        setSequnecingTable(populateTable());
    }, [sequencingData]);

    useEffect(() => {
        if (sequenciamentoId == undefined) return;

        const loader = async () => {
            await fetch("http://localhost:3000/sequencing?id=" + sequenciamentoId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status === 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });

                        return;
                    }

                    return res.json();
                })
                .then((res: Sequencing & { createdAt: string; updatedAt: string }) => {
                    const response = { ...res, cases: JSON.parse(res.cases as any as string) };

                    setSequencingData(response);
                })
                .catch((e) => {
                    console.log(e);

                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });

            await fetch("http://localhost:3000/cases/all", {
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
                        .then(async (caseResponse: Case[]) => {
                            let filteredCases: Case[] = [];

                            for (let i = 0; i < caseResponse.length; i++) {
                                let parsedCase = {
                                    ...caseResponse[i],
                                    processes: JSON.parse(
                                        caseResponse[i].processes as any as string
                                    ),
                                };

                                await fetch(
                                    "http://localhost:3000/processes?id=" + parsedCase.processes[2],
                                    {
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                )
                                    .then((res) => res.json())
                                    .then((processResponse: Process) => {
                                        if (processResponse.status === "FAZENDO") {
                                            filteredCases.push(parsedCase);
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(e);
                                    });
                            }

                            setCasesData(filteredCases);
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

    const handleUpdateData = async (data: { didBy: string; kit: string; cases: string[] }) => {
        if (sequenciamentoId == undefined) return;

        const payload = JSON.stringify({
            didBy: data.didBy,
            cases: data.cases,
            kit: data.kit,
        });

        await fetch("http://localhost:3000/sequencing?id=" + sequenciamentoId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
        })
            .then((res) => {
                if (res.status == 500) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                setSequencingData((current) => {
                    if (current == undefined) {
                        return undefined;
                    } else {
                        return { ...current, didBy: data.didBy, cases: data.cases, kit: data.kit };
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
    };

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                if (e.target) {
                    const contents = e.target.result as string;
                    const lines: string[] = contents.split("\n");

                    for (let i = 0; i < lines.length; i++) {
                        const line: string[] = lines[i].split(",");

                        if (line.length == 1) {
                            continue;
                        }

                        const caseId = line[0].slice(2);
                        const person = line[0].slice(0, 1);
                        const genes = line.splice(1);
                        genes.pop();

                        await fetch("http://localhost:3000/sequencing/genes", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ caseId, person, genes }),
                        }).then((res) => {
                            if (res.status == 500) {
                                toast.error("Algo deu errado :/", {
                                    position: "bottom-center",
                                    theme: "light",
                                });
                            } else {
                                if (person == "P") {
                                    toast.success(`Caso ${caseId} processado.`, {
                                        position: "bottom-center",
                                        theme: "light",
                                    });
                                }
                            }
                        });
                    }
                }
            };

            reader.readAsText(file);
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
                            height: "100%",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#d1d5db",
                            padding: "1rem",
                            boxShadow:
                                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            alignItems: "start",
                            overflowY: "auto",
                        }}>
                        {sequencingData == undefined ? (
                            <Barloader
                                color="#0B6BCB"
                                loading={true}
                                cssOverride={override}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        ) : (
                            <Stack
                                spacing={2}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "100%",
                                }}>
                                <Stack
                                    sx={{
                                        width: "100%",
                                    }}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>
                                        <Typography level="body-lg">
                                            Sequenciamento {sequenciamentoId}
                                        </Typography>
                                        {casesData == undefined ? (
                                            <Button
                                                variant="outlined"
                                                color="neutral"
                                                startDecorator={<TuneRounded />}>
                                                Configurações
                                            </Button>
                                        ) : (
                                            <ConfigDrawer
                                                cases={casesData}
                                                updateData={handleUpdateData}
                                                sequencingData={sequencingData}></ConfigDrawer>
                                        )}
                                    </Box>
                                    <Typography level="body-sm">
                                        Número de casos selecionados:{" "}
                                        {casesData == undefined ? "0" : sequencingData.cases.length}
                                    </Typography>
                                </Stack>
                                <Box
                                    sx={{
                                        position: "relative",
                                        flex: "1",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    {sequencingData.cases.length == 0 ? (
                                        <Box
                                            sx={{
                                                zIndex: "10",
                                                position: "absolute",
                                                inset: "0px",
                                                width: "100%",
                                                height: "100%",
                                                background: "#f1f1f1",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                opacity: "90%",
                                            }}>
                                            <Typography sx={{ opacity: "100%" }}>
                                                Configure o sequenciamento primeiro.
                                            </Typography>
                                        </Box>
                                    ) : null}
                                    <Spreadsheet
                                        className="table-width"
                                        rowLabels={[
                                            "1",
                                            "2",
                                            "3",
                                            "4",
                                            "5",
                                            "6",
                                            "7",
                                            "8",
                                            "9",
                                            "10",
                                            "11",
                                            "12",
                                        ]}
                                        columnLabels={["A", "B", "C", "D", "E", "F", "G", "H"]}
                                        data={sequencingTable}
                                    />
                                </Box>
                                <Button
                                    onClick={() => {
                                        if (sequencingData.cases.length == 0) {
                                            toast.error(
                                                "Você precisa ter ao menos 1 caso para prosseguir.",
                                                {
                                                    position: "bottom-center",
                                                    theme: "light",
                                                }
                                            );

                                            return;
                                        }

                                        setOpenModal(true);
                                    }}
                                    sx={{ placeSelf: "end" }}>
                                    Realizar sequenciamento
                                </Button>
                                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                                    <ModalDialog
                                        aria-labelledby="nested-modal-title"
                                        aria-describedby="nested-modal-description"
                                        sx={(theme) => ({
                                            [theme.breakpoints.only("xs")]: {
                                                top: "unset",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                borderRadius: 0,
                                                transform: "none",
                                                maxWidth: "unset",
                                            },
                                        })}>
                                        <Typography id="nested-modal-title" level="h2">
                                            Confirmação do Sequenciamento
                                        </Typography>
                                        <Typography
                                            id="nested-modal-description"
                                            textColor="text.tertiary">
                                            Você deve fazer o upload de um arquivo .csv para que
                                            todos os casos nesse sequenciamento sejam preenchidos
                                            corretamente.
                                        </Typography>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            tabIndex={-1}
                                            variant="outlined"
                                            color="neutral"
                                            startDecorator={
                                                <SvgIcon>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                        />
                                                    </svg>
                                                </SvgIcon>
                                            }>
                                            Upload
                                            <VisuallyHiddenInput
                                                type="file"
                                                accept=".csv"
                                                onChange={handleFileUpload}
                                            />
                                        </Button>
                                    </ModalDialog>
                                </Modal>
                            </Stack>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
