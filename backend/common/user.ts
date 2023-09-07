import z from 'zod'

export const UserSchema = z.object({
    email: z.string().email(),
    fullName: z.string().nonempty(),
    password: z.string().nonempty(),
})

export type User = z.infer<typeof UserSchema>
