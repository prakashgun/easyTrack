import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import HeaderBar from '../components/HeaderBar'


export default function AccountsScreen() {
    const navigation = useNavigation()

    const list = [
        {
            name: 'Cash',
            icon_name: 'bank',
            icon_type: 'font-awesome',
            amount: 10000
        },
        {
            name: 'Axis Bank',
            icon_name: 'bank',
            icon_type: 'font-awesome',
            amount: 125000
        }
    ]

    const onDeletePress = () => {
        console.log('Delete pressed')
    }

    const onAddItemPress = () => {
        navigation.navigate('AddAccount')
    }

    return (
        <View>
            <HeaderBar title="Accounts" />
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
                        <Icon name={l.icon_name} type={l.icon_type} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content right={true}>
                            <ListItem.Title>{l.amount}</ListItem.Title>
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
                    <Text>1780000</Text>
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
    )
}

const styles = StyleSheet.create({
    deleteButton: {
        minHeight: '100%',
        backgroundColor: 'red'
    }
})
