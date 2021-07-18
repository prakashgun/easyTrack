import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { Connection, getRepository } from 'typeorm/browser'
import createDefaultAccounts from './src/actions/accounts/createDefaultAccounts'
import Utils, { DB_CONNECTION_NAME } from './src/common/Utils'
import AccountContext from './src/context/AccountContext'
import CategoryContext from './src/context/CategoryContext'
import DbContext from './src/context/DbContext'
import { Category } from './src/entities/Category'
import AppNavContainer from './src/navigations/AppNavContainer'
import AccountsReducer from './src/reducers/AccountsReducer'

LogBox.ignoreLogs(['Reanimated 2'])


interface Props {

}

const App = (props: Props) => {

  const [dbConnection, setDbConnection] = useState<Connection | null>(null)
  const [accounts, accountsDispatch] = useReducer(AccountsReducer, [])
  const [categories, setCategories] = useState<Category[]>([])

  const getCategories = async () => {
    const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)
    setCategories(await categoryRepository.find({ take: 10000 }))
  }

  const setUpConnection = useCallback(async () => {
    setDbConnection(await Utils.createConnection())
    createDefaultAccounts(accountsDispatch)
    await createDefaultCategories()
    await getCategories()
  }, [])

  const createDefaultCategories = useCallback(async () => {

    const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)

    const categoriesCount = await categoryRepository.count()

    if (categoriesCount === 0) {
      const defaultCategories = [
        {
          name: 'Food',
          icon_name: 'fastfood',
          icon_type: 'material-icons'
        },
        {
          name: 'Clothing',
          icon_name: 'tshirt',
          icon_type: 'font-awesome-5'
        },
        {
          name: 'Transportation',
          icon_name: 'car',
          icon_type: 'font-awesome'
        },
        {
          name: 'Education',
          icon_name: 'graduation-cap',
          icon_type: 'font-awesome'
        },
        {
          name: 'Entertainment',
          icon_name: 'movie',
          icon_type: 'material-icons'
        },
        {
          name: 'Social',
          icon_name: 'group',
          icon_type: 'font-awesome'
        },
        {
          name: 'Investment',
          icon_name: 'bar-graph',
          icon_type: 'entypo'
        },
        {
          name: 'Health',
          icon_name: 'fitness-center',
          icon_type: 'material-icons'
        },
        {
          name: 'Medical',
          icon_name: 'medical-services',
          icon_type: 'material-icons'
        },
        {
          name: 'Others',
          icon_name: 'miscellaneous-services',
          icon_type: 'material-icons'
        }
      ]

      await categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values(defaultCategories)
        .execute()

      console.log('Default categories saved')
    }
  }, [])

  useEffect(() => {
    if (!dbConnection) {
      setUpConnection()
    } else {
      createDefaultAccounts(accountsDispatch)
      createDefaultCategories()
    }
  }, [])

  return (
    <DbContext.Provider value={{ dbConnection, setUpConnection }}>
      <AccountContext.Provider value={{ accounts, accountsDispatch }}>
        <CategoryContext.Provider value={{ categories, getCategories }}>
          <AppNavContainer />
        </CategoryContext.Provider>
      </AccountContext.Provider>
    </DbContext.Provider>
  )
}

export default App
