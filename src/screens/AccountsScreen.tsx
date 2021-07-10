import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import HeaderBar from '../components/HeaderBar'
import AccountContext from '../context/AccountContext'
import DbContext from '../context/DbContext'
import { Account } from '../entities/Account'

interface Props {
}

const AccountsScreen: React.FC<Props> = () => {
    const navigation = useNavigation()
    const { accounts, updateAccounts } = useContext(AccountContext)
    const { dbConnection, setUpConnection } = useContext(DbContext)
    const [balance, setBalance] = useState<Number>(0)

    useEffect(() => {
        if (!dbConnection) {
            // setUpConnection()
        } else {
            updateBalance()
        }
    }, [accounts])

    const deleteAccount = async (account: Account) => {
        console.log('Account to be deleted', account)
        const accountRepository = await getRepository(Account, DB_CONNECTION_NAME)
        await accountRepository.remove(account)
        console.log('Account deleted')
        await updateAccounts()
        await updateBalance()
    }

    const updateBalance = async () => {
        console.log('Finding account total')
        const { sum } = await getRepository(Account, DB_CONNECTION_NAME)
            .createQueryBuilder('accounts')
            .select('sum(accounts.balance)', 'sum')
            .getRawOne()

        setBalance(sum)
    }

    const onDeletePress = (account: Account) => {
        Alert.alert(
            'Delete account ?',
            'Delete account name ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteAccount(account)
                }
            ]
        )
    }

    const onAddItemPress = () => {
        navigation.navigate('AddAccount')
    }

    return (
        <View>
            <HeaderBar title="Accounts" />
            {
                accounts.map((account, i) => (
                    <ListItem.Swipeable
                        key={i}
                        bottomDivider
                        rightContent={
                            <Button
                                title="Delete"
                                icon={{ name: 'delete', color: 'white' }}
                                buttonStyle={styles.deleteButton}
                                onPress={() => onDeletePress(account)} />
                        }
                    >
                        <Icon name="bank" type="font-awesome" />
                        <ListItem.Content>
                            <ListItem.Title>{account.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content right={true}>
                            <ListItem.Title>{account.balance}</ListItem.Title>
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
                    <Text>{balance}</Text>
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