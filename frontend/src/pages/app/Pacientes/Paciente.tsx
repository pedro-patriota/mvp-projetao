import { Box, Stack, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormLabel from "@mui/joy/FormLabel";
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
import Barloader from "react-spinners/BarLoader";
import { Button, Input, Radio, RadioGroup } from "@mui/joy";


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
                paddingY: "2rem",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                flex: 1,
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
                }}>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    }}>

                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", gap: "10px" }}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}>
                            <FormLabel>Nome</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Nome..."
                                value={patientData?.name}
                            />
                            <FormLabel>Telefone</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Telefone..."
                                value={patientData?.phone}
                            />
                            <FormLabel>Naturalidade</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Naturalidade..."
                                value={patientData?.naturality}
                            />
                            <FormLabel>CPF</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="CPF..."
                                value={patientData?.cpf}
                            />
                            <FormLabel>Identidade</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Identidade..."
                                value={patientData?.rg}
                            />

                            <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                    <FormLabel>Orgão</FormLabel>
                                    <Input
                                        sx={{ width: "100%" }}
                                        placeholder="RG Orgão.."
                                        value={patientData?.rgOrgao}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                    <FormLabel>UF</FormLabel>
                                    <Input
                                        sx={{ width: "100%" }}
                                        placeholder="RG UF..."
                                        value={patientData?.rgUF}
                                    />
                                </Box>

                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}>
                            <FormLabel>Sexo</FormLabel>

                            <RadioGroup
                                value={patientData?.gender == "Feminino" ? "Feminino" : "Masculino"}
                                orientation="horizontal"
                                sx={{
                                    gap: "0.5rem",
                                }}
                            >
                                <Radio value="Masculino" label="Masculino" />
                                <Radio value="Feminino" label="Feminino" />
                            </RadioGroup>
                            <FormLabel>Endereço</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Endereço..."
                                value={patientData?.address}
                            />
                            <FormLabel>Municipio</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Município..."
                                value={patientData?.city}
                            />
                            <FormLabel>Bairro</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Bairro..."
                                value={patientData?.bairro}
                            />
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                    <FormLabel>UF</FormLabel>
                                    <Input
                                        sx={{ width: "100%" }}
                                        placeholder="Bairro UF..."
                                        value={patientData?.addressUF}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                    <FormLabel>CEP</FormLabel>
                                    <Input
                                        sx={{ width: "100%" }}
                                        placeholder="CEP..."
                                        value={patientData?.addressCEP}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                gap: "1rem",
                                alignItems: "center",
                            }}>

                            <Typography>
                                Você testemunhou a coleta das amostras biologicas do suposto pai do
                                individuo que se quer determinar a paternidade?
                            </Typography>
                            <RadioGroup
                                value={patientData?.testemunha ? "true" : "false"}
                                orientation="horizontal"
                                sx={{
                                    gap: "0.5rem",
                                }}>
                                <Radio value="true" label="Sim" />
                                <Radio value="false" label="Não" />
                            </RadioGroup>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                gap: "1rem",
                                alignItems: "center",
                            }}>
                            <Typography>
                                Algum parente biologico do susposto pai poderia ser eventualmente
                                considerado como suposto pai do examinado que se quer determinar a
                                paternidade?
                            </Typography>
                            <RadioGroup
                                value={patientData?.parenteBiologicoPai ? "true" : "false"}
                                orientation="horizontal"
                                sx={{
                                    gap: "0.5rem",
                                }}>
                                <Radio value="true" label="Sim" />
                                <Radio value="false" label="Não" />
                            </RadioGroup>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                gap: "1rem",
                                alignItems: "center",
                            }}>
                            <Typography>
                                Você tem parentesco com o susposto pai do examinando que se quer
                                determinar a paternidade?
                            </Typography>
                            <RadioGroup
                                value={patientData?.parentescoPai ? "true" : "false"}
                                orientation="horizontal"
                                sx={{
                                    gap: "0.5rem",
                                }}>
                                <Radio value="true" label="Sim" />
                                <Radio value="false" label="Não" />
                            </RadioGroup>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            alignItems: "center",
                        }}>
                        <Typography>Você tem irmão gêmeo?</Typography>
                        <RadioGroup
                            value={patientData?.irmaoGemeo ? "true" : "false"}
                            orientation="horizontal"
                            sx={{
                                gap: "0.5rem",
                            }}>
                            <Radio value="true" label="Sim" />
                            <Radio value="false" label="Não" />
                        </RadioGroup>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            alignItems: "center",
                        }}>
                        <Typography>Transplante de medula?</Typography>
                        <RadioGroup
                            value={"true"}
                            orientation="horizontal"
                            sx={{
                                gap: "0.5rem",
                            }}>
                            <Radio value="true" label="Sim" />
                            <Radio value="false" label="Não" />
                        </RadioGroup>
                        <Typography>Transfusão de sangue?</Typography>
                        <RadioGroup
                            value={patientData?.transfusaoSangue ? "true" : "false"}
                            orientation="horizontal"
                            sx={{
                                gap: "0.5rem",
                            }}>
                            <Radio value="true" label="Sim" />
                            <Radio value="false" label="Não" />
                        </RadioGroup>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}
