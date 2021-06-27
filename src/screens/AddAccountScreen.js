import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import HeaderBar from '../components/HeaderBar'

export default function AddAccountScreen() {

    const onAddItemPress = () => {
        navigation.navigate('AddAccount')
    }

    return (
        <View>
            <HeaderBar title="Add Account" />
            <Input
                placeholder="Account Name"
                leftIcon={{ type: 'font-awesome', name: 'bank' }}
                style={styles}
            />
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
