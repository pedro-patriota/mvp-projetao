import { Request, Response } from 'express'

export async function Create(request: Request, response: Response) {
    response.status(200).send()
}
