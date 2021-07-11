import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import AccountContext from '../context/AccountContext'
import CategoryContext from '../context/CategoryContext'
import DbContext from '../context/DbContext'
import ExpenseContext from '../context/ExpenseContext'
import { Account } from '../entities/Account'
import { Category } from '../entities/Category'
import { Expense } from '../entities/Expense'
import AddExpenseScreen from '../screens/AddExpenseScreen'
import ExpensesScreen from '../screens/ExpensesScreen'

export default function ExpenseNavigator() {
    const Stack = createStackNavigator()
    const [expenses, setExpenses] = useState<Expense[]>([])
    const { dbConnection, setUpConnection } = useContext(DbContext)
    const [accounts, setAccounts] = useState<Account[]>()
    const [categories, setCategories] = useState<Category[]>()

    const updateExpenses = async () => {
        const accountRepository = await getRepository(Expense, DB_CONNECTION_NAME)
        setExpenses(await accountRepository.find({ take: 100 }))
    }

    const updateCategories = async () => {
        const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)
        setCategories(await categoryRepository.find({ take: 100 }))
    }

    const updateAccounts = async () => {
        const accountRepository = await getRepository(Account, DB_CONNECTION_NAME)
        setAccounts(await accountRepository.find({ take: 5 }))
    }

    useEffect(() => {
        if (dbConnection) {
            updateAccounts()
            updateCategories()
            updateExpenses()
        } else {
            console.log('No db connection on expense navigator')
        }
    }, [])

    return (
        <AccountContext.Provider value={{ accounts, updateAccounts }}>
            <CategoryContext.Provider value={{ categories, updateCategories }}>
                <ExpenseContext.Provider value={{ expenses, updateExpenses }}>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Expenses" component={ExpensesScreen} />
                        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
                    </Stack.Navigator>
                </ExpenseContext.Provider>
            </CategoryContext.Provider>
        </AccountContext.Provider>
    )
}

const styles = StyleSheet.create({})
