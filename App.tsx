import React, { useCallback, useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { Connection, getRepository } from 'typeorm/browser'
import Utils from './src/common/utils'
import AppContext from './src/context/AppContext'
import { Account } from './src/entities/Account'
import AppNavContainer from './src/navigations/AppNavContainer'


interface Props {

}

const App = (props: Props) => {

  const [connection, setConnection] = useState<Connection | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])

  const updateAccounts = async () => {
    const accountRepository = await getRepository(Account, 'easy_track')
    setAccounts(await accountRepository.find({ take: 5 }))
}

  const setUpConnection = useCallback(async () => {
    setConnection(await Utils.createConnection())
    await createDefaultAccounts()
    await updateAccounts()
  }, [])

  const createDefaultAccounts = useCallback(async () => {

    const accountRepository = await getRepository(Account, 'easy_track')

    const accountsCount = await accountRepository.count()

    if (accountsCount === 0) {
      const account1 = new Account()
      account1.name = 'Cash'
      account1.balance = 0
      await accountRepository.save(account1)

      console.log('Default accounts saved')
    }
  }, [])

  useEffect(() => {
    if (!connection) {
      setUpConnection()
    } else {
      createDefaultAccounts()
      updateAccounts()
    }
  }, [])

  return (
    <AppContext.Provider value={{accounts, updateAccounts}}>
      <AppNavContainer />
    </AppContext.Provider>
  )
}

export default App
