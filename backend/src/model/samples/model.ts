import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const SamplesModel = sequelize.define('SAMPLES', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    patientId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    collectionDate: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
})
