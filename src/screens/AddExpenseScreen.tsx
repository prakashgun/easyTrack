import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import HeaderBar from '../components/HeaderBar'
import ExpenseContext from '../context/ExpenseContext'
import { Expense } from '../entities/Expense'

interface Props {
}

const AddExpensesScreen: React.FC<Props> = () => {
    const [name, setName] = useState('')
    const [value, setValue] = useState(null)
    const [nameError, setNameError] = useState('')
    const [valueError, setValueError] = useState('')
    const navigation = useNavigation()
    const { expenses, updateExpenses } = useContext(ExpenseContext)

    const onAddItemPress = async () => {
        const expenseRepository = await getRepository(Expense, DB_CONNECTION_NAME)

        if (name.length < 2) {
            setNameError('Name should be atleast two characters')
            return
        }

        if (!value) {
            setValueError('Value cannot be empty')
            return
        }

        const expensesCount = await expenseRepository.count({ where: { name: name } })

        if (expensesCount > 0) {
            setNameError('Name already exists')
            return
        }

        const expense = new Expense()
        expense.name = name
        expense.value = value
        await expenseRepository.save(expense)
        console.log('Expense saved')
        await updateExpenses()

        navigation.navigate('Expenses')
    }

    return (
        <View>
            <HeaderBar title="Add Expense" />
            <Input
                placeholder="Expense Name"
                leftIcon={{ type: 'entypo', name: 'price-tag' }}
                style={styles}
                onChangeText={setName}
                defaultValue={name}
            />
            {!!nameError && <Text style={{ color: 'red' }}>{nameError}</Text>}
            <Input
                placeholder="Value"
                leftIcon={{ type: 'font-awesome', name: 'money' }}
                style={styles}
                keyboardType="numeric"
                onChangeText={setValue}
            />
            {!!valueError && <Text style={{ color: 'red' }}>{valueError}</Text>}
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

export default AddExpensesScreen