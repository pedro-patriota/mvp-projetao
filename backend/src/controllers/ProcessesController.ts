import { Request, Response } from 'express'
import { Process, ProcessNameSchema, ProcessSchema, newProcess, processNameList } from '../../common/process'
import { nanoid } from 'nanoid'
import { ProcessModel } from '../model/processes/model'
import { z } from 'zod'
import { CaseModel } from '../model/case/model'
import { Case } from '../../common/case'
import { PatientSchema } from '../../common/patients'
import { PatientsModel } from '../model/patients/model'
import { Op } from 'sequelize'

export async function CreateProcess(request: Request, response: Response) {
    const schema = ProcessSchema.omit({ id: true })
    const id = nanoid()

    let body = request.body

    const parsedProcess = schema.safeParse(request.body)

    if (parsedProcess.success) {
        await ProcessModel.create(body)
            .then(() => {
                response.status(200).send({ id })
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

export async function RollbackProcess(request: Request, response: Response) {
    const schema = z.object({
        caseId: z.string(),
        type: ProcessNameSchema,
    })

    const bodyParseParams = schema.safeParse(request.body)

    if (bodyParseParams.success) {
        const caseData: Case | undefined = await CaseModel.findByPk(request.body.caseId)
            .then((value) => {
                if (value != null && value != undefined) {
                    return { ...value.dataValues, processes: JSON.parse(value.dataValues.processes) } as Case
                } else {
                    return undefined
                }
            })
            .catch(() => undefined)

        if (caseData == undefined) {
            response.status(500).send()

            return
        }

        if (request.body.type == 'CADASTRO') {
            let result = await ProcessModel.update(
                {
                    mother: '',
                    son: '',
                    father: '',
                    status: 'FAZENDO',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[0],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await CaseModel.update(
                {
                    sonId: '',
                    fatherId: '',
                    motherId: '',
                },
                {
                    where: {
                        id: caseData.id,
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await ProcessModel.update(
                {
                    mother: 'false',
                    son: 'false',
                    father: 'false',
                    status: 'PENDENTE',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[1],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await ProcessModel.update(
                {
                    mother: '',
                    son: '',
                    father: '',
                    status: 'PENDENTE',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[2],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await ProcessModel.update(
                {
                    mother: '',
                    son: '',
                    father: '',
                    status: 'PENDENTE',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[3],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await PatientsModel.update(
                { genes: '' },
                {
                    where: {
                        [Op.or]: [{ cpf: caseData.fatherId }, { cpf: caseData.motherId }, { cpf: caseData.sonId }],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            } else {
                response.status(200).send()
            }
        } else if (request.body.type == 'COLETA') {
            let result = await ProcessModel.update(
                {
                    mother: 'false',
                    son: 'false',
                    father: 'false',
                    status: 'FAZENDO',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[1],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await ProcessModel.update(
                {
                    mother: '',
                    son: '',
                    father: '',
                    status: 'PENDENTE',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[2],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await ProcessModel.update(
                {
                    mother: '',
                    son: '',
                    father: '',
                    status: 'PENDENTE',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[3],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await PatientsModel.update(
                { genes: '' },
                {
                    where: {
                        [Op.or]: [{ cpf: caseData.fatherId }, { cpf: caseData.motherId }, { cpf: caseData.sonId }],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            } else {
                response.status(200).send()
            }
        } else {
            let result = await ProcessModel.update(
                {
                    mother: '',
                    son: '',
                    father: '',
                    status: 'FAZENDO',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[2],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await ProcessModel.update(
                {
                    mother: '',
                    son: '',
                    father: '',
                    status: 'PENDENTE',
                    detalhes: '',
                },
                {
                    where: {
                        id: caseData.processes[3],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            }

            result = await PatientsModel.update(
                { genes: '' },
                {
                    where: {
                        [Op.or]: [{ cpf: caseData.fatherId }, { cpf: caseData.motherId }, { cpf: caseData.sonId }],
                    },
                }
            )

            if (result[0] == 0) {
                response.status(404).send()
                return
            } else {
                response.status(200).send()
            }
        }
    } else {
        response.status(400).send()
    }
}
