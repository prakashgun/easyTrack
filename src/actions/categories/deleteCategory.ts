import { getRepository } from "typeorm/browser"
import { DB_CONNECTION_NAME } from "../../common/Utils"
import { Category } from "../../entities/Category"

export default async (dispatch, category) => {

    const categoryRepository = await getRepository(Category, DB_CONNECTION_NAME)
    await categoryRepository.remove(category)
    console.log('Category deleted')
    dispatch({ type: 'CATEGORY_DELETED', payload: category })
}