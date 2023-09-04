import z from 'zod'

const ProcessNameSchema = z.enum(['CADASTRO', 'COLETA', 'SEQUENCIAMENTO', 'ANALISE', 'AUDITORIA', 'DOCUMENTAÇÃO', 'CONCLUÍDO'])
export type ProcessName = z.infer<typeof ProcessNameSchema>

const ProcessStatusSchema = z.enum(['PENDENTE', 'FAZENDO', 'FEITO'])
export type ProcessStatus = z.infer<typeof ProcessStatusSchema>

export const ProcessSchema = z.object({
    id: z.string(),
    name: ProcessNameSchema,
    detalhes: z.string(),
    status: ProcessStatusSchema,
    didBy: z.string(),
})

export type Process = z.infer<typeof ProcessSchema>
