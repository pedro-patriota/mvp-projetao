function processArray(arr: string): string[] {
    const parsedArray: string[] = JSON.parse(arr);

    const result: string[] = [];

    for (let i = 0; i < parsedArray.length; i += 2) {
        if (i + 1 < parsedArray.length) {
            result.push(`${parsedArray[i]} ${parsedArray[i + 1]}`);
        } else {
            result.push(parsedArray[i]);
        }
    }

    return result;
}

export const newTable = (motherGenes: string, sonGenes: string, fatherGenes: string) => {
    const mother: string[] = processArray(motherGenes);
    const son: string[] = processArray(sonGenes);
    const father: string[] = processArray(fatherGenes);

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
                value: "X X",
            },
            {
                value: "X Y",
            },
            {
                value: "X Y",
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
                value: "18 19",
            },
            {
                value: "19 30",
            },
            {
                value: "13 30",
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
                value: "15 15",
            },
            {
                value: "15 15",
            },
            {
                value: "15 15",
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
                value: "25 26",
            },
            {
                value: "24 25",
            },
            {
                value: "24 26",
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
                value: "20 20",
            },
            {
                value: "20 21",
            },
            {
                value: "21 21",
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
                value: "30 30",
            },
            {
                value: "30 31",
            },
            {
                value: "31 32",
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
                value: "15 16",
            },
            {
                value: "15 16",
            },
            {
                value: "15 16",
            },
            {
                value: "15/16",
            },
            {
                value: "N",
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
                value: "14 15",
            },
            {
                value: "14 15",
            },
            {
                value: "15 16",
            },
            {
                value: "14/15",
            },
            {
                value: "N",
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
                value: "18 19",
            },
            {
                value: "19 30",
            },
            {
                value: "13 30",
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
                value: "25 26",
            },
            {
                value: "24 25",
            },
            {
                value: "24 26",
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
                value: "14 15",
            },
            {
                value: "14 15",
            },
            {
                value: "15 15",
            },
            {
                value: "14/15",
            },
            {
                value: "N",
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
                value: "8 8",
            },
            {
                value: "8 8",
            },
            {
                value: "8 8",
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
                value: "20.3 20.3",
            },
            {
                value: "20.3 20.3",
            },
            {
                value: "20.3 21.3",
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
                value: "18 19",
            },
            {
                value: "19 30",
            },
            {
                value: "13 30",
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
                value: "2 3",
            },
            {
                value: "2 3",
            },
            {
                value: "2 2",
            },
            {
                value: "2/3",
            },
            {
                value: "N",
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
                value: "10 10",
            },
            {
                value: "10 11",
            },
            {
                value: "11 11",
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
                value: "5 6",
            },
            {
                value: "6 7",
            },
            {
                value: "7 8",
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
                value: "14 15",
            },
            {
                value: "15 17",
            },
            {
                value: "17 20",
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
                value: "25 25",
            },
            {
                value: "25 25",
            },
            {
                value: "24 25",
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
                value: "11 11.3",
            },
            {
                value: "10 11.3",
            },
            {
                value: "8 10",
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
                value: "20 25",
            },
            {
                value: "25 30",
            },
            {
                value: "30 30.2",
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
                value: "",
            },
            {
                value: "SE3314",
            },
            {
                value: " 42.3 42.3",
            },
            {
                value: " 44.3 15",
            },
            {
                value: " 44.3 44.3",
            },
            {
                value: "N",
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
                value: "10 11",
            },
            {
                value: "10 11",
            },
            {
                value: " 10 11",
            },
            {
                value: " 10/11",
            },
            {
                value: "N",
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
                value: "20 23",
            },
            {
                value: "20 23",
            },
            {
                value: "23 23",
            },
            {
                value: "20/23",
            },
            {
                value: "N",
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
                value: "25",
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
                value: "26",
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
                value: "3",
            },
            {
                value: "",
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
            {
                value: "",
            },
        ],
    ];

    for (let i = 0; i < table.length; i++) {
        table[i][6].value = mother[i];
        table[i][7].value = son[i];
        table[i][8].value = father[i];
    }

    return table;
};
