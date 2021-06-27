import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements'
import HeaderBar from '../components/HeaderBar'

export default function AddExpenseScreen() {
    return (
        <View>
            <HeaderBar title="Add Expense" />
            <Input
                placeholder="Amount"
                keyboardType="numeric"
                leftIcon={{ type: 'font-awesome', name: 'money' }}
                style={styles}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
