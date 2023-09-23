import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import React from "react";
import ScienceIcon from "@mui/icons-material/ScienceOutlined";
import Typography from "@mui/joy/Typography";
import GenoflowLogo from "../assets/LogoGenoflow.svg";

export default function Logo() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
                pointerEvents: "none",
            }}>
            <img src={GenoflowLogo} style={{ width: "1.5rem" }} />
            <Box sx={{ display: "flex", flexDirection: "row", pointerEvents: "none" }}>
                <Typography component="h1" fontWeight="xl" textColor="primary.500">
                    Geno
                </Typography>
                <Typography component="h1" fontWeight="xl">
                    flow
                </Typography>
            </Box>
        </Box>
    );
}
