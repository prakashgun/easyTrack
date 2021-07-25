import { getRepository } from "typeorm/browser"
import { DB_CONNECTION_NAME } from "../../common/Utils"
import { Expense } from "../../entities/Expense"

export default async (dispatch) => {

    const expenseRepository = await getRepository(Expense, DB_CONNECTION_NAME)

    const expenses = await expenseRepository.find()
    dispatch({ type: 'GET_ALL_EXPENSES', payload: expenses })
}
