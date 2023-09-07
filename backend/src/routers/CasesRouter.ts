import express from 'express'
import * as CasesController from '../controllers/CasesController'

const CasesRouter = express.Router()

CasesRouter.route('').post(CasesController.CreateCase)
CasesRouter.route('/all').get(CasesController.GetAllCases)
CasesRouter.route('').get(CasesController.GetCase)
CasesRouter.route('').put(CasesController.UpdateCase)
CasesRouter.route('').delete(CasesController.DeleteCase)

export default CasesRouter
