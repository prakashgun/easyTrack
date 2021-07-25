import { getRepository } from "typeorm/browser"
import { DB_CONNECTION_NAME } from "../../common/Utils"
import { Account } from "../../entities/Account"

export default async (dispatch, account) => {

    const accountRepository = await getRepository(Account, DB_CONNECTION_NAME)
    await accountRepository.remove(account)
    console.log('Account deleted')
    dispatch({ type: 'ACCOUNT_DELETED', payload: account })
}