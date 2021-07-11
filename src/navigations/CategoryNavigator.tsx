import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { getRepository } from 'typeorm/browser'
import { DB_CONNECTION_NAME } from '../common/Utils'
import DbContext from '../context/DbContext'
import CategoryContext from '../context/CategoryContext'
import { Category } from '../entities/Category'
import AddCategoryScreen from '../screens/AddCategoryScreen'
import CategoriesScreen from '../screens/CategoriesScreen'
import { useCallback } from 'react'

export default function CategoryNavigator() {
    const Stack = createStackNavigator()
    const [categories, setCategories] = useState<Category[]>([])
    const { dbConnection, setUpConnection } = useContext(DbContext)

    const updateCategories = async () => {
        const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)
        setCategories(await categoryRepository.find({ take: 100 }))
    }


    const createDefaultCategories = useCallback(async () => {

        const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)

        const categoriesCount = await categoryRepository.count()

        if (categoriesCount === 0) {
            const defaultCategories = [
                {
                    name: 'Food',
                    icon_name: 'fastfood',
                    icon_type: 'material-icons'
                },
                {
                    name: 'Clothing',
                    icon_name: 'tshirt',
                    icon_type: 'font-awesome-5'
                },
                {
                    name: 'Transportation',
                    icon_name: 'car',
                    icon_type: 'font-awesome'
                },
                {
                    name: 'Education',
                    icon_name: 'graduation-cap',
                    icon_type: 'font-awesome'
                },
                {
                    name: 'Entertainment',
                    icon_name: 'movie',
                    icon_type: 'material-icons'
                },
                {
                    name: 'Social',
                    icon_name: 'group',
                    icon_type: 'font-awesome'
                },
                {
                    name: 'Investment',
                    icon_name: 'bar-graph',
                    icon_type: 'entypo'
                },
                {
                    name: 'Health',
                    icon_name: 'fitness-center',
                    icon_type: 'material-icons'
                },
                {
                    name: 'Medical',
                    icon_name: 'medical-services',
                    icon_type: 'material-icons'
                },
                {
                    name: 'Others',
                    icon_name: 'miscellaneous-services',
                    icon_type: 'material-icons'
                }
            ]

            await categoryRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values(defaultCategories)
            .execute()

            console.log('Default categories saved')
        }
    }, [])

    useEffect(() => {
        if (dbConnection) {
            createDefaultCategories()
            updateCategories()
            console.log('categories:')
            console.log(categories)
        } else {
            console.log('No db connection on category navigator')
        }
    }, [])

    return (
        <CategoryContext.Provider value={{ categories, updateCategories }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Categories" component={CategoriesScreen} />
                <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
            </Stack.Navigator>
        </CategoryContext.Provider>
    )
}

const styles = StyleSheet.create({})
