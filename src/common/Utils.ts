import { createConnection, getConnectionManager } from "typeorm/browser"
import { Account } from "../entities/Account"
import { Category } from "../entities/Category"
import { Expense } from "../entities/Expense"

export const DB_CONNECTION_NAME = 'easy_track'

export default class Utils {
    static createConnection() {
        try {
            console.log('Connection created')

            return createConnection({
                name: DB_CONNECTION_NAME,
                type: 'react-native',
                database: 'easy_track',
                location: 'easy_track',
                synchronize: true,
                logging: ['error', 'query', 'schema'],
                entities: [Account, Category, Expense],
            })
        } catch (error) {
            if (error === 'AlreadyHasActiveConnectionError') {
                const existentConn = getConnectionManager().get("easy_track")
                return existentConn
            } else {
                console.log('Db connection error', error)
            }
        }
    }
}