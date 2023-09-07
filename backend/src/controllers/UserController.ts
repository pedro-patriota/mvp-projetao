import { Request, Response } from 'express'
import { User, UserSchema } from '../../common/user'
import { UsersModel } from '../model/user/model'
import { z } from 'zod'

export async function CreateUser(request: Request, response: Response) {
    const parsedUser = UserSchema.safeParse(request.body)

    if (parsedUser.success) {
        const tempUser: User = request.body

        await UsersModel.create(tempUser)
            .then(() => {
                response.status(201).send({ email: tempUser.email })
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedUser.error)
    }
}

export async function GetUser(request: Request, response: Response) {
    const parsedGet = z.object({ email: z.string().email() }).safeParse(request.query)

    if (parsedGet.success) {
        await UsersModel.findByPk((request.query as { email: string }).email)
            .then((users) => {
                if (users === null) {
                    response.status(404).send()
                    return
                }

                response.status(200).send(users)
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedGet.error)
    }
}

export async function GetAllUsers(request: Request, response: Response) {
    await UsersModel.findAll()
        .then((res) => {
            let patients: User[] = []

            for (let i = 0; i < res.length; i++) {
                patients.push(res[i].dataValues)
            }

            response.status(200).send(patients)
        })
        .catch((e) => {
            response.status(500).send(e)
        })
}

export async function UpdateUser(request: Request, response: Response) {
    const parsedUser = UserSchema.safeParse(request.body)

    if (parsedUser.success) {
        const parsedBody = request.body as User

        const result = await UsersModel.update({ ...parsedBody }, { where: { email: parsedBody.email } })

        if (result[0] === 0) {
            response.status(404).send()
            return
        }

        response.status(200).send()
    } else {
        response.status(400).send(parsedUser.error)
    }

    return
}

export async function DeleteUser(request: Request, response: Response) {
    const parsedGet = z.object({ email: z.string() }).safeParse(request.body)

    if (parsedGet.success) {
        await UsersModel.destroy({
            where: {
                email: request.body.email,
            },
        })
            .then((rowsAffected) => {
                if (rowsAffected === 0) {
                    response.status(404).send()
                } else {
                    response.status(200).send()
                }
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedGet.error)
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
                    response.status(200).send()
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
