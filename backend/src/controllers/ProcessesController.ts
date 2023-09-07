import { Request, Response } from 'express'
import { Process, ProcessSchema } from '../../common/process'
import { nanoid } from 'nanoid'
import { ProcessModel } from '../model/processes/model'
import { z } from 'zod'

export async function CreateProcess(request: Request, response: Response) {
    const schema = ProcessSchema.omit({ id: true })
    const id = nanoid()

    const parsedProcess = schema.safeParse(request.body)

    if (parsedProcess.success) {
        const tempProcess: Process = {
            id,
            ...request.body,
        }

        await ProcessModel.create(tempProcess)
            .then(() => {
                response.status(201).send({ id })
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedProcess.error)
    }
}

export async function GetProcess(request: Request, response: Response) {
    const parsedGet = z.object({ id: z.string() }).safeParse(request.query)

    if (parsedGet.success) {
        await ProcessModel.findByPk((request.query as { id: string }).id)
            .then((Processs) => {
                if (Processs === null) {
                    response.status(404).send()
                    return
                }

                response.status(200).send(Processs)
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedGet.error)
    }
}

export async function GetAllProcesss(request: Request, response: Response) {
    await ProcessModel.findAll()
        .then((res) => {
            let Processs: Process[] = []

            for (let i = 0; i < res.length; i++) {
                Processs.push(res[i].dataValues)
            }

            response.status(200).send(Processs)
        })
        .catch((e) => {
            response.status(500).send(e)
        })
}

export async function UpdateProcess(request: Request, response: Response) {
    const parsedProcess = ProcessSchema.safeParse(request.body)

    if (parsedProcess.success) {
        const parsedBody = request.body as Process

        const result = await ProcessModel.update({ ...parsedBody }, { where: { id: parsedBody.id } })

        if (result[0] === 0) {
            response.status(404).send()
            return
        }

        response.status(200).send()
    } else {
        response.status(400).send(parsedProcess.error)
    }

    return
}

export async function DeleteProcess(request: Request, response: Response) {
    const parsedGet = z.object({ id: z.string() }).safeParse(request.body)

    if (parsedGet.success) {
        await ProcessModel.destroy({
            where: {
                id: request.body.id,
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
