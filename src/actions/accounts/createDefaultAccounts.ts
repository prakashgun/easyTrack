import { getRepository } from "typeorm/browser"
import { DB_CONNECTION_NAME } from "../../common/Utils"
import { Account } from "../../entities/Account"

export default async (dispatch) => {

    const accountRepository = await getRepository(Account, DB_CONNECTION_NAME)
    const accountsCount = await accountRepository.count()
    const account1 = new Account()

    if (accountsCount === 0) {
        account1.name = 'Cash'
        account1.balance = 0
        await accountRepository.save(account1)

        console.log('Default accounts saved')
        dispatch({ type: 'CREATED_DEFAULT_ACCOUNTS', payload: account1 })

    } else {
        const accounts = await accountRepository.find({ take: 10000 })
        dispatch({ type: 'GET_EXISTING_ACCOUNTS', payload: accounts })
    }
}