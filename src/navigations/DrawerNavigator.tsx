import React from 'react'
import { StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ExpenseNavigator from './ExpenseNavigator'
import AccountNavigator from './AccountNavigator'
import CategoryNavigator from './CategoryNavigator'


export default function DrawerNavigator() {
    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Accounts" component={AccountNavigator}></Drawer.Screen>
            <Drawer.Screen name="Expenses" component={ExpenseNavigator}></Drawer.Screen>
            <Drawer.Screen name="Categories" component={CategoryNavigator}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})