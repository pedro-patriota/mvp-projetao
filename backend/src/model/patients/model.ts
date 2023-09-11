import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const PatientsModel = sequelize.define('PATIENTS', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    naturality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    rg: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    rgOrgao: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    rgUF: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressUF: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressCEP: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    testemunha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parenteBiologicoPai: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parentescoPai: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    irmaoGemeo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transplanteMedula: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transfusaoSangue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genes: {
        type: DataTypes.TEXT,
    },
})
