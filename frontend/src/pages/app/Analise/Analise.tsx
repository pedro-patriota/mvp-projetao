import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Spreadsheet from "react-spreadsheet";

export default function Analise() {
  const [isEditing, setIsEditing] = useState(false);
  const [idCase, setIdCase] = useState("2023/001")

  //sample data
  const csvData = `
  ,,,,,AMEL,X X,X Y,X Y,,,
  11,1,1,1,1,D3S1358,18 19,19 30,13 30,30,N,,
  17,20,2,2,2,D1S1656,15 15,15 15,15 15,15,N,,
  18,10,3,3,,D2S441,25 26,24 25,24 26,24,N,,
  20,19,4,4,,D10S1248,20 20,20 21,21 21,21,N,,
  7,16,5,5,4,D13S317,30 30,30 31,31 32,31,N,,
  12,,6,6,5,PENTA E,15 16,15 16,15 16,15/16,N,,
  5,3,7,7,6,D16S539,14 15,14 15,15 16,14/15,N,,
  8,8,8,8,7,D18S51,18 19,19 30,13 30,30,N,,
  19,22,9,9,8,D2S1338,25 26,24 25,24 26,24,N,,
  1,4,10,10,9,CSF1PO,14 15,14 15,15 15,14/15,N,,
  16,,11,11,10,PENTA D,8 8,8 8,8 8,8,N,,
  2,12,12,12,11,TH01,20.3 20.3,20.3 20.3,20.3 21.3,20.3,N,,
  4,2,13,13,12,vWA,18 19,19 30,13 30,30,N,,
  9,7,14,14,13,D21S11,2 3,2 3,2 2,2/3,N,,
  6,17,15,15,14,D7S820,10 10,10 11,11 11,11,N,,
  15,15,16,16,15,D5S818,5 6,6 7,7 8,7,N,,
  3,5,17,17,16,TPOX,14 15,15 17,17 20,17,N,,
  10,6,18,19,17,D8S1179,25 25,25 25,24 25,25,N,,
  13,21,19,20,18,D12S391,11 11.3,10 11.3,8 10,10,N,,
  22,11,20,21,19,D19S433,20 25,25 30,30 30.2,30,N,,
  21,18,21,,,,SE3314, 42.3 42.3, 44.3 15, 44.3 44.3,N,,
  23,14,22,23,,D22S1045,10 11,10 11, 10 11, 10/11,N,,
  24,9,23,18,,DYS391,,,,,,,,,
  14,13,24,22,20,FGA,20 23,20 23,23 23,20/23,N,,
  ,,,25,,DYS576,,,,,,,,,,,
  ,,,26,,DYS570,,,,,,,,,,
  ,,,3,,D6S1043,,,,,,,,,,
  `;
  
  //process CSV 
  const processData = (csvString) => {
    const rows = csvString.trim().split("\n");
    return rows.map((row) => {
      const values = row.split(",");
      return values.map((value) => ({ value }));
    });
  };

  const [tableData, setTableData] = useState(processData(csvData));

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

  

  const handleSpreadsheetChange = (data) => {
    setTableData(data);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "100%",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#d1d5db",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="text">CASO {idCase}</Typography>
          <Typography level="h2">Análise Genotípica</Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Salvar tabela" : "Editar tabela"}
            </Button>
          </Box>
        </Box>

        {isEditing ? (
          <Spreadsheet
            data={tableData}
            columnLabels={columns}
            onChange={handleSpreadsheetChange}
          />
        ) : (
          <table style={{ margin: "auto", width: "110%" }}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    style={{
                      backgroundColor: "#646cff",
                      color: "white",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ textAlign: "center", padding: "10px"}}>{cell.value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Box>
    </Box>
  );
}
