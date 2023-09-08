import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { useLocation } from 'react-router-dom';
import "./Coleta.css"

export default function Coleta() {
    const location = useLocation()

    const [father, setFather] = useState("Pai")
    const [mother, setMother] = useState("Mãe")
    const [child, setChild] = useState("Filho")
    const [collectedList, setCollectedList] = useState([])

    const getTimestamp = () => {
        const currentTimestamp = Date.now();
        const date = new Date(currentTimestamp);
        return date.toLocaleString('pt-BR')
    }

    //timestamp provisório do pai 
    let tsmp = getTimestamp()

    const [parents, setParents] = useState([
        { name: father, type: "pai", collected: true, timestamp: tsmp},
        { name: mother, type: "mae", collected: false, timestamp: ""},
        { name: child, type: "filho", collected: false, timestamp: ""},
    ]);

    const getCollectionTime = (parent) =>{
        if(parent.collected == false){
            const updatedParents = [...parents];

            const parentIndex = updatedParents.findIndex((p) => p.type === parent.type);

            updatedParents[parentIndex].collected = true;
            updatedParents[parentIndex].timestamp = getTimestamp();

            setParents(updatedParents);
        }
        
    }

    return (
        <Box
        sx={{
            padding: "2rem",
            width: "100%", 
            height: "100vh", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <Box
        sx={{
            height: "62%",
            width: "90%",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#d1d5db",
            boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "5.5rem",
            overflowY: "auto",
            borderRadius: "10px"
        }}
        >
            {parents.map((parent) => (
            <Box
                key={parent.type}
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                }}
            >
                <span>{parent.name}</span>
                <Button color="primary" className={(parent.collected == true) ? "button_coleta": ""} onClick={() => getCollectionTime(parent)}>{(parent.collected == true) ? "Coletado": "Coletar"}</Button>
            </Box>
            ))}
        </Box>
        </Box>
    );
    }