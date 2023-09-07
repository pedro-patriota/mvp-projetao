import express from 'express'
import * as ProcessesController from '../controllers/ProcessesController'

const ProcessRouter = express.Router()

ProcessRouter.route('').post(ProcessesController.CreateProcess)
ProcessRouter.route('/all').get(ProcessesController.GetAllProcesss)
ProcessRouter.route('').get(ProcessesController.GetProcess)
ProcessRouter.route('').put(ProcessesController.UpdateProcess)
ProcessRouter.route('').delete(ProcessesController.DeleteProcess)

export default ProcessRouter
