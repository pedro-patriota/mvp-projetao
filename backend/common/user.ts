import z from 'zod'

export const UserSchema = z.object({
    fullName: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().nonempty(),
})

export type User = z.infer<typeof UserSchema>
