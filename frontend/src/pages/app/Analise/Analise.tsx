import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Spreadsheet from "react-spreadsheet";
import { newTable } from "./tableUtils";
import { useParams } from "react-router-dom";
import { Case } from "../../../../../backend/common/case";
import { toast } from "react-toastify";
import { Patient } from "../../../../../backend/common/patients";
import Barloader from "react-spinners/BarLoader";
import { Button } from "@mui/joy";

const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const loadPatient = async (cpf: string): Promise<Patient | undefined> => {
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

export default function Analise() {
    const { casoId } = useParams();
    const [tableData, setTableData] = useState<{ value: string }[][] | undefined>(undefined);
    const [caseData, setCaseData] = useState<Case | undefined>(undefined);

    useEffect(() => {
        if (caseData == undefined) return;

        const loader = async () => {
            const mother = await loadPatient(caseData.motherId);
            const son = await loadPatient(caseData.sonId);
            const father = await loadPatient(caseData.fatherId);

            if (mother == undefined || son == undefined || father == undefined) {
                toast.error("Algo deu errado :/", {
                    position: "bottom-center",
                    theme: "light",
                });

                return;
            }

            setTableData(
                newTable(
                    mother.genes as any as string,
                    son.genes as any as string,
                    father.genes as any as string
                )
            );
        };

        loader();
    }, [caseData]);

    useEffect(() => {
        const loader = async () => {
            if (casoId == undefined) return;
            await fetch("http://localhost:3000/cases?id=" + casoId, {
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
                .then((response: Case) => {
                    console.log(response);
                    setCaseData({
                        ...response,
                        processes: JSON.parse(response.processes as any as string),
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

        loader();
    }, []);

    const columns = [
        "Abigal",
        "Global Filer",
        "Fusion_6c",
        "Fusion",
        "PP21",
        "Loco",
        "Mãe",
        "Suposto Pai",
        "Filho",
        "Obrigatório",
        "Exclusão",
        "Observações",
    ];

    return (
        <Box
            sx={{
                padding: "2rem",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Box
                sx={{
                    width: "90%",
                    height: "100%",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#d1d5db",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflowY: "auto",
                    borderRadius: "10px",
                }}>
                {tableData == undefined || caseData == undefined ? (
                    <Barloader
                        color="#0B6BCB"
                        loading={true}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                            <Typography level="body-md">Caso {casoId}</Typography>
                            <Typography level="body-lg">Análise Genotípica</Typography>
                            <Box sx={{ display: "flex", gap: "0.5rem" }}>
                                <Button>Auditoria</Button>
                            </Box>
                        </Box>
                        <Spreadsheet data={tableData} columnLabels={columns} />
                        <Button sx={{ placeSelf: "end" }}>Realizar analise</Button>
                    </>
                )}
            </Box>
        </Box>
    );
}
