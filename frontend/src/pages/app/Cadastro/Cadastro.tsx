import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import { Button, Input, Radio, RadioGroup, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { PatientSchema, PatientSex, newPatient } from "../../../../../backend/common/patients";
import { toast } from "react-toastify";
import { Case } from "../../../../../backend/common/case";
import { Process } from "../../../../../backend/common/process";

function calculateVerifierDigit(digits: number[], base: number): number {
    const sum = digits.reduce((acc, digit, index) => acc + digit * (base - index), 0);
    const remainder = sum % 11;

    return remainder < 2 ? 0 : 11 - remainder;
}

function generateRandomCPF(): string {
    const randomDigit = () => Math.floor(Math.random() * 10);

    const cpfDigits = Array.from({ length: 9 }, randomDigit);
    const firstVerifierDigit = calculateVerifierDigit(cpfDigits, 10);
    cpfDigits.push(firstVerifierDigit);
    const secondVerifierDigit = calculateVerifierDigit(cpfDigits, 11);
    cpfDigits.push(secondVerifierDigit);

    return cpfDigits.join("");
}

function generateRandomRG(): string {
    const randomDigit = () => Math.floor(Math.random() * 10);
    const rgDigits = Array.from({ length: 8 }, () => randomDigit());

    return `${rgDigits.join("")}`;
}

function generatePhone(): string {
    const areaCode = Math.floor(Math.random() * 90) + 11; // Random area code between 11 and 99
    const firstDigit = Math.floor(Math.random() * 10); // Random first digit (0-9)
    const secondDigit = Math.floor(Math.random() * 10); // Random second digit (0-9)
    const subscriberNumber = Math.floor(Math.random() * 900000000) + 100000000; // Random subscriber number between 100,000,000 and 999,999,999

    return `(${areaCode}) ${firstDigit}${secondDigit}9${subscriberNumber
        .toString()
        .substring(0, 4)}-${subscriberNumber.toString().substring(4)}`;
}

function generateDate(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Note: Month is 0-based.
    const year = String(currentDate.getFullYear());

    return `${day}/${month}/${year}`;
}

// Arrays of Brazilian first and last names (you can expand these with more names)
const brazilianFemaleFirstNames: string[] = ["Ana", "Maria", "Beatriz", "Camila", "Juliana"];

const brazilianMaleFirstNames: string[] = ["João", "Pedro", "Lucas", "Gabriel", "Mateus"];

const brazilianLastNames: string[] = [
    "Silva",
    "Santos",
    "Pereira",
    "Ferreira",
    "Oliveira",
    "Rodrigues",
    "Lima",
    "Carvalho",
    "Gonçalves",
    "Almeida",
];

// Function to generate a random Brazilian female full name
function generateBrazilianFemaleFullName(): string {
    const randomFirstNameIndex = Math.floor(Math.random() * brazilianFemaleFirstNames.length);
    const randomLastNameIndex = Math.floor(Math.random() * brazilianLastNames.length);

    const firstName = brazilianFemaleFirstNames[randomFirstNameIndex];
    const lastName = brazilianLastNames[randomLastNameIndex];

    return `${firstName} ${lastName}`;
}

// Function to generate a random Brazilian male full name
function generateBrazilianMaleFullName(): string {
    const randomFirstNameIndex = Math.floor(Math.random() * brazilianMaleFirstNames.length);
    const randomLastNameIndex = Math.floor(Math.random() * brazilianLastNames.length);

    const firstName = brazilianMaleFirstNames[randomFirstNameIndex];
    const lastName = brazilianLastNames[randomLastNameIndex];

    return `${firstName} ${lastName}`;
}

export default function Cadastro() {
    const { casoId, step } = useParams();
    const [caseData, setCaseData] = useState<Case | undefined>(undefined);

    const [name, setName] = useState<string>("");
    const [nascimento, setNascimento] = useState<string>(generateDate());
    const [phone, setPhone] = useState<string>(generatePhone());
    const [naturality, setNaturality] = useState<string>("Brasileira");
    const [cpf, setCpf] = useState<string>(generateRandomCPF());
    const [rg, setRg] = useState<string>(generateRandomRG());
    const [rgOrgao, setRgOrgao] = useState<string>("SDS");
    const [rgUF, setRgUf] = useState<string>("PE");
    const [gender, setGender] = useState<PatientSex>("Masculino");
    const [address, setAddress] = useState<string>("Rua bosque dos vertentes");
    const [city, setCity] = useState<string>("Recife");
    const [bairro, setBairro] = useState<string>("Iputinga");
    const [addressUF, setAddressUF] = useState<string>("PE");
    const [addressCEP, setAddressCEP] = useState<string>("55404-404");
    const [testemunha, setTestemunha] = useState<string>("true");
    const [parenteBiologicoPai, setParenteBiologicoPai] = useState<string>("false");
    const [parentescoPai, setParentescoPai] = useState<string>("false");
    const [irmaoGemeo, setIrmaoGemeo] = useState<string>("false");
    const [transplanteMedula, setTransplanteMedula] = useState<string>("false");
    const [transfusaoSangue, setTranfusaoSangue] = useState<string>("false");

    useEffect(() => {
        console.log(step);

        setName(
            step != "mother" ? generateBrazilianMaleFullName() : generateBrazilianFemaleFullName()
        );
    }, [step]);

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

    const handleNextStep = async () => {
        const patient = newPatient({
            cpf,
            nascimento,
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

            const patientCreated: boolean = await fetch("http://localhost:3000/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patient),
            })
                .then(async (res) => {
                    if (res.status === 500) {
                        return false;
                    }

                    return true;
                })
                .catch((e) => {
                    console.log(e);
                    return false;
                });

            if (patientCreated == false) {
                toast.error("Algo deu errado :/", {
                    position: "bottom-center",
                    theme: "light",
                });

                return;
            }

            const allProcesses = JSON.parse(caseData.processes as any as string) as string[];

            if (step == "mother") {
                const motherUpdatedInCase: boolean = await fetch(
                    "http://localhost:3000/cases?id=" + casoId,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ motherId: patient.cpf } as Partial<Case>),
                    }
                )
                    .then((res) => {
                        if (res.status != 200) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (motherUpdatedInCase == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                const motherUpdatedInProcess: boolean = await fetch(
                    "http://localhost:3000/processes?id=" + allProcesses[0],
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            mother: `${new Date().toUTCString()}`,
                        } as Partial<Process>),
                    }
                )
                    .then((res) => {
                        if (res.status != 200) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (motherUpdatedInProcess == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                window.location.replace(`/app/cadastro/${casoId}/son`);
            } else if (step == "son") {
                const sonUpdatedInCase: boolean = await fetch(
                    "http://localhost:3000/cases?id=" + casoId,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ sonId: patient.cpf } as Partial<Case>),
                    }
                )
                    .then((res) => {
                        if (res.status != 200) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (sonUpdatedInCase == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                const sonUpdatedInProcess: boolean = await fetch(
                    "http://localhost:3000/processes?id=" + allProcesses[0],
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            son: `${new Date().toUTCString()}`,
                        } as Partial<Process>),
                    }
                )
                    .then((res) => {
                        if (res.status != 200) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (sonUpdatedInProcess == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                window.location.replace(`/app/cadastro/${casoId}/father`);
            } else {
                const fatherUpdatedInCase: boolean = await fetch(
                    "http://localhost:3000/cases?id=" + casoId,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ fatherId: patient.cpf } as Partial<Case>),
                    }
                )
                    .then((res) => {
                        if (res.status != 200) {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });

                            return false;
                        }

                        return true;
                    })

                    .catch(() => {
                        return false;
                    });

                if (fatherUpdatedInCase == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                const fatherUpdatedInProcess: boolean = await fetch(
                    "http://localhost:3000/processes?id=" + allProcesses[0],
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            status: "FEITO",
                            father: `${new Date().toUTCString()}`,
                        } as Partial<Process>),
                    }
                )
                    .then((res) => {
                        if (res.status != 200) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (fatherUpdatedInProcess == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                const nextProcessUpdated: boolean = await fetch(
                    "http://localhost:3000/processes?id=" + allProcesses[1],
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status: "FAZENDO" } as Partial<Process>),
                    }
                )
                    .then((res) => {
                        if (res.status != 200) {
                            return false;
                        }

                        return true;
                    })
                    .catch(() => {
                        return false;
                    });

                if (nextProcessUpdated == false) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

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
                            <FormLabel>Data de nascimento</FormLabel>
                            <Input
                                sx={{ width: "100%" }}
                                placeholder="Nome..."
                                value={nascimento}
                                onChange={(event) => setNascimento(event.target.value)}
                            />
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
                        <Button onClick={() => handleNextStep()}>Concluido</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
