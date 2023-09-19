import { nanoid } from 'nanoid'
import z from 'zod'

export const CaseSchema = z.object({
    id: z.string(),
    sonId: z.string(),
    fatherId: z.string(),
    motherId: z.string(),
    processes: z.array(z.string()),
    excluido: z.enum(['NAO ANALISADO', 'SIM', 'NAO']),
    probabilidade: z.number(),
})

export type Case = z.infer<typeof CaseSchema>

export function newCase(partialCase?: Partial<Case>) {
    const tempCase: Case = {
        id: nanoid(),
        sonId: '',
        fatherId: '',
        motherId: '',
        processes: [],
        excluido: 'NAO ANALISADO',
        probabilidade: 0.5,
    }

    if (partialCase) {
        return { ...tempCase, ...partialCase }
    } else return tempCase
}
