import { Request, Response } from 'express'
import { Case, CaseSchema } from '../../common/case'
import { nanoid } from 'nanoid'
import { CaseModel } from '../model/case/model'

export async function CreateCase(request: Request, response: Response) {
    const schema = CaseSchema.omit({ id: true })
    const id = nanoid()

    const parsedCase = schema.safeParse(request.body)

    if (parsedCase.success) {
        await CaseModel.create({ id, ...request.body })
            .then(() => {
                response.status(201).send({ id })
            })
            .catch((e) => {
                console.log(e)
                response.status(500).send()
            })
    } else {
        response.status(400).send()
    }
}

export async function GetCase(request: Request, response: Response) {
    await CaseModel.findAll()
        .then((res) => {
            let patients: Case[] = []

            for (let i = 0; i < res.length; i++) {
                patients.push(res[i].dataValues)
            }

            response.status(200).send(patients)
        })
        .catch((e) => {
            console.log(e)
            response.status(500).send()
        })
}

export async function UpdateCase(request: Request, response: Response) {
    const parsedCase = CaseSchema.safeParse(request.body)

    if (parsedCase.success) {
        const parsedBody = request.body as Case
        const user = await CaseModel.findByPk(parsedBody.id)

        if (user === null) {
            response.status(404).send()
            return
        }

        const result = await CaseModel.update({ ...parsedBody }, { where: { id: parsedBody.id } })

        if (result[0] === 0) {
            response.status(404).send()
            return
        }

        response.status(200).send()
    } else {
        response.status(400).send()
    }

    return
}
