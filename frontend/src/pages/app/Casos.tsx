import React from "react";

import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Box from "@mui/joy/Box";

import Typography from "@mui/joy/Typography";

import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import Layout from "../../components/Layout";

export default function Casos() {
    return (
        <Layout.Main
            sx={{
                padding: 0,
                width: "100vw",
                height: "100%",
                display: "flex",
                flexGrow: "true",
                flexDirection: "row",
            }}>
            <Box
                sx={{
                    width: "18rem",
                    display: "flex",
                    height: "100%",
                    flexDirection: "row",
                    backgroundColor: "neutral.100",
                }}>
                Sidebar
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    height: "100%",
                    flexDirection: "row",
                }}>
                Tabela
            </Box>

            <Box sx={{}}>
                <Sheet variant="outlined" sx={{ borderRadius: "sm", gridColumn: "1/-1" }}></Sheet>
            </Box>
        </Layout.Main>
    );
}
