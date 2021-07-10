import React, { useCallback, useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { Connection, getRepository } from 'typeorm/browser'
import Utils from './src/common/utils'
import { Account } from './src/entities/Account'
import AppNavContainer from './src/navigations/AppNavContainer'


interface Props {

}

const App = (props: Props) => {

  const [connection, setConnection] = useState<Connection | null>(null)

  const setUpConnection = useCallback(async () => {
    setConnection(await Utils.createConnection())
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
    }
  }, [])

  return (
    <AppNavContainer />
  )
}

export default App
