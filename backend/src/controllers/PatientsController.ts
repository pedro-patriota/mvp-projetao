import { Request, Response } from 'express'
import { PatientsModel } from '../model/patients/model'
import { Patient, PatientSchema } from '../../common/patients'
import { nanoid } from 'nanoid'

export async function CreatePatient(request: Request, response: Response) {
    const schema = PatientSchema.omit({ id: true })
    const id = nanoid()

    const parsedPatient = schema.safeParse(request.body)

    if (parsedPatient.success) {
        await PatientsModel.create({ id, ...request.body })
            .then(() => {
                response.status(201).send({ id })
            })
            .catch((e) => {
                console.log(e)
                response.status(500).send()
            })
    } else {
        response.status(500).send()
    }
}

export async function GetPatient(request: Request, response: Response) {
    await PatientsModel.findAll()
        .then((res) => {
            let patients: Patient[] = []

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
