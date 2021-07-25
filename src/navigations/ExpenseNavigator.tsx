import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import AddExpenseScreen from '../screens/expenses/AddExpenseScreen'
import ExpensesScreen from '../screens/expenses/ExpensesScreen'

export default function ExpenseNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Expenses" component={ExpensesScreen} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
