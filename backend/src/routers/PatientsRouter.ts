import express from 'express'
import * as PateintsController from '../controllers/PatientsController'

const PatientsRouter = express.Router()
PatientsRouter.route('/create').post(PateintsController.Create)

export default PatientsRouter
