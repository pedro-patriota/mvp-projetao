import { Button, FormControl, FormLabel, Input, Link, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import React, { useState } from "react";
import SignInImage from "../assets/signin.svg";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../../../backend/common/user";
import CSS from 'csstype'

const h1StyleNotFound: CSS.Properties = {
    position: 'static',
    right: 0,
    bottom: '1rem',
    padding: '1.5rem',
    fontFamily: 'sans-serif',
    fontSize: '2rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
  };

  const pStyleNotFound: CSS.Properties = {
    position: 'static',
    right: 0,
    bottom: '1rem',
    padding: '1rem',
  };

const URL = "http://localhost:3000/notfound";

export default function NotFound() {

    return (
        <p style = {pStyleNotFound}>
            <h1 style = {h1StyleNotFound}>
                404 - Página não encontrada
            </h1>
            Desculpe! A página não pode ser encontrada. Por favor, retorne para a página anterior ou para a página principal.
        </p>
    );
}
