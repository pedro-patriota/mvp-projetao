import { nanoid } from 'nanoid'
import z from 'zod'

export const processNameList = ['CADASTRO', 'COLETA', 'SEQUENCIAMENTO', 'ANALISE', 'DOCUMENTAÇÃO', 'CONCLUÍDO'] as const
export const ProcessNameSchema = z.enum(processNameList)
export type ProcessName = z.infer<typeof ProcessNameSchema>

const ProcessStatusSchema = z.enum(['PENDENTE', 'FAZENDO', 'FEITO'])
export type ProcessStatus = z.infer<typeof ProcessStatusSchema>

export const ProcessSchema = z.object({
    id: z.string(),
    name: ProcessNameSchema,
    detalhes: z.string(),
    status: ProcessStatusSchema,
    didBy: z.string(),
    currentStep: z.string(),
})

export const newProcess = (process?: Partial<Process>) => {
    const temp: Process = {
        id: nanoid(),
        name: 'CADASTRO',
        detalhes: '',
        status: 'PENDENTE',
        didBy: '',
        currentStep: '',
    }

    if (process != undefined) {
        return { ...temp, ...process }
    } else {
        return temp
    }
}

export type Process = z.infer<typeof ProcessSchema>
