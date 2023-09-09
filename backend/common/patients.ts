import z from 'zod'

export const PatientSexSchema = z.enum(['Masculino', 'Feminino'])

export type PatientSex = z.infer<typeof PatientSexSchema>

export const PatientSchema = z.object({
    cpf: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    sibling: z.boolean(),
    transplante: z.boolean(),
    transfusao: z.boolean(),
    gender: PatientSexSchema,
    age: z.number(),
    genes: z.array(z.array(z.number())),
})

export type Patient = z.infer<typeof PatientSchema>
