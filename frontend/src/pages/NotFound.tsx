import React from "react";
import CSS from "csstype";

const h1StyleNotFound: CSS.Properties = {
    position: "static",
    right: 0,
    bottom: "1rem",
    padding: "1.5rem",
    fontFamily: "sans-serif",
    fontSize: "2rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
};

const pStyleNotFound: CSS.Properties = {
    position: "static",
    right: 0,
    bottom: "1rem",
    padding: "1rem",
};

export default function NotFound() {
    return (
        <p style={pStyleNotFound}>
            <h1 style={h1StyleNotFound}>404 - Página não encontrada</h1>
            Desculpe! A página não pode ser encontrada. Por favor, retorne para a página anterior ou
            para a página principal.
        </p>
    );
}
