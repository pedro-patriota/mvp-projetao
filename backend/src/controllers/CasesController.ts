import { Request, Response } from 'express'
import { Case, CaseSchema, newCase } from '../../common/case'
import { CaseModel } from '../model/case/model'
import { z } from 'zod'
import { ReadAPPData, WriteAPPData } from '../utils/jsonHandler'
import { Process, newProcess, processNameList } from '../../common/process'
import { ProcessModel } from '../model/processes/model'

export async function CreateCase(request: Request, response: Response) {
    let appData = ReadAPPData()

    const id = appData.currentCase

    appData.currentCase += 1

    WriteAPPData(appData)

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
                console.log(e)
                response.status(500).send(e)

                return
            })
    }

    const tempCase: Case = newCase({ id: `${new Date().getFullYear()}-${id}`, processes })

    await CaseModel.create({ ...tempCase, processes: JSON.stringify(tempCase.processes) })
        .then(() => {
            response.status(200).send({ id: `${new Date().getFullYear()}-${id}` })
        })
        .catch((e) => {
            response.status(500).send(e)
        })
}

export async function GetCase(request: Request, response: Response) {
    const parsedGet = z.object({ id: z.string() }).safeParse(request.query)

    if (parsedGet.success) {
        await CaseModel.findByPk((request.query as { id: string }).id)
            .then((cases) => {
                if (cases === null) {
                    response.status(404).send()
                    return
                }

                response.status(200).send(cases)
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedGet.error)
    }
}

export async function GetAllCases(request: Request, response: Response) {
    await CaseModel.findAll()
        .then((res) => {
            let patients: Case[] = []

            for (let i = 0; i < res.length; i++) {
                patients.push(res[i].dataValues)
            }

            response.status(200).send(patients)
        })
        .catch((e) => {
            response.status(500).send(e)
        })
}

export async function UpdateCase(request: Request, response: Response) {
    const idParse = z.object({ id: z.string() }).safeParse(request.query)

    if (idParse.success) {
        let body = request.body

        if (body.processes != undefined) {
            body.processes = JSON.parse(body.processes)
        }

        const parsedCase = CaseSchema.partial().safeParse(body)

        if (parsedCase.success) {
            let parsedBody = request.body

            if (parsedBody.processes != undefined) {
                parsedBody.processes = JSON.stringify(parsedBody.processes)
            }

            const result = await CaseModel.update(parsedBody, { where: { id: request.query.id } })

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

export async function DeleteCase(request: Request, response: Response) {
    const parsedGet = z.object({ id: z.string() }).safeParse(request.body)

    if (parsedGet.success) {
        await CaseModel.destroy({
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
