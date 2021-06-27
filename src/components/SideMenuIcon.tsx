import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function SideMenuIcon() {

    const navigation = useNavigation()

    const onPress = () => {
        navigation.openDrawer()
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon name="menu" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10
    }
})
