import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/data/db.sqlite',
})

export async function connectDB() {
    try {
        await sequelize.authenticate()
        console.log('✅ Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
