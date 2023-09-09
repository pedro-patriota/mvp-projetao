import express from 'express'
import * as PatientsController from '../controllers/PatientsController'

const PatientsRouter = express.Router()

PatientsRouter.route('').post(PatientsController.CreatePatient)
PatientsRouter.route('/all').get(PatientsController.GetAllPatients)
PatientsRouter.route('').get(PatientsController.GetPatient)
PatientsRouter.route('').put(PatientsController.UpdatePatient)
PatientsRouter.route('').delete(PatientsController.DeletePatient)

export default PatientsRouter
