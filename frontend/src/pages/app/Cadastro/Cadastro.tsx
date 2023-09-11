import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Button, Input, Radio, RadioGroup, Typography } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import { PatientSchema, PatientSex, newPatient } from "../../../../../backend/common/patients";
import { toast } from "react-toastify";
import { Case } from "../../../../../backend/common/case";

export default function Cadastro() {
    const { casoId, step } = useParams();
    const [caseData, setCaseData] = useState<Case | undefined>(undefined);

    const [name, setName] = useState<string>("Jose Lucas");
    const [phone, setPhone] = useState<string>("40028922");
    const [naturality, setNaturality] = useState<string>("Brasileira");
    const [cpf, setCpf] = useState<string>("9999999999");
    const [rg, setRg] = useState<string>("9999999999");
    const [rgOrgao, setRgOrgao] = useState<string>("SDS");
    const [rgUF, setRgUf] = useState<string>("PE");
    const [gender, setGender] = useState<PatientSex>("Masculino");
    const [address, setAddress] = useState<string>("RUA LEGAL");
    const [city, setCity] = useState<string>("RECIFE");
    const [bairro, setBairro] = useState<string>("ASDOSKD");
    const [addressUF, setAddressUF] = useState<string>("PE");
    const [addressCEP, setAddressCEP] = useState<string>("12344567");
    const [testemunha, setTestemunha] = useState<string>("false");
    const [parenteBiologicoPai, setParenteBiologicoPai] = useState<string>("false");
    const [parentescoPai, setParentescoPai] = useState<string>("false");
    const [irmaoGemeo, setIrmaoGemeo] = useState<string>("false");
    const [transplanteMedula, setTransplanteMedula] = useState<string>("false");
    const [transfusaoSangue, setTranfusaoSangue] = useState<string>("false");

    useEffect(() => {
        const loader = async () => {
            await fetch("http://localhost:3000/cases?id=" + casoId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (res) => {
                if (res.status === 500) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                await res
                    .json()
                    .then((response: Case) => {
                        setCaseData(response);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            });
        };

        loader();
    }, []);

    const navigate = useNavigate();

    const handleNextStep = async () => {
        const patient = newPatient({
            cpf,
            name,
            phone,
            naturality,
            rg,
            rgOrgao,
            rgUF,
            gender,
            address,
            city,
            bairro,
            addressUF,
            addressCEP,
            testemunha,
            parenteBiologicoPai,
            parentescoPai,
            irmaoGemeo,
            transplanteMedula,
            transfusaoSangue,
        });

        const parse = PatientSchema.safeParse(patient);

        if (parse.success) {
            if (caseData == undefined) {
                toast.error("Algo deu errado :/", {
                    position: "bottom-center",
                    theme: "light",
                });

                return;
            }

            await fetch("http://localhost:3000/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patient),
            })
                .then(async (res) => {
                    if (res.status === 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });

                        return;
                    }
                })
                .catch(() => {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });

            if (step == "mother") {
                const updateCase: Case = { ...caseData, motherId: patient.cpf } as Case;

                await fetch("http://localhost:3000/cases", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateCase),
                })
                    .then((res) => {
                        console.log(res);
                        return res.json();
                    })
                    .then(async (res) => {
                        console.log(res);

                        if (res.status != 200) {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });

                            return;
                        }
                    })
                    .catch(() => {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    });

                window.location.replace(`/app/cadastro/${casoId}/son`);
            } else if (step == "son") {
                const updateCase: Case = { ...caseData, sonId: patient.cpf } as Case;

                await fetch("http://localhost:3000/cases", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateCase),
                })
                    .then((res) => {
                        console.log(res);
                        return res.json();
                    })
                    .then(async (res) => {
                        console.log(res);
                        if (res.status != 200) {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });

                            return;
                        }
                    })
                    .catch(() => {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    });

                window.location.replace(`/app/cadastro/${casoId}/father`);
            } else {
                const updateCase: Case = { ...caseData, fatherId: patient.cpf } as Case;

                await fetch("http://localhost:3000/cases", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...caseData, fatherId: patient.cpf } as Case),
                })
                    .then((res) => {
                        console.log(res);
                        return res.json();
                    })
                    .then(async (res) => {
                        console.log(res);
                        if (res.status != 200) {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });

                            return;
                        }
                    })
                    .catch(() => {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    });

                window.location.replace(`/app/caso/${casoId}`);
            }
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
                    <Typography level="h1">
                        Cadastro {step == "mother" ? "Mãe" : step == "father" ? "Pai" : "Filho"}
                    </Typography>
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
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <FormLabel>Telefone</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Telefone..."
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                            <FormLabel>Naturalidade</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Naturalidade..."
                                value={naturality}
                                onChange={(event) => setNaturality(event.target.value)}
                            />
                            <FormLabel>CPF</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="CPF..."
                                value={cpf}
                                onChange={(event) => setCpf(event.target.value)}
                            />
                            <FormLabel>Identidade</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Identidade..."
                                value={rg}
                                onChange={(event) => setRg(event.target.value)}
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
                                        value={rgOrgao}
                                        onChange={(event) => setRgOrgao(event.target.value)}
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
                                        value={rgUF}
                                        onChange={(event) => setRgUf(event.target.value)}
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
                                value={gender}
                                orientation="horizontal"
                                sx={{
                                    gap: "0.5rem",
                                }}
                                onChange={(event) => setGender(event.target.value as PatientSex)}>
                                <Radio value="Masculino" label="Masculino" />
                                <Radio value="Feminino" label="Feminino" />
                            </RadioGroup>
                            <FormLabel>Endereço</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Endereço..."
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                            <FormLabel>Municipio</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Município..."
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                            />
                            <FormLabel>Bairro</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Bairro..."
                                value={bairro}
                                onChange={(event) => setBairro(event.target.value)}
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
                                        value={addressUF}
                                        onChange={(event) => setAddressUF(event.target.value)}
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
                                        placeholder="Bairro CEP..."
                                        value={addressCEP}
                                        onChange={(event) => setAddressCEP(event.target.value)}
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
                                value={testemunha}
                                onChange={(event) => setTestemunha(event.target.value)}
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
                                value={parenteBiologicoPai}
                                onChange={(event) => setParenteBiologicoPai(event.target.value)}
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
                                value={parentescoPai}
                                onChange={(event) => setParentescoPai(event.target.value)}
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
                            value={irmaoGemeo}
                            onChange={(event) => setIrmaoGemeo(event.target.value)}
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
                            value={transplanteMedula}
                            onChange={(event) => setTransplanteMedula(event.target.value)}
                            orientation="horizontal"
                            sx={{
                                gap: "0.5rem",
                            }}>
                            <Radio value="true" label="Sim" />
                            <Radio value="false" label="Não" />
                        </RadioGroup>
                        <Typography>Transfusão de sangue?</Typography>
                        <RadioGroup
                            value={transfusaoSangue}
                            onChange={(event) => setTranfusaoSangue(event.target.value)}
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
                            display: "flex",
                            justifyContent: "end",
                            flexDirection: "row",
                            gap: "1rem",
                        }}>
                        <Button onClick={() => handleNextStep()}>Finalizar</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
