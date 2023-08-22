import express from 'express'
import * as PateintsController from '../controllers/PatientsController'

const PatientsRouter = express.Router()

PatientsRouter.route('/create').post(PateintsController.CreatePatient)
PatientsRouter.route('/get').get(PateintsController.GetPatient)

export default PatientsRouter
