import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import AddCategoryScreen from '../screens/AddCategoryScreen'
import CategoriesScreen from '../screens/CategoriesScreen'

export default function CategoryNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})