import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import AccountContext from '../context/AccountContext'
import CategoryContext from '../context/CategoryContext'
import DbContext from '../context/DbContext'
import ExpenseContext from '../context/ExpenseContext'
import { Expense } from '../entities/Expense'
import AddExpenseScreen from '../screens/AddExpenseScreen'
import ExpensesScreen from '../screens/ExpensesScreen'

export default function ExpenseNavigator() {
    const Stack = createStackNavigator()
    const [expenses, setExpenses] = useState<Expense[]>([])
    const { dbConnection, setUpConnection } = useContext(DbContext)
    const { accounts, getAccounts } = useContext(AccountContext)
    const { categories, getCategories } = useContext(CategoryContext)

    const updateExpenses = async () => {
        const accountRepository = await getRepository(Expense, DB_CONNECTION_NAME)
        setExpenses(await accountRepository.find({ take: 100 }))
    }

    useEffect(() => {
        if (dbConnection) {
            updateExpenses()
        } else {
            console.log('No db connection on expense navigator')
        }
    }, [])

    return (
        <ExpenseContext.Provider value={{ expenses, updateExpenses }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Expenses" component={ExpensesScreen} />
                <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
            </Stack.Navigator>
        </ExpenseContext.Provider>
    )
}

const styles = StyleSheet.create({})
