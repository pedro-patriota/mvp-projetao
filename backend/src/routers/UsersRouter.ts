import express from 'express'
import * as UsersController from '../controllers/UserController'

const UsersRouter = express.Router()

UsersRouter.route('').post(UsersController.CreateUser)
UsersRouter.route('/all').get(UsersController.GetAllUsers)
UsersRouter.route('').get(UsersController.GetUser)
UsersRouter.route('').put(UsersController.UpdateUser)
UsersRouter.route('').delete(UsersController.DeleteUser)
UsersRouter.route('/login').post(UsersController.LoginUser)

export default UsersRouter
