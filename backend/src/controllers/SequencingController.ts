import { Request, Response } from 'express'
import { Sequencing, SequencingSchema } from '../../common/sequencing'
import { nanoid } from 'nanoid'
import { SequencingModel } from '../model/sequencing/model'
import { z } from 'zod'

export async function CreateSequencing(request: Request, response: Response) {
    const schema = SequencingSchema.omit({ id: true })
    const id = nanoid()

    const parsedSequencing = schema.safeParse(request.body)

    if (parsedSequencing.success) {
        const tempSequencing: Sequencing = {
            id,
            ...request.body,
            cases: JSON.stringify(request.body.cases),
            map: JSON.stringify(request.body.map),
        }

        await SequencingModel.create(tempSequencing)
            .then(() => {
                response.status(201).send({ id })
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedSequencing.error)
    }
}

export async function GetSequencing(request: Request, response: Response) {
    const parsedGet = z.object({ id: z.string() }).safeParse(request.query)

    if (parsedGet.success) {
        await SequencingModel.findByPk((request.query as { id: string }).id)
            .then((sequencings) => {
                if (sequencings === null) {
                    response.status(404).send()
                    return
                }

                response.status(200).send(sequencings)
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedGet.error)
    }
}

export async function GetAllSequencings(request: Request, response: Response) {
    await SequencingModel.findAll()
        .then((res) => {
            let patients: Sequencing[] = []

            for (let i = 0; i < res.length; i++) {
                patients.push(res[i].dataValues)
            }

            response.status(200).send(patients)
        })
        .catch((e) => {
            response.status(500).send(e)
        })
}

export async function UpdateSequencing(request: Request, response: Response) {
    const parsedSequencing = SequencingSchema.safeParse(request.body)

    if (parsedSequencing.success) {
        const parsedBody = request.body as Sequencing

        const result = await SequencingModel.update(
            { ...parsedBody, cases: JSON.stringify(request.body.cases), map: JSON.stringify(request.body.map) },
            { where: { id: parsedBody.id } }
        )

        if (result[0] === 0) {
            response.status(404).send()
            return
        }

        response.status(200).send()
    } else {
        response.status(400).send(parsedSequencing.error)
    }

    return
}

export async function DeleteSequencing(request: Request, response: Response) {
    const parsedGet = z.object({ id: z.string() }).safeParse(request.body)

    if (parsedGet.success) {
        await SequencingModel.destroy({
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
