import z from 'zod'

export const SequencingSchema = z.object({
    id: z.string(),
    cases: z.array(z.string()),
})

export type Sequencing = z.infer<typeof SequencingSchema>
