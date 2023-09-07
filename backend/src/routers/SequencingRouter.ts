import express from 'express'
import * as SequencingController from '../controllers/SequencingController'

const SequencingRouter = express.Router()

SequencingRouter.route('').post(SequencingController.CreateSequencing)
SequencingRouter.route('/all').get(SequencingController.GetAllSequencings)
SequencingRouter.route('').get(SequencingController.GetSequencing)
SequencingRouter.route('').put(SequencingController.UpdateSequencing)
SequencingRouter.route('').delete(SequencingController.DeleteSequencing)

export default SequencingRouter
