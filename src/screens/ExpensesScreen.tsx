import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import HeaderBar from '../components/HeaderBar'
import DbContext from '../context/DbContext'
import ExpenseContext from '../context/ExpenseContext'
import { Expense } from '../entities/Expense'

interface Props {
}

const ExpensesScreen: React.FC<Props> = () => {
    const navigation = useNavigation()
    const { dbConnection, setUpConnection } = useContext(DbContext)
    const [balance, setBalance] = useState<Number>(0)
    const { expenses, updateExpenses } = useContext(ExpenseContext)

    useEffect(() => {
        if (dbConnection) {
            updateBalance()
        } else {
            console.log('No db connection on expense screen')
        }
    }, [expenses])

    const deleteExpense = async (expense: Expense) => {
        console.log('Expense to be deleted', expense)
        const expenseRepository = await getRepository(Expense, DB_CONNECTION_NAME)
        await expenseRepository.remove(expense)
        console.log('Expense deleted')
        await updateExpenses()
        await updateBalance()
    }

    const updateBalance = async () => {
        console.log('Finding expense total')
        const { sum } = await getRepository(Expense, DB_CONNECTION_NAME)
            .createQueryBuilder('expenses')
            .select('sum(expenses.value)', 'sum')
            .getRawOne()

        setBalance(sum)
    }

    const onDeletePress = (expense: Expense) => {
        Alert.alert(
            'Delete expense ?',
            'Delete expense name ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteExpense(expense)
                }
            ]
        )
    }

    const onAddItemPress = () => {
        navigation.navigate('AddExpense')
    }

    return (
        <ExpenseContext.Provider value={{ expenses }}>
            <View style={styles.container}>
                <HeaderBar title="Expenses" />
                {
                    expenses.map((expense, i) => (
                        <ListItem.Swipeable
                            key={i}
                            bottomDivider
                            rightContent={
                                <Button
                                    title="Delete"
                                    icon={{ name: 'delete', color: 'white' }}
                                    buttonStyle={styles.deleteButton}
                                    onPress={() => onDeletePress(expense)} />
                            }
                        >
                            <Icon name="fastfood" />
                            <ListItem.Content>
                                <ListItem.Title>{expense.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content right={true}>
                                <ListItem.Title>{expense.value}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem.Swipeable>
                    ))
                }
                <ListItem>
                    <Icon name="account-balance-wallet" type="material-icons" />
                    <ListItem.Content>
                        <ListItem.Title>Balance</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right={true}>
                        <Text>{balance}</Text>
                    </ListItem.Content>
                </ListItem>
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
        </ExpenseContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deleteButton: {
        minHeight: '100%',
        backgroundColor: 'red'
    }
})

export default ExpensesScreen