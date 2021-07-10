import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import HeaderBar from '../components/HeaderBar'
import CategoryContext from '../context/CategoryContext'
import { Category } from '../entities/Category'

interface Props {
}

const AddCategoryScreen: React.FC<Props> = () => {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState(null)
    const [nameError, setNameError] = useState('')
    const [iconError, setIconError] = useState('')
    const navigation = useNavigation()
    const { categories, updateCategories } = useContext(CategoryContext)

    const onAddItemPress = async () => {
        const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)

        if (name.length < 2) {
            setNameError('Name should be atleast two characters')
            return
        }

        if (!icon) {
            setIconError('Icon cannot be empty')
            return
        }

        const categoriesCount = await categoryRepository.count({ where: { name: name } })

        if (categoriesCount > 0) {
            setNameError('Name already exists')
            return
        }

        const category = new Category()
        category.name = name
        category.icon = icon
        await categoryRepository.save(category)
        console.log('Category saved')
        await updateCategories()

        navigation.navigate('Categories')
    }

    return (
        <View>
            <HeaderBar title="Add Category" />
            <Input
                placeholder="Category Name"
                leftIcon={{ type: 'font-awesome', name: 'bank' }}
                style={styles}
                onChangeText={setName}
                defaultValue={name}
            />
            {!!nameError && <Text style={{ color: 'red' }}>{nameError}</Text>}
            <Input
                placeholder="Icon"
                leftIcon={{ type: 'material-icons', name: 'category-icon-wallet' }}
                style={styles}
                keyboardType="numeric"
                onChangeText={setIcon}
            />
            {!!iconError && <Text style={{ color: 'red' }}>{iconError}</Text>}
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

export default AddCategoryScreen