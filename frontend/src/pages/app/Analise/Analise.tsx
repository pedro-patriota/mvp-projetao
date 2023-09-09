import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Spreadsheet from "react-spreadsheet";

export default function Analise() {
  const [isEditing, setIsEditing] = useState(false);

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

  const tableData = [
    [
      { value: "Abigal", readonly: true },
      { value: "Global Filer" },
      { value: "Fusion_6c" },
      { value: "Fusion" },
      { value: "PP21" },
      { value: "Loco" },
      { value: "Mãe", children: [{ value: "X" }, { value: "Y" }] },
      { value: "Suposto Pai", children: [{ value: "X" }, { value: "Y" }] },
      { value: "Filho", children: [{ value: "X" }, { value: "" }] },
      { value: "Obrigatório" },
      { value: "Exclusão" },
      { value: "Observações" },
    ],
    [
      { value: "Row 1" },
      { value: "Row 2" },
      { value: "Row 3" },
      { value: "Row 4" },
      { value: "Row 5" },
      { value: "Row 6" },
      { value: "Row 7" },
      { value: "Row 8" },
      { value: "Row 9" },
      { value: "Row 10" },
      { value: "Row 11" },
      { value: "Row 12" },
    ],
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h1">CASO X</Typography>
          <Typography level="h1">Análise Genotípica</Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Salvar tabela" : "Editar tabela"}
            </Button>
            <Button variant="outlined">Auditoria</Button>
          </Box>
        </Box>

        {isEditing ? (
          <Spreadsheet data={tableData} columnLabels={columns} />
        ) : (
          <table>
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
