import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { ListItem, Icon, Button } from 'react-native-elements'
import HeaderBar from '../components/HeaderBar'

export default function ExpensesScreen() {
    const navigation = useNavigation()

    const list = [
        {
            name: 'Burger',
            icon_type: 'fastfood',
            subtitle: 'Axis Bank',
            amount: 30
        },
        {
            name: 'Covid Test',
            icon_type: 'medical-services',
            subtitle: 'Cash',
            amount: 100.50
        }
    ]

    const onDeletePress = () => {
        console.log('Delete pressed')
    }

    const onAddItemPress = () => {
        navigation.navigate('AddExpense')
    }

    return (
        <View>
            <HeaderBar title="Expenses" />
            {
                list.map((l, i) => (
                    <ListItem.Swipeable
                        key={i}
                        bottomDivider
                        rightContent={
                            <Button
                                title="Delete"
                                icon={{ name: 'delete', color: 'white' }}
                                buttonStyle={styles.deleteButton}
                                onPress={onDeletePress} />
                        }
                    >
                        <Icon name={l.icon_type} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content right={true}>
                            <ListItem.Title>{l.amount}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem.Swipeable>
                ))
            }
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

const styles = StyleSheet.create({
    deleteButton: {
        minHeight: '100%',
        backgroundColor: 'red'
    }
})
