import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";

export default function AuditTable({ data, columns, onButtonClick }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography level="h2">Auditoria</Typography>
      <Button variant="outlined" onClick={onButtonClick}>
        Análise
      </Button>
      <table style={{ margin: "auto", width: "100%" }}>
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}