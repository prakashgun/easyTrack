import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { Connection, getRepository } from 'typeorm/browser'
import Utils from '../common/utils'
import HeaderBar from '../components/HeaderBar'
import AppContext from '../context/AppContext'
import { Account } from '../entities/Account'

interface Props {
}

const AccountsScreen: React.FC<Props> = () => {
    const navigation = useNavigation()
    const {accounts, updateAccounts} = useContext(AppContext)
    const [connection, setConnection] = useState<Connection | null>(null)

    const list = [
        {
            name: 'Cash',
            icon_name: 'bank',
            icon_type: 'font-awesome',
            amount: 10000
        },
        {
            name: 'Axis Bank',
            icon_name: 'bank',
            icon_type: 'font-awesome',
            amount: 125000
        }
    ]

    const setUpConnection = useCallback(async () => {
        setConnection(await Utils.createConnection())
        await updateAccounts()
    }, [])


    useEffect(() => {
        if (!connection) {
            console.log('setting up connection again')
            setUpConnection()
        } else {
            console.log('Calling getAccounts')
            updateAccounts()
        }
    }, [])

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', async () => {
    //         //Screen is focused
    //             console.log('Calling getAccounts')
    //             getAccounts()
    //     })
    // }, [navigation])

    const onDeletePress = async (account: Account) => {
        console.log('Account to be deleted', account)
        const accountRepository = await getRepository(Account, 'easy_track')
        await accountRepository.remove(account)
        console.log('Account deleted')
        await updateAccounts()
    }

    const onAddItemPress = () => {
        navigation.navigate('AddAccount')
    }

    return (
        <View>
            <HeaderBar title="Accounts" />
            {
                accounts.map((l, i) => (
                    <ListItem.Swipeable
                        key={i}
                        bottomDivider
                        rightContent={
                            <Button
                                title="Delete"
                                icon={{ name: 'delete', color: 'white' }}
                                buttonStyle={styles.deleteButton}
                                onPress={() => onDeletePress(l)} />
                        }
                    >
                        <Icon name="bank" type="font-awesome" />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content right={true}>
                            <ListItem.Title>{l.balance}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem.Swipeable>
                ))
            }
            <ListItem>
                <Icon name="account-balance-wallet" type="material-icons" />
                <ListItem.Content>
                    <ListItem.Title>Balance</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right={true}>
                    <Text>1780000</Text>
                </ListItem.Content>
            </ListItem>
            <Button
                icon={
                    <Icon
                        name="add"
                        size={15}
                        color="white"
                    />
                }
                title="Add"
                onPress={onAddItemPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    deleteButton: {
        minHeight: '100%',
        backgroundColor: 'red'
    }
})

export default AccountsScreen