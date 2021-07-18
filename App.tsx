import React, { useCallback, useEffect, useState } from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { Connection, getRepository } from 'typeorm/browser'
import Utils, { DB_CONNECTION_NAME } from './src/common/Utils'
import AccountContext from './src/context/AccountContext'
import CategoryContext from './src/context/CategoryContext'
import DbContext from './src/context/DbContext'
import { Account } from './src/entities/Account'
import { Category } from './src/entities/Category'
import AppNavContainer from './src/navigations/AppNavContainer'

LogBox.ignoreLogs(['Reanimated 2'])


interface Props {

}

const App = (props: Props) => {

  const [dbConnection, setDbConnection] = useState<Connection | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [categories, setCategories] = useState<Category[]>([])


  const getAccounts = async () => {
    const accountRepository = await getRepository(Account, DB_CONNECTION_NAME)
    setAccounts(await accountRepository.find({ take: 10000 }))
  }

  const getCategories = async () => {
    const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)
    setCategories(await categoryRepository.find({ take: 10000 }))
  }

  const setUpConnection = useCallback(async () => {
    setDbConnection(await Utils.createConnection())
    await createDefaultAccounts()
    await getAccounts()
    await createDefaultCategories()
    await getCategories()
  }, [])

  const createDefaultAccounts = useCallback(async () => {

    const accountRepository = await getRepository(Account, DB_CONNECTION_NAME)

    const accountsCount = await accountRepository.count()

    if (accountsCount === 0) {
      const account1 = new Account()
      account1.name = 'Cash'
      account1.balance = 0
      await accountRepository.save(account1)

      console.log('Default accounts saved')
    }
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
      createDefaultAccounts()
      getAccounts()
      createDefaultCategories()
    }
  }, [])

  return (
    <DbContext.Provider value={{ dbConnection, setUpConnection }}>
      <AccountContext.Provider value={{ accounts, getAccounts }}>
        <CategoryContext.Provider value={{ categories, getCategories }}>
          <AppNavContainer />
        </CategoryContext.Provider>
      </AccountContext.Provider>
    </DbContext.Provider>
  )
}

export default App
