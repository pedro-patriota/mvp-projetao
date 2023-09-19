import { Request, Response } from 'express'
import { User, UserSchema } from '../../common/user'
import { UserModel } from '../model/user/model'
import { z } from 'zod'

export async function CreateUser(request: Request, response: Response) {
    const parsedUser = UserSchema.safeParse(request.body)

    if (parsedUser.success) {
        const tempUser: User = request.body

        await UserModel.create(tempUser)
            .then(() => {
                response.status(200).send({ email: tempUser.email })
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
        await UserModel.findByPk((request.query as { email: string }).email)
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
    await UserModel.findAll()
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
    const idParse = z.object({ id: z.string() }).safeParse(request.query)

    if (idParse.success) {
        let body = request.body

        const parsedCase = UserSchema.partial().safeParse(body)

        if (parsedCase.success) {
            let parsedBody = request.body

            const result = await UserModel.update(parsedBody, { where: { id: request.query.id } })

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            response.status(200).send()
        } else {
            response.status(400).send(parsedCase.error)
        }
    } else {
        response.status(400).send(idParse.error)
    }
}

export async function DeleteUser(request: Request, response: Response) {
    const parsedGet = z.object({ email: z.string() }).safeParse(request.body)

    if (parsedGet.success) {
        await UserModel.destroy({
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
        await UserModel.findByPk(parsedRequest.data.email)
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
