import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import HeaderBar from '../components/HeaderBar'
import { Account } from '../entities/Account'

export default function AddAccountScreen() {

    const [name, setName] = useState('')
    const [balance, setBalance] = useState(0)
    const [nameError, setNameError] = useState('')
    const [balanceError, setBalanceError] = useState('')
    const navigation = useNavigation()

    const onAddItemPress = async () => {
        const accountRepository = getRepository(Account)

        if (name.length < 2) {
            setNameError('Name should be atleast two characters')
            return
        }

        const accountsCount = await accountRepository.count({ where: { name: name } })

        if (accountsCount > 0) {
            setNameError('Name already exists')
            return
        }

        const account = new Account()
        account.name = name
        account.balance = balance
        await accountRepository.save(account)
        console.log('Account saved')

        navigation.push('Accounts')
    }

    return (
        <View>
            <HeaderBar title="Add Account" />
            <Input
                placeholder="Account Name"
                leftIcon={{ type: 'font-awesome', name: 'bank' }}
                style={styles}
                onChangeText={setName}
                defaultValue={name}
            />
            {!!nameError && <Text style={{ color: 'red' }}>{nameError}</Text>}
            <Input
                placeholder="Balance"
                leftIcon={{ type: 'material-icons', name: 'account-balance-wallet' }}
                style={styles}
                keyboardType="numeric"
                onChangeText={setBalance}
            />
            {!!balanceError && <Text style={{ color: 'red' }}>{balanceError}</Text>}
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

const styles = StyleSheet.create({})