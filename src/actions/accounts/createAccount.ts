import { getRepository } from "typeorm/browser"
import { DB_CONNECTION_NAME } from "../../common/Utils"
import { Account } from "../../entities/Account"

export default async (dispatch, account) => {

    const accountRepository = await getRepository(Account, DB_CONNECTION_NAME)
    await accountRepository.save(account)
    console.log('Account saved')
    dispatch({ type: 'ACCOUNT_CREATED', payload: account })
}