import fs from 'fs'
import path from 'path'
import { AppData } from '../../common/appdata'

export function WriteAPPData(data: AppData): boolean {
    try {
        const json = JSON.stringify(data)
        fs.writeFileSync(path.join(__dirname, './appData.json'), json)

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export function ReadAPPData(): AppData {
    try {
        const data = fs.readFileSync(path.join(__dirname, './appData.json'), 'utf-8')

        return JSON.parse(data)
    } catch (error) {
        return {
            currentCase: 0,
            currentSequencing: 0,
        }
    }
}
