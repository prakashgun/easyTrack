import { createConnection, getConnectionManager } from "typeorm/browser"
import { Account } from "../entities/Account"
import { Category } from "../entities/Category"
import { Expense } from "../entities/Expense"

export default class Utils {
    static createConnection() {
        try {
            return createConnection({
                type: 'react-native',
                database: 'easy_track',
                location: 'default',
                synchronize: false, 
                logging: ['error', 'query', 'schema'],
                entities: [Account, Category, Expense],
            })
        } catch (error) {
            if(error === 'AlreadyHasActiveConnectionError'){
                const existentConn = getConnectionManager().get("default")
                return existentConn
            }else{
            console.log('Db connection error', error)
            }
        }
    }
}