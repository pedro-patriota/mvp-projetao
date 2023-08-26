import express from 'express'
import * as UsersController from '../controllers/UserController'

const UsersRouter = express.Router()

UsersRouter.route('/create').post(UsersController.CreateUser)
UsersRouter.route('/get').get(UsersController.GetUser)
UsersRouter.route('/login').post(UsersController.LoginUser)

export default UsersRouter
