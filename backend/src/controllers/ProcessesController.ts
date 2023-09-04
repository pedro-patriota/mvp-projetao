import { Request, Response } from 'express'
import { Process, ProcessSchema } from '../../common/process'
import { nanoid } from 'nanoid'
import { ProcessModel } from '../model/processes/model'

export async function CreateProcess(request: Request, response: Response) {
    const schema = ProcessSchema.omit({ id: true })
    const id = nanoid()

    const parsedProcess = schema.safeParse(request.body)

    if (parsedProcess.success) {
        await ProcessModel.create({ id, ...request.body })
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

export async function GetProcess(request: Request, response: Response) {
    await ProcessModel.findAll()
        .then((res) => {
            let patients: Process[] = []

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

export async function UpdateProcess(request: Request, response: Response) {
    const parsedProcess = ProcessSchema.safeParse(request.body)

    if (parsedProcess.success) {
        const parsedBody = request.body as Process
        const user = await ProcessModel.findByPk(parsedBody.id)

        if (user === null) {
            response.status(404).send()
            return
        }

        const result = await ProcessModel.update({ ...parsedBody }, { where: { id: parsedBody.id } })

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
