import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import React from "react";
import ScienceIcon from "@mui/icons-material/ScienceOutlined";
import Typography from "@mui/joy/Typography";

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
            <IconButton size="sm" variant="soft">
                <ScienceIcon />
            </IconButton>
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
