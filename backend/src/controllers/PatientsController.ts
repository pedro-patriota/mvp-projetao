import { Request, Response } from 'express'
import { PatientsModel } from '../model/patients/model'
import { Patient, PatientSchema } from '../../common/patients'
import { nanoid } from 'nanoid'
import { z } from 'zod'

export async function CreatePatient(request: Request, response: Response) {
    const schema = PatientSchema.omit({ cpf: true })

    const parsedPatient = schema.safeParse(request.body)

    if (parsedPatient.success) {
        const tempPatient: Patient = {
            ...request.body,
            genes: JSON.stringify(request.body.genes),
        }

        await PatientsModel.create(tempPatient)
            .then(() => {
                response.status(201).send({ cpf: tempPatient.cpf })
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedPatient.error)
    }
}

export async function GetPatient(request: Request, response: Response) {
    const parsedGet = z.object({ cpf: z.string() }).safeParse(request.query)

    if (parsedGet.success) {
        await PatientsModel.findByPk((request.query as { cpf: string }).cpf)
            .then((patients) => {
                if (patients === null) {
                    response.status(404).send()
                    
                    return
                }

                response.status(200).send(patients)
            })
            .catch((e) => {
                response.status(500).send(e)
            })
    } else {
        response.status(400).send(parsedGet.error)
    }
}

export async function GetAllPatients(request: Request, response: Response) {
    await PatientsModel.findAll()
        .then((res) => {
            let patients: Patient[] = []

            for (let i = 0; i < res.length; i++) {
                patients.push(res[i].dataValues)
            }

            response.status(200).send(patients)
        })
        .catch((e) => {
            response.status(500).send(e)
        })
}

export async function UpdatePatient(request: Request, response: Response) {
    const parsedPatient = PatientSchema.safeParse(request.body)

    if (parsedPatient.success) {
        const parsedBody = request.body as Patient

        const result = await PatientsModel.update({ ...parsedBody, genes: JSON.stringify(request.body.genes) }, { where: { cpf: parsedBody.cpf } })

        if (result[0] === 0) {
            response.status(404).send()
            return
        }

        response.status(200).send()
    } else {
        response.status(400).send(parsedPatient.error)
    }

    return
}

export async function DeletePatient(request: Request, response: Response) {
    const parsedGet = z.object({ cpf: z.string() }).safeParse(request.body)

    if (parsedGet.success) {
        await PatientsModel.destroy({
            where: {
                cpf: request.body.cpf,
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
