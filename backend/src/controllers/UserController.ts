import { Request, Response } from 'express'
import { User, UserSchema } from '../../common/user'
import { UsersModel } from '../model/user/model'

export async function CreateUser(request: Request, response: Response) {
    const parsedUser = UserSchema.safeParse(request.body)

    if (parsedUser.success) {
        await UsersModel.create({ ...request.body })
            .then(() => {
                response.status(201).send()
            })
            .catch((e) => {
                console.log(e)
                response.status(500).send()
            })
    } else {
        response.status(400).send()
    }
}

export async function GetUser(request: Request, response: Response) {
    const parsedRequest = UserSchema.pick({ email: true }).safeParse(request.body)

    if (parsedRequest.success) {
        await UsersModel.findByPk(parsedRequest.data.email)
            .then((user) => {
                if (user === null) {
                    response.status(404).send()
                } else {
                    response.status(200).send(user)
                }
            })
            .catch((e) => {
                console.log(e)
                response.status(500).send()
            })
    } else {
        response.status(400).send()
    }
}

export async function LoginUser(request: Request, response: Response) {
    const parsedRequest = UserSchema.pick({ email: true, password: true }).safeParse(request.body)

    if (parsedRequest.success) {
        await UsersModel.findByPk(parsedRequest.data.email)
            .then((user) => {
                if (user === null || parsedRequest.data.password !== (user as any as User).password) {
                    response.status(404).send()
                } else {
                    response.status(200).send(user)
                }
            })
            .catch((e) => {
                console.log(e)
                response.status(500).send()
            })
    } else {
        response.status(400).send()
    }
}
