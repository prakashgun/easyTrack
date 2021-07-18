import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { Connection } from 'typeorm/browser'
import createDefaultAccounts from './src/actions/accounts/createDefaultAccounts'
import createDefaultCategories from './src/actions/categories/createDefaultCategories'
import Utils from './src/common/Utils'
import AccountContext from './src/context/AccountContext'
import CategoryContext from './src/context/CategoryContext'
import DbContext from './src/context/DbContext'
import AppNavContainer from './src/navigations/AppNavContainer'
import AccountsReducer from './src/reducers/AccountsReducer'
import CategoryReducer from './src/reducers/CategoryReducer'

LogBox.ignoreLogs(['Reanimated 2'])


interface Props {

}

const App = (props: Props) => {

  const [dbConnection, setDbConnection] = useState<Connection | null>(null)
  const [accounts, accountsDispatch] = useReducer(AccountsReducer, [])
  const [categories, categoriesDispatch] = useReducer(CategoryReducer, [])

  const setUpConnection = useCallback(async () => {
    setDbConnection(await Utils.createConnection())
    await createDefaultAccounts(accountsDispatch)
    await createDefaultCategories(categoriesDispatch)
  }, [])

  useEffect(() => {
    if (!dbConnection) {
      setUpConnection()
    } else {
      createDefaultAccounts(accountsDispatch)
      createDefaultCategories(categoriesDispatch)
    }
  }, [])

  return (
    <DbContext.Provider value={{ dbConnection, setUpConnection }}>
      <AccountContext.Provider value={{ accounts, accountsDispatch }}>
        <CategoryContext.Provider value={{ categories, categoriesDispatch }}>
          <AppNavContainer />
        </CategoryContext.Provider>
      </AccountContext.Provider>
    </DbContext.Provider>
  )
}

export default App
