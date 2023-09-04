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
})
