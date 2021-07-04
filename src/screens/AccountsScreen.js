import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import Utils from '../common/utils'
import HeaderBar from '../components/HeaderBar'
import { Account } from '../entities/Account'
import { Category } from '../entities/Category'


export default function AccountsScreen() {
    const navigation = useNavigation()
    const [accounts, setAccounts] = useState([])

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

    const createAccounts = async () => {
        await Utils.createConnection()

        const accountRepository = getRepository(Account)

        const accountsCount = await accountRepository.count()

        if (accountsCount === 0) {
            const account1 = new Account()
            account1.name = 'Cash'
            account1.balance = 0
            await accountRepository.save(account1)

            console.log('Default accounts saved')
        }

        const accounts = await accountRepository.find({ take: 5 })

        console.log('Accounts', accounts)
        setAccounts(accounts)

    }

    useEffect(() => {
        //First loading
        createAccounts()
    }, [])

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async ()=>{
            //Screen is focused
            const accountRepository = getRepository(Account)
            const accounts = await accountRepository.find({ take: 5 })
            setAccounts(accounts)
        })        
    }, [navigation])

    const onDeletePress = () => {
        console.log('Delete pressed')
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
                                onPress={onDeletePress} />
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
