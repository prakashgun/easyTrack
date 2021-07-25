import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import deleteExpenseAction from '../../actions/expenses/deleteExpenseAction'
import { DB_CONNECTION_NAME } from '../../common/Utils'
import HeaderBar from '../../components/HeaderBar'
import DbContext from '../../context/DbContext'
import ExpenseContext from '../../context/ExpenseContext'
import { Expense } from '../../entities/Expense'

interface Props {
}

const ExpensesScreen: React.FC<Props> = () => {
    const navigation = useNavigation()
    const { dbConnection, setUpConnection } = useContext(DbContext)
    const [balance, setBalance] = useState<Number>(0)
    const { expenses, expensesDispatch } = useContext(ExpenseContext)

    useEffect(() => {
        if (dbConnection) {
            updateBalance()
            console.log(expenses)
        } else {
            console.log('No db connection on expense screen')
        }
    }, [expenses])

    const removeExpense = async (expense: Expense) => {
        console.log('Expense to be deleted', expense)
        await deleteExpenseAction(expensesDispatch, expense)
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
                    onPress: () => removeExpense(expense)
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
                            <Icon name={expense.category.icon_name} type={expense.category.icon_type} />
                            <ListItem.Content>
                                <ListItem.Title>{expense.category.name}</ListItem.Title>
                                <ListItem.Subtitle>{expense.account.name}</ListItem.Subtitle>
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