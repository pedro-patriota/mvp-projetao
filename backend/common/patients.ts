import { nanoid } from 'nanoid'
import z from 'zod'

export const PatientSexSchema = z.enum(['Masculino', 'Feminino'])

export type PatientSex = z.infer<typeof PatientSexSchema>

export const PatientSchema = z.object({
    name: z.string(),
    nascimento: z.string(),
    phone: z.string(),
    naturality: z.string(),
    cpf: z.string(),
    rg: z.string(),
    rgOrgao: z.string(),
    rgUF: z.string(),
    gender: PatientSexSchema,
    address: z.string(),
    city: z.string(),
    bairro: z.string(),
    addressUF: z.string(),
    addressCEP: z.string(),
    testemunha: z.string(),
    parenteBiologicoPai: z.string(),
    parentescoPai: z.string(),
    irmaoGemeo: z.string(),
    transplanteMedula: z.string(),
    transfusaoSangue: z.string(),
    genes: z.array(z.string()),
})

export const newPatient = (patient?: Partial<Patient>) => {
    const tempPatient: Patient = {
        cpf: nanoid(),
        nascimento: '',
        name: '',
        phone: '',
        naturality: '',
        rg: '',
        rgOrgao: '',
        rgUF: '',
        gender: 'Masculino',
        address: '',
        city: '',
        bairro: '',
        addressUF: '',
        addressCEP: '',
        testemunha: 'false',
        parenteBiologicoPai: 'false',
        parentescoPai: 'false',
        irmaoGemeo: 'false',
        transplanteMedula: 'false',
        transfusaoSangue: 'false',
        genes: [],
    }

    if (patient != undefined) {
        return { ...tempPatient, ...patient }
    } else {
        return tempPatient
    }
}

export type Patient = z.infer<typeof PatientSchema>
