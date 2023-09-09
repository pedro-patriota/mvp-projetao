import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const PatientsModel = sequelize.define('PATIENTS', {
    cpf: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sibling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    transplante: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    transfusao: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genes: {
        type: DataTypes.TEXT,
    },
})
