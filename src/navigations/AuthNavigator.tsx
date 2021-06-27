import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'


export default function AuthNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})