import { getRepository } from "typeorm/browser"
import { DB_CONNECTION_NAME } from "../../common/Utils"
import { Expense } from "../../entities/Expense"

export default async (dispatch, expense) => {

    const expenseRepository = await getRepository(Expense, DB_CONNECTION_NAME)
    await expenseRepository.save(expense)
    console.log('Expense saved')
    dispatch({ type: 'EXPENSE_CREATED', payload: expense })
}