import { Request, Response } from 'express'
import { Process, ProcessSchema, newProcess, processNameList } from '../../common/process'
import { nanoid } from 'nanoid'
import { ProcessModel } from '../model/processes/model'
import { z } from 'zod'

export async function CreateProcess(request: Request, response: Response) {
    const schema = ProcessSchema.omit({ id: true })
    const id = nanoid()

    let body = request.body

    const parsedProcess = schema.safeParse(request.body)

    if (parsedProcess.success) {
        await ProcessModel.create(body)
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

export async function CreateAllCaseProcess(request: Request, response: Response) {
    let processes: string[] = []

    for (let i = 0; i < processNameList.length; i++) {
        let process: Process = newProcess({ name: processNameList[i] })

        if (processNameList[i] == 'CADASTRO') {
            process = { ...process, status: 'FAZENDO' }
        }

        await ProcessModel.create(process)
            .then(() => {
                processes.push(process.id)
            })
            .catch((e) => {
                response.status(500).send(e)
                return
            })
    }

    response.status(200).send(processes)
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

export async function GetAllProcess(request: Request, response: Response) {
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
    const id = z.object({ id: z.string() }).safeParse(request.query)

    if (id.success) {
        let body = request.body

        const parsedCase = ProcessSchema.partial().safeParse(body)

        if (parsedCase.success) {
            let parsedBody = request.body

            const result = await ProcessModel.update(parsedBody, { where: { id: request.query.id } })

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            response.status(200).send()
        } else {
            response.status(400).send(parsedCase.error)
        }
    } else {
        response.status(400).send(id.error)
    }
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
