import React, { useState } from "react";
import CSVDataTable from "./CSVDataLabel";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { Button, Input, Radio, RadioGroup } from "@mui/joy";


const GeneticMaping = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;
        parseCSV(csvText);
      };

      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");
      if (currentLine.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(row);
      }
    }

    setCsvData(parsedData);
  };

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
      }}
    >
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
        }}
      >
         <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 1,
            borderTopLeftRadius: "var(--unstable_actionRadius)",
            borderTopRightRadius: "var(--unstable_actionRadius)",
          }}
        >

        <Typography
            level="body-lg"
            sx={{ flex: "1 1 100%" }}
            id="tableTitle"
            component="div"
            >
            Sequenciamentos
          </Typography>
        </Box>

        <div>
          <div style={{ marginBottom: '15px' }}>
            <input type="file" onChange={handleFileChange} accept=".csv" />
          </div>
          <CSVDataTable data={csvData} />
        </div>
      </Box>
    </Box>
  );
};

export default GeneticMaping;