import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input, ListItem } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import HeaderBar from '../components/HeaderBar'
import AccountContext from '../context/AccountContext'
import CategoryContext from '../context/CategoryContext'
import ExpenseContext from '../context/ExpenseContext'
import { Account } from '../entities/Account'
import { Category } from '../entities/Category'
import { Expense } from '../entities/Expense'

interface Props {
}

const AddExpenseScreen: React.FC<Props> = () => {
    const [name, setName] = useState('')
    const [value, setValue] = useState(null)
    const [nameError, setNameError] = useState('')
    const [valueError, setValueError] = useState('')
    const { categories, getCategories } = useContext(CategoryContext)
    const { accounts, getAccounts } = useContext(AccountContext)
    const navigation = useNavigation()
    const { expenses, updateExpenses } = useContext(ExpenseContext)
    const [categoryExpanded, setCategoryExpanded] = useState(false)
    const [accountExpanded, setAccountExpanded] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [selectedAccount, setSelectedAccount] = useState<Account>()

    const onCategoryIconPress = (category) => {
        console.log('category icon pressed: ', category)
        setSelectedCategory(category)
        setCategoryExpanded(!categoryExpanded)
    }

    const onAccountIconPress = (account) => {
        console.log('account icon pressed: ', account)
        setSelectedAccount(account)
        setAccountExpanded(!accountExpanded)
    }

    const onAddItemPress = async () => {
        const expenseRepository = await getRepository(Expense, DB_CONNECTION_NAME)

        if (name.length < 2) {
            setNameError('Name should be atleast two characters')
            return
        }

        if (!value) {
            setValueError('Value cannot be empty')
            return
        }

        const expensesCount = await expenseRepository.count({ where: { name: name } })

        if (expensesCount > 0) {
            setNameError('Name already exists')
            return
        }

        const expense = new Expense()
        expense.name = name
        expense.value = value
        await expenseRepository.save(expense)
        console.log('Expense saved')
        await updateExpenses()

        navigation.navigate('Expenses')
    }

    return (
        <View>
            <HeaderBar title="Add Expense" />
            <Input
                placeholder="Expense Name"
                leftIcon={{ type: 'entypo', name: 'price-tag' }}
                style={styles}
                onChangeText={setName}
                defaultValue={name}
            />
            {!!nameError && <Text style={{ color: 'red' }}>{nameError}</Text>}
            {categories && <ListItem.Accordion
                content={
                    <>
                        <Icon
                            type={selectedCategory ? selectedCategory.icon_type : categories[0].icon_type}
                            name={selectedCategory ? selectedCategory.icon_name : categories[0].icon_name}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{selectedCategory ? selectedCategory.name : categories[0].name}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={categoryExpanded}
                onPress={() => {
                    setCategoryExpanded(!categoryExpanded)
                }}
                bottomDivider
            >
                <ScrollView>
                    {categories && categories.map((category, i) => (
                        <ListItem key={i} onPress={() => onCategoryIconPress(category)} bottomDivider>
                            <Icon name={category.icon_name} type={category.icon_type} />
                            <ListItem.Content>
                                <ListItem.Title>{category.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </ListItem.Accordion>}

            {accounts && <ListItem.Accordion
                content={
                    <>
                        <Icon name="bank" type="font-awesome" />
                        <ListItem.Content>
                            <ListItem.Title>{selectedAccount ? selectedAccount.name : accounts[0].name}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={accountExpanded}
                onPress={() => {
                    setAccountExpanded(!accountExpanded)
                }}
                bottomDivider
            >
                <ScrollView>
                    {accounts && accounts.map((account, i) => (
                        <ListItem key={i} onPress={() => onAccountIconPress(account)} bottomDivider>
                            <Icon name="bank" type="font-awesome" />
                            <ListItem.Content>
                                <ListItem.Title>{account.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </ListItem.Accordion>}

            <Input
                placeholder="Value"
                leftIcon={{ type: 'font-awesome', name: 'money' }}
                style={styles}
                keyboardType="numeric"
                onChangeText={setValue}
            />
            {!!valueError && <Text style={{ color: 'red' }}>{valueError}</Text>}
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
    )
}

const styles = StyleSheet.create({})

export default AddExpenseScreen