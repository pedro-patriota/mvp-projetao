import { z } from 'zod'

export const AppDataSchema = z.object({
    currentCase: z.number(),
    currentSequencing: z.number(),
})

export type AppData = z.infer<typeof AppDataSchema>
