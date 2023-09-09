import { Box, Stack, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Barloader from "react-spinners/Barloader";
import { Patient } from "../../../../../backend/common/patients";
import {
    Bloodtype,
    Female,
    Male,
    Numbers,
    People,
    Person,
    VolunteerActivism,
} from "@mui/icons-material";
const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const URL = "http://localhost:3000/patients?cpf=";

export default function Paciente() {
    const [patientData, setPatientData] = React.useState<Patient | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(true);
    const { pacientCPF } = useParams();

    useEffect(() => {
        const loader = async () => {
            if (pacientCPF == undefined) return;

            await fetch(URL + pacientCPF, {
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
                            setPatientData(response as Patient);
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
                    flexDirection: "column",
                    gap: "0.5rem",
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
                    }}>
                    {loading == true || patientData == undefined ? (
                        <Barloader
                            color="#0B6BCB"
                            loading={loading}
                            cssOverride={override}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        <>
                            <Typography startDecorator={<Person />} level="title-lg">
                                Paciente {patientData.name}
                            </Typography>
                            <Typography
                                startDecorator={
                                    patientData.gender === "Masculino" ? <Male /> : <Female />
                                }>
                                Sexo: {patientData.gender}
                            </Typography>
                            <Typography startDecorator={<Numbers />} level="body-md">
                                Idade: {patientData.age}
                            </Typography>
                            <Typography startDecorator={<People />} level="body-md">
                                Tem irmão gemeo: {patientData.sibling == true ? "SIM" : "NÃO"}
                            </Typography>
                            <Typography startDecorator={<Bloodtype />} level="body-md">
                                Transfusão: {patientData.transfusao == true ? "SIM" : "NÃO"}
                            </Typography>
                            <Typography startDecorator={<VolunteerActivism />} level="body-md">
                                Transplante: {patientData.transplante == true ? "SIM" : "NÃO"}
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
