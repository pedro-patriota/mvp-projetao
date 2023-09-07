import express from 'express'
import * as PateintsController from '../controllers/PatientsController'

const PatientsRouter = express.Router()

PatientsRouter.route('').post(PateintsController.CreatePatient)
PatientsRouter.route('/all').get(PateintsController.GetAllPatients)
PatientsRouter.route('').get(PateintsController.GetPatient)
PatientsRouter.route('').put(PateintsController.UpdatePatient)
PatientsRouter.route('').delete(PateintsController.DeletePatient)

export default PatientsRouter
