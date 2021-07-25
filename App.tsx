import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { Connection } from 'typeorm/browser'
import createDefaultAccountsAction from './src/actions/accounts/createDefaultAccountsAction'
import createDefaultCategoriesAction from './src/actions/categories/createDefaultCategoriesAction'
import loadExpenses from './src/actions/expenses/loadExpensesAction'
import Utils from './src/common/Utils'
import AccountContext from './src/context/AccountContext'
import CategoryContext from './src/context/CategoryContext'
import DbContext from './src/context/DbContext'
import ExpenseContext from './src/context/ExpenseContext'
import AppNavContainer from './src/navigations/AppNavContainer'
import AccountsReducer from './src/reducers/AccountsReducer'
import CategoryReducer from './src/reducers/CategoryReducer'
import ExpenseReducer from './src/reducers/ExpenseReducer'

LogBox.ignoreLogs(['Reanimated 2'])


interface Props {

}

const App = (props: Props) => {

  const [dbConnection, setDbConnection] = useState<Connection | null>(null)
  const [accounts, accountsDispatch] = useReducer(AccountsReducer, [])
  const [categories, categoriesDispatch] = useReducer(CategoryReducer, [])
  const [expenses, expensesDispatch] = useReducer(ExpenseReducer, [])

  const setUpConnection = useCallback(async () => {
    setDbConnection(await Utils.createConnection())
    await createDefaultAccountsAction(accountsDispatch)
    await createDefaultCategoriesAction(categoriesDispatch)
    await loadExpenses(expensesDispatch)
  }, [])

  useEffect(() => {
    if (!dbConnection) {
      setUpConnection()
    } else {
      createDefaultAccountsAction(accountsDispatch)
      createDefaultCategoriesAction(categoriesDispatch)
      loadExpenses(expensesDispatch)
    }
  }, [])

  return (
    <DbContext.Provider value={{ dbConnection, setUpConnection }}>
      <AccountContext.Provider value={{ accounts, accountsDispatch }}>
        <CategoryContext.Provider value={{ categories, categoriesDispatch }}>
          <ExpenseContext.Provider value={{ expenses, expensesDispatch }}>
            <AppNavContainer />
          </ExpenseContext.Provider>
        </CategoryContext.Provider>
      </AccountContext.Provider>
    </DbContext.Provider>
  )
}

export default App
