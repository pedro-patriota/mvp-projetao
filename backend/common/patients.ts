import z from 'zod'

export const PatientSexSchema = z.enum(['Male', 'Female'])

export type PatientSex = z.infer<typeof PatientSexSchema>

export const PatientSchema = z.object({
    id: z.string(),
    name: z.string(),
    gender: PatientSexSchema,
    age: z.number(),
})

export type Patient = z.infer<typeof PatientSchema>
