import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import AccountsScreen from '../screens/accounts/AccountsScreen'
import AddAccountScreen from '../screens/accounts/AddAccountScreen'

export default function AccountNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Accounts" component={AccountsScreen} />
            <Stack.Screen name="AddAccount" component={AddAccountScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
