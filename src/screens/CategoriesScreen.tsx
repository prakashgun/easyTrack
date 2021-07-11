import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import HeaderBar from '../components/HeaderBar'
import CategoryContext from '../context/CategoryContext'
import DbContext from '../context/DbContext'
import { Category } from '../entities/Category'

interface Props {
}

const CategoriesScreen: React.FC<Props> = () => {
    const navigation = useNavigation()
    const { categories, updateCategories } = useContext(CategoryContext)
    const { dbConnection, setUpConnection } = useContext(DbContext)
    const [balance, setBalance] = useState<Number>(0)

    const deleteCategory = async (category: Category) => {
        console.log('Category to be deleted', category)
        const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)
        await categoryRepository.remove(category)
        console.log('Category deleted')
        await updateCategories()
    }

    const onDeletePress = (category: Category) => {
        Alert.alert(
            'Delete category ?',
            'Delete category name ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteCategory(category)
                }
            ]
        )
    }

    const onAddItemPress = () => {
        navigation.navigate('AddCategory')
    }

    return (
        <View style={styles.container}>
            <HeaderBar title="Categories" />
            <ScrollView>
                {
                    categories.map((category, i) => (
                        <ListItem.Swipeable
                            key={i}
                            bottomDivider
                            rightContent={
                                <Button
                                    title="Delete"
                                    icon={{ name: 'delete', color: 'white' }}
                                    buttonStyle={styles.deleteButton}
                                    onPress={() => onDeletePress(category)} />
                            }
                        >
                            <Icon name={category.icon_name} type={category.icon_type} />
                            <ListItem.Content>
                                <ListItem.Title>{category.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem.Swipeable>
                    ))
                }
            </ScrollView>
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
    container: {
        flex: 1
    },
    deleteButton: {
        minHeight: '100%',
        backgroundColor: 'red'
    }
})

export default CategoriesScreen