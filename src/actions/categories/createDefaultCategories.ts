import { getRepository } from "typeorm/browser"
import { DB_CONNECTION_NAME } from "../../common/Utils"
import { Category } from "../../entities/Category"

export default async (dispatch) => {

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
        const categories = await categoryRepository.find({ take: 10000 })
        dispatch({ type: 'CREATED_DEFAULT_CATEGORIES', payload: categories })

    } else {
        const categories = await categoryRepository.find({ take: 10000 })
        dispatch({ type: 'GET_EXISTING_CATEGORIES', payload: categories })
    }
}