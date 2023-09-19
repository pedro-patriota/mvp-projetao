import { Request, Response } from 'express'
import { Sequencing, SequencingSchema, newSequencing } from '../../common/sequencing'
import { SequencingModel } from '../model/sequencing/model'
import { z } from 'zod'
import { CaseModel } from '../model/case/model'
import { Case } from '../../common/case'
import { PatientsModel } from '../model/patients/model'
import { ProcessModel } from '../model/processes/model'
import { Process } from '../../common/process'
import { ReadAPPData, WriteAPPData } from '../utils/jsonHandler'
import { AppData } from '../../common/appdata'

export async function CreateSequencing(request: Request, response: Response) {
    let appData: AppData = ReadAPPData()

    const id = `${new Date().getFullYear()}-${appData.currentSequencing}`

    const tempSequencing: Sequencing = newSequencing({ id })
    appData.currentSequencing += 1

    WriteAPPData(appData)

    await SequencingModel.create({ ...tempSequencing, id, cases: JSON.stringify(tempSequencing.cases as any as string) })
        .then(() => {
            response.status(200).send({ id })
        })
        .catch((e) => {
            console.log(e)
            response.status(500).send(e)
        })
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
    const idParse = z.object({ id: z.string() }).safeParse(request.query)

    if (idParse.success) {
        let body = request.body

        const parsedCase = SequencingSchema.partial().safeParse(body)

        if (parsedCase.success) {
            let parsedBody = request.body

            if (parsedBody.map != undefined) {
                parsedBody.map = JSON.stringify(parsedBody.map)
            }

            if (parsedBody.cases != undefined) {
                parsedBody.cases = JSON.stringify(parsedBody.cases)
            }

            const result = await SequencingModel.update(parsedBody, { where: { id: request.query.id } })

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

export async function ProcessSequencingPatientGene(request: Request, response: Response) {
    const bodySchema = z.object({
        caseId: z.string(),
        person: z.enum(['F', 'M', 'P']),
        genes: z.array(z.string()),
    })

    const body = { ...request.body }

    const bodyParse = bodySchema.safeParse(body)

    if (bodyParse.success) {
        const caseData: Case | undefined = await CaseModel.findByPk(body.caseId)
            .then((value) => {
                if (value != null && value != undefined) {
                    return { ...value.dataValues, processes: JSON.parse(value.dataValues.processes) } as Case
                } else {
                    return undefined
                }
            })
            .catch(() => undefined)

        if (caseData == undefined) {
            console.log('1')
            response.status(500).send()
            return
        }

        if (body.person == 'M') {
            const result = await PatientsModel.update(
                { genes: JSON.stringify(body.genes) },
                {
                    where: {
                        cpf: caseData.motherId,
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            response.status(200).send()
        } else if (body.person == 'F') {
            const result = await PatientsModel.update(
                { genes: JSON.stringify(body.genes) },
                {
                    where: {
                        cpf: caseData.sonId,
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            response.status(200).send()
        } else {
            const genesResult = await PatientsModel.update(
                { genes: JSON.stringify(body.genes) },
                {
                    where: {
                        cpf: caseData.fatherId,
                    },
                }
            )

            if (genesResult[0] == 0) {
                console.log('2')
                response.status(500).send()
                return
            }

            const sequencingProcessResult = await ProcessModel.update({ status: 'FEITO' } as Partial<Process>, {
                where: {
                    id: caseData.processes[2],
                },
            })

            if (sequencingProcessResult[0] == 0) {
                console.log('3')
                response.status(500).send()
                return
            }

            const analiseProcessResult = await ProcessModel.update({ status: 'FAZENDO' } as Partial<Process>, {
                where: {
                    id: caseData.processes[3],
                },
            })

            if (analiseProcessResult[0] == 0) {
                console.log('4')
                response.status(500).send()
                return
            }

            response.status(200).send()
        }
    } else {
        response.status(400).send(bodyParse.error)
    }
}
