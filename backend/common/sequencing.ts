import { nanoid } from 'nanoid'
import z from 'zod'

export const SequencingSchema = z.object({
    id: z.string(),
    cases: z.array(z.string()),
    didBy: z.string(),
    kit: z.string(),
})

export const newSequencing = (sequencing?: Partial<Sequencing>) => {
    const temp: Sequencing = {
        id: nanoid(),
        cases: [],
        didBy: '',
        kit: '',
    }

    if (sequencing != undefined) {
        return { ...temp, sequencing }
    } else {
        return temp
    }
}

export type Sequencing = z.infer<typeof SequencingSchema>
