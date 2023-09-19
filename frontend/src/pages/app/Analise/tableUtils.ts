import { toast } from "react-toastify";

export const newTable = (motherGenes: string, sonGenes: string, fatherGenes: string) => {
    const mother: string[] = JSON.parse(motherGenes);
    const son: string[] = JSON.parse(sonGenes);
    const father: string[] = JSON.parse(fatherGenes);

    let table: { value: string }[][] = [
        [
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "AMEL",
            },
            {
                value: "X",
            },
            {
                value: "X",
            },
            {
                value: "X",
            },
            {
                value: "X",
            },
            {
                value: "X",
            },
            {
                value: "Y",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "11",
            },
            {
                value: "1",
            },
            {
                value: "1",
            },
            {
                value: "1",
            },
            {
                value: "1",
            },
            {
                value: "D3S1358",
            },
            {
                value: "18",
            },
            {
                value: "19",
            },
            {
                value: "19",
            },
            {
                value: "30",
            },
            {
                value: "13",
            },
            {
                value: "30",
            },
            {
                value: "30",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "17",
            },
            {
                value: "20",
            },
            {
                value: "2",
            },
            {
                value: "2",
            },
            {
                value: "2",
            },
            {
                value: "D1S1656",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "18",
            },
            {
                value: "10",
            },
            {
                value: "3",
            },
            {
                value: "3",
            },
            {
                value: "",
            },
            {
                value: "D2S441",
            },
            {
                value: "25",
            },
            {
                value: "26",
            },
            {
                value: "24",
            },
            {
                value: "25",
            },
            {
                value: "24",
            },
            {
                value: "26",
            },
            {
                value: "24",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "20",
            },
            {
                value: "19",
            },
            {
                value: "4",
            },
            {
                value: "4",
            },
            {
                value: "",
            },
            {
                value: "D10S1248",
            },
            {
                value: "20",
            },
            {
                value: "20",
            },
            {
                value: "20",
            },
            {
                value: "21",
            },
            {
                value: "21",
            },
            {
                value: "21",
            },
            {
                value: "21",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "7",
            },
            {
                value: "16",
            },
            {
                value: "5",
            },
            {
                value: "5",
            },
            {
                value: "4",
            },
            {
                value: "D13S317",
            },
            {
                value: "30",
            },
            {
                value: "30",
            },
            {
                value: "30",
            },
            {
                value: "31",
            },
            {
                value: "31",
            },
            {
                value: "32",
            },
            {
                value: "31",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "12",
            },
            {
                value: "",
            },
            {
                value: "6",
            },
            {
                value: "6",
            },
            {
                value: "5",
            },
            {
                value: "PENTA E",
            },
            {
                value: "15",
            },
            {
                value: "16",
            },
            {
                value: "15",
            },
            {
                value: "16",
            },
            {
                value: "15",
            },
            {
                value: "16",
            },
            {
                value: "#N/D",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "5",
            },
            {
                value: "3",
            },
            {
                value: "7",
            },
            {
                value: "7",
            },
            {
                value: "6",
            },
            {
                value: "D16S539",
            },
            {
                value: "14",
            },
            {
                value: "15",
            },
            {
                value: "14",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "16",
            },
            {
                value: "#N/D",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "7",
            },
            {
                value: "D18S51",
            },
            {
                value: "18",
            },
            {
                value: "19",
            },
            {
                value: "19",
            },
            {
                value: "30",
            },
            {
                value: "13",
            },
            {
                value: "30",
            },
            {
                value: "30",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "19",
            },
            {
                value: "22",
            },
            {
                value: "9",
            },
            {
                value: "9",
            },
            {
                value: "8",
            },
            {
                value: "D2S1338",
            },
            {
                value: "25",
            },
            {
                value: "26",
            },
            {
                value: "24",
            },
            {
                value: "25",
            },
            {
                value: "24",
            },
            {
                value: "26",
            },
            {
                value: "24",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "1",
            },
            {
                value: "4",
            },
            {
                value: "10",
            },
            {
                value: "10",
            },
            {
                value: "9",
            },
            {
                value: "CSF1PO",
            },
            {
                value: "14",
            },
            {
                value: "15",
            },
            {
                value: "14",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "#N/D",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "16",
            },
            {
                value: "",
            },
            {
                value: "11",
            },
            {
                value: "11",
            },
            {
                value: "10",
            },
            {
                value: "PENTA D",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "8",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "2",
            },
            {
                value: "12",
            },
            {
                value: "12",
            },
            {
                value: "12",
            },
            {
                value: "11",
            },
            {
                value: "TH01",
            },
            {
                value: "20.3",
            },
            {
                value: "20.3",
            },
            {
                value: "20.3",
            },
            {
                value: "20.3",
            },
            {
                value: "20.3",
            },
            {
                value: "21.3",
            },
            {
                value: "20.3",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "4",
            },
            {
                value: "2",
            },
            {
                value: "13",
            },
            {
                value: "13",
            },
            {
                value: "12",
            },
            {
                value: "vWA",
            },
            {
                value: "18",
            },
            {
                value: "19",
            },
            {
                value: "19",
            },
            {
                value: "30",
            },
            {
                value: "13",
            },
            {
                value: "30",
            },
            {
                value: "30",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "9",
            },
            {
                value: "7",
            },
            {
                value: "14",
            },
            {
                value: "14",
            },
            {
                value: "13",
            },
            {
                value: "D21S11",
            },
            {
                value: "2",
            },
            {
                value: "3",
            },
            {
                value: "2",
            },
            {
                value: "3",
            },
            {
                value: "2",
            },
            {
                value: "2",
            },
            {
                value: "#N/D",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "6",
            },
            {
                value: "17",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "14",
            },
            {
                value: "D7S820",
            },
            {
                value: "10",
            },
            {
                value: "10",
            },
            {
                value: "10",
            },
            {
                value: "11",
            },
            {
                value: "11",
            },
            {
                value: "11",
            },
            {
                value: "11",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "16",
            },
            {
                value: "16",
            },
            {
                value: "15",
            },
            {
                value: "D5S818",
            },
            {
                value: "5",
            },
            {
                value: "6",
            },
            {
                value: "6",
            },
            {
                value: "7",
            },
            {
                value: "7",
            },
            {
                value: "8",
            },
            {
                value: "7",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "3",
            },
            {
                value: "5",
            },
            {
                value: "17",
            },
            {
                value: "17",
            },
            {
                value: "16",
            },
            {
                value: "TPOX",
            },
            {
                value: "14",
            },
            {
                value: "15",
            },
            {
                value: "15",
            },
            {
                value: "17",
            },
            {
                value: "17",
            },
            {
                value: "20",
            },
            {
                value: "17",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "10",
            },
            {
                value: "6",
            },
            {
                value: "18",
            },
            {
                value: "19",
            },
            {
                value: "17",
            },
            {
                value: "D8S1179",
            },
            {
                value: "25",
            },
            {
                value: "25",
            },
            {
                value: "25",
            },
            {
                value: "25",
            },
            {
                value: "24",
            },
            {
                value: "25",
            },
            {
                value: "25",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "13",
            },
            {
                value: "21",
            },
            {
                value: "19",
            },
            {
                value: "20",
            },
            {
                value: "18",
            },
            {
                value: "D12S391",
            },
            {
                value: "11",
            },
            {
                value: "11.3",
            },
            {
                value: "10",
            },
            {
                value: "11.3",
            },
            {
                value: "8",
            },
            {
                value: "10",
            },
            {
                value: "10",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "22",
            },
            {
                value: "11",
            },
            {
                value: "20",
            },
            {
                value: "21",
            },
            {
                value: "19",
            },
            {
                value: "D19S433",
            },
            {
                value: "20",
            },
            {
                value: "25",
            },
            {
                value: "25",
            },
            {
                value: "30",
            },
            {
                value: "30",
            },
            {
                value: "30.2",
            },
            {
                value: "30",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "21",
            },
            {
                value: "18",
            },
            {
                value: "21",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "SE33",
            },
            {
                value: "14",
            },
            {
                value: "42.3",
            },
            {
                value: "42.3",
            },
            {
                value: "44.3",
            },
            {
                value: "15",
            },
            {
                value: "44.3",
            },
            {
                value: "44.3",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "23",
            },
            {
                value: "14",
            },
            {
                value: "22",
            },
            {
                value: "23",
            },
            {
                value: "",
            },
            {
                value: "D22S1045",
            },
            {
                value: "10",
            },
            {
                value: "11",
            },
            {
                value: "10",
            },
            {
                value: "11",
            },
            {
                value: "10",
            },
            {
                value: "11",
            },
            {
                value: "#N/D",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "24",
            },
            {
                value: "9",
            },
            {
                value: "23",
            },
            {
                value: "18",
            },
            {
                value: "",
            },
            {
                value: "DYS391",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "14",
            },
            {
                value: "13",
            },
            {
                value: "24",
            },
            {
                value: "22",
            },
            {
                value: "20",
            },
            {
                value: "FGA",
            },
            {
                value: "20",
            },
            {
                value: "23",
            },
            {
                value: "20",
            },
            {
                value: "23",
            },
            {
                value: "23",
            },
            {
                value: "23",
            },
            {
                value: "#N/D",
            },
            {
                value: "N",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "25",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "DYS576",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "26",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "DYS570",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
        ],
        [
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "3",
            },
            {
                value: "D6S1043",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
            {
                value: "",
            },
        ],
    ];

    for (let i = 0, j = 0; i < table.length; i++, j += 2) {
        table[i][6].value = mother[j];
        table[i][7].value = mother[j + 1];
        table[i][8].value = son[j];
        table[i][9].value = son[j + 1];
        table[i][10].value = father[j];
        table[i][11].value = father[j + 1];
    }

    for (let i = 1; i < table.length; i++) {
        table[i][12].value = mandatoryColumn(table, i);
        table[i][13].value = exclusionColumn(table, i);
    }

    toast.success("Análise realizada", {
        position: "bottom-center",
        theme: "light",
    });

    return table;
};

const columnMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
};

export const getPosition = (
    table: { value: string }[][],
    column: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M",
    row: number
) => {
    return table[row][columnMap[column]].value;
};

export const mandatoryColumn = (table: { value: string }[][], row: number): string => {
    const motherAlelo = new Set<string>();

    motherAlelo.add(getPosition(table, "G", row));
    motherAlelo.add(getPosition(table, "H", row));

    if (motherAlelo.has(getPosition(table, "I", row))) {
        if (motherAlelo.has(getPosition(table, "J", row))) {
            if (getPosition(table, "I", row) == "") return "";

            return `${getPosition(table, "I", row)} / ${getPosition(table, "J", row)}`;
        } else {
            return getPosition(table, "J", row);
        }
    } else if (motherAlelo.has(getPosition(table, "J", row))) {
        return getPosition(table, "I", row);
    } else {
        return "Mutação Materna";
    }
};

export const exclusionColumn = (table: { value: string }[][], row: number): string => {
    if (getPosition(table, "M", row) == "") return "";

    const fatherAlelos = new Set<string>();

    fatherAlelos.add(getPosition(table, "K", row));
    fatherAlelos.add(getPosition(table, "L", row));

    const mandatory = getPosition(table, "M", row);

    if (mandatory.includes("/")) {
        const heteroZigoto = mandatory.split("/");

        if (fatherAlelos.has(heteroZigoto[0].trim()) || fatherAlelos.has(heteroZigoto[1].trim())) {
            return "N";
        } else {
            return "S";
        }
    } else {
        if (fatherAlelos.has(mandatory)) {
            return "N";
        } else {
            return "S";
        }
    }
};

export const analise = (table: { value: string }[][]): [boolean, number] => {
    let nCount = 0;
    let total = 0;

    console.log(table);

    for (let i = 0; i < table.length; i++) {
        if (table[i][13].value == "") continue;

        if (table[i][13].value == "N") {
            nCount += 1;
        }

        total += 1;
    }

    return [!(nCount >= 0.95 * total), 0.5 + 0.5 * (nCount / total)];
};
