import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { Button, Stack } from "@mui/joy";
import { Case } from "../../../../../backend/common/case";
import Barloader from "react-spinners/BarLoader";
import { useNavigate, useParams } from "react-router-dom";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./Documentos.css";
import { Patient } from "../../../../../backend/common/patients";
import { PictureAsPdf } from "@mui/icons-material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const markers = [
    "AMEL",
    "D3S1358",
    "D1S1656",
    "D2S441",
    "D10S1248",
    "D13S317",
    "PENTA E",
    "D16S539",
    "D18S51",
    "D2S1338",
    "CSF1PO",
    "PENTA D",
    "TH01",
    "vWA",
    "D21S11",
    "D7S820",
    "D5S818",
    "TPOX",
    "D8S1179",
    "D12S391",
    "D19S433",
    "SE33",
    "D22S1045",
    "DYS391",
    "FGA",
    "DYS576",
    "DYS570",
    "D6S1043",
];

const newTable = (mother: string[], son: string[], father: string[]) => {
    const table = new Array(28);

    for (let i = 0; i < table.length; i++) {
        table[i] = new Array(7).fill("");
    }

    for (let i = 0, j = 0; i < markers.length; i++, j += 2) {
        table[i][0] = markers[i];
        table[i][1] = mother[j];
        table[i][2] = mother[j + 1];
        table[i][3] = son[j];
        table[i][4] = son[j + 1];
        table[i][5] = father[j];
        table[i][6] = father[j + 1];
    }

    return table;
};

const loadPatient = async (cpf: string): Promise<Patient | undefined> => {
    const result = await fetch("http://localhost:3000/patients?cpf=" + cpf, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response: Patient) => {
            return { ...response, genes: JSON.parse(response.genes as any as string) } as Patient;
        })
        .catch((e) => {
            console.log(e);

            return undefined;
        });

    return result;
};

export default function Documentos() {
    const { casoId } = useParams();
    const [tableData, setTableData] = useState(newTable([], [], []));
    const [mother, setMother] = useState<Patient | undefined>(undefined);
    const [father, setFather] = useState<Patient | undefined>(undefined);
    const [son, setSon] = useState<Patient | undefined>(undefined);
    const [caseData, setCaseData] = useState<Case | undefined>(undefined);
    const pdfRef = useRef(null);

    const navigate = useNavigate();

    const handleDocumentacao = async () => {
        if (casoId == undefined || caseData == undefined) {
            return;
        }

        const input = pdfRef.current as any;

        let result = await html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4", true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 2;
                pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                pdf.save("relatorio.pdf");

                return true;
            })
            .catch((e) => {
                console.log(e);

                return false;
            });

        if (result == false) {
            toast.error("Algo deu errado :/", {
                position: "bottom-center",
                theme: "light",
            });

            return;
        }

        result = await fetch("http://localhost:3000/processes?id=" + caseData.processes[4], {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "FEITO" }),
        })
            .then((res) => {
                if (res.status == 500) {
                    return false;
                }

                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });

        if (result == false) {
            toast.error("Algo deu errado :/", {
                position: "bottom-center",
                theme: "light",
            });
        }

        const now = new Date().toUTCString();

        result = await fetch("http://localhost:3000/processes?id=" + caseData.processes[5], {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "FEITO", mother: now, son: now, father: now }),
        })
            .then((res) => {
                if (res.status == 500) {
                    return false;
                }

                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });

        navigate(`/app/caso/${casoId}`);
    };

    useEffect(() => {
        const loader = async () => {
            if (casoId == undefined) {
                return;
            }

            await fetch("http://localhost:3000/cases?id=" + casoId, {
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

                    return res.json();
                })
                .then(async (response: Case) => {
                    setCaseData({
                        ...response,
                        processes: JSON.parse(response.processes as any as string),
                    });

                    const mother = await loadPatient(response.motherId);
                    const father = await loadPatient(response.fatherId);
                    const son = await loadPatient(response.sonId);

                    if (mother == undefined || father == undefined || son == undefined) {
                        return;
                    }

                    setTableData(newTable(mother.genes, son.genes, father.genes));

                    setMother(mother);
                    setFather(father);
                    setSon(son);
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

    if (caseData == undefined) {
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
                    overflowY: "auto",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#d1d5db",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                <div
                    ref={pdfRef}
                    style={{
                        width: "100%",
                        gap: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#000",
                        padding: "1rem",
                    }}>
                    <div
                        style={{
                            placeSelf: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Typography level="h4">Relatório Pericial</Typography>
                        <Typography level="h4">Investigação de Parentesco Biológico</Typography>
                    </div>
                    <Typography level="body-lg" fontWeight={600}>
                        Número de referência do processo:{" "}
                        <Typography level="body-md">{casoId}</Typography>
                    </Typography>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Stack spacing={1}>
                            <Typography level="body-lg" fontWeight={600}>
                                Número amostra
                            </Typography>
                            <Typography level="body-md">M_{casoId}</Typography>
                            <Typography level="body-md">F_{casoId}</Typography>
                            <Typography level="body-md">P_{casoId}</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography level="body-lg" fontWeight={600}>
                                Parentesco
                            </Typography>
                            <Typography level="body-md">Mãe</Typography>
                            <Typography level="body-md">Criança</Typography>
                            <Typography level="body-md">Suposto pai</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography level="body-lg" fontWeight={600}>
                                Nome
                            </Typography>
                            <Typography level="body-md">
                                {mother == undefined ? "Não registrado" : mother.name}
                            </Typography>
                            <Typography level="body-md">
                                {son == undefined ? "Não registrado" : son.name}
                            </Typography>
                            <Typography level="body-md">
                                {father == undefined ? "Não registrado" : father.name}
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography level="body-lg" fontWeight={600}>
                                Data de nascimento
                            </Typography>
                            <Typography level="body-md">
                                {mother == undefined ? "Não registrado" : mother.nascimento}
                            </Typography>
                            <Typography level="body-md">
                                {son == undefined ? "Não registrado" : son.nascimento}
                            </Typography>
                            <Typography level="body-md">
                                {father == undefined ? "Não registrado" : father.nascimento}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Typography level="body-lg" fontWeight={600}>
                        Metodologia
                    </Typography>
                    <Typography level="body-md">
                        A técnica utilizada é a PCR, que, aliada aos mais modernos equipamentos, faz
                        com que a metodologia aplicada seja a mais rápida e eficiente em termos de
                        identificação humana, tendo sido validada internacionalmente. O ADN foi
                        isolado separadamente de cada amostra utilizando tecnologia de
                        sequenciamento de genoma humano, foram analisados 27 marcadores durante a
                        execução do exame para validação dos resultados.
                    </Typography>
                    <Typography level="body-lg" fontWeight={600}>
                        Resultados
                    </Typography>
                    <table>
                        <thead>
                            <tr>
                                <th>Marcadores Genéticos</th>
                                <th>Alelo Mãe</th>
                                <th>Alelo Mãe</th>
                                <th>Alelo Criança</th>
                                <th>Alelo Criança</th>
                                <th>Alelo Pai</th>
                                <th>Alelo Pai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td>&nbsp;{row[0]}</td>
                                        <td>&nbsp;{row[1]}</td>
                                        <td>&nbsp;{row[2]}</td>
                                        <td>&nbsp;{row[3]}</td>
                                        <td>&nbsp;{row[4]}</td>
                                        <td>&nbsp;{row[5]}</td>
                                        <td>&nbsp;{row[6]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Typography level="body-lg" fontWeight={600}>
                        Interpretação
                    </Typography>
                    <Typography level="body-md">
                        O suposto pai{" "}
                        <Typography fontWeight={600}>
                            {caseData.excluido == "SIM" ? "" : "não"} está excluído
                        </Typography>{" "}
                        como pai da criança testada. Baseado nos resultados obtidios e listados
                        acima a{" "}
                        <Typography fontWeight={600}>
                            probabilidade de paternidade é de{" "}
                            {caseData.probabilidade == 1 ? "99,999999" : caseData.probabilidade}%
                        </Typography>
                        . Esta probabilidade de paternidade é calculada comparado indivíduos
                        aleatório não relacionados da população caucasiana (assume-se a
                        probabilidade inicial de 0.50).
                    </Typography>
                    <Stack direction="row" sx={{ width: "100%", marginBottom: "2rem" }} spacing={1}>
                        <Typography sx={{ width: "50%" }} level="body-sm">
                            Nota: Como as amostras não foram recolhidas sob um processo devidamente
                            documentado por uma terceira entidade neutra e o laboratório não pode
                            verificar a origem das amostras, estes resultados poderão não ser
                            defensáveis em um tribunal para o estabelecimento da paternidade ou
                            outro processo legal. Os nomes das pessoas em teste que contam neste
                            relatório foram fornecidos pelo cliente e não podem ser verificados.
                        </Typography>
                        <Typography sx={{ width: "50%" }} level="body-sm">
                            O laboratório não assume responsabilidade por informação incorreta ou
                            incompleta. Baseado nas amostras recebidas das partes em teste, em que
                            as identidades não podem ser verificadas, o diretor do laboratório
                            declara os dados genéticos corretos.
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            paddingX: "10rem",
                            paddingTop: "2rem",
                            paddingBottom: "5rem",
                        }}>
                        <Typography>Assinatura Cliente</Typography>
                        <Typography>Diretor do laboratório</Typography>
                    </Stack>
                </div>
                <Button
                    onClick={() => handleDocumentacao()}
                    startDecorator={<PictureAsPdf></PictureAsPdf>}
                    sx={{ placeSelf: "end" }}>
                    Download PDF
                </Button>
            </Box>
        </Box>
    );
}
