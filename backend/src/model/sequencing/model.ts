import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const SequencingModel = sequelize.define('SEQUENCING', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    cases: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    didBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    map: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
})
