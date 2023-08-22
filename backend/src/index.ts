import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { connectDB, sequelize } from './model/db'
import PatientsRouter from './routers/PatientsRouter'

const app: Application = express()
const port = 3000

app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    response.status(200).send('Everything is working!')
})

app.use('/patient', PatientsRouter)

app.all('*', (req: Request, res: Response) => {
    res.status(404).json(`Route: ${req.originalUrl} does not exist on this server.`)
})

app.listen(port, async () => {
    await connectDB()

    sequelize.sync({ force: false }).then(() => {
        console.log('✅Synced database successfully...')
    })

    console.log('🚀Server started Successfully')
})
