import React, {FC} from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from 'react-native-elements'
import SideMenuIcon from './SideMenuIcon'

interface Props
{
    title: string
}


const HeaderBar:FC<Props> = ({title}) => {
    return (
        <View>
            <Header
                leftComponent={<SideMenuIcon />}
                centerComponent={{ text: title }}
                rightComponent={{ icon: 'home' }}
            />
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({})
