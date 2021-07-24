import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input, ListItem } from 'react-native-elements'
import { getRepository } from 'typeorm/browser'
import createCategory from '../../actions/categories/createCategory'
import { DB_CONNECTION_NAME } from '../../common/Utils'
import HeaderBar from '../../components/HeaderBar'
import CategoryContext from '../../context/CategoryContext'
import { Category } from '../../entities/Category'
import CategoryReducer from '../../reducers/CategoryReducer'

interface Props {
}

const AddCategoryScreen: React.FC<Props> = () => {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState({
        icon_name: 'category',
        icon_type: 'material-icons'
    })
    const [nameError, setNameError] = useState('')
    const [iconError, setIconError] = useState('')
    const navigation = useNavigation()
    const { categories, categoriesDispatch } = useContext(CategoryContext)
    const [expanded, setExpanded] = useState(false)

    const icons = [
        { icon_name: 'customerservice', icon_type: 'ant-design' },
        { icon_name: 'creditcard', icon_type: 'ant-design' },
        { icon_name: 'codesquareo', icon_type: 'ant-design' },
        { icon_name: 'book', icon_type: 'ant-design' },
        { icon_name: 'barschart', icon_type: 'ant-design' },
        { icon_name: 'bars', icon_type: 'ant-design' },
        { icon_name: 'clockcircle', icon_type: 'ant-design' },
        { icon_name: 'mail', icon_type: 'ant-design' },
        { icon_name: 'link', icon_type: 'ant-design' },
        { icon_name: 'home', icon_type: 'ant-design' },
        { icon_name: 'laptop', icon_type: 'ant-design' },
        { icon_name: 'star', icon_type: 'ant-design' },
        { icon_name: 'filter', icon_type: 'ant-design' },
        { icon_name: 'shoppingcart', icon_type: 'ant-design' },
        { icon_name: 'save', icon_type: 'ant-design' },
        { icon_name: 'user', icon_type: 'ant-design' },
        { icon_name: 'videocamera', icon_type: 'ant-design' },
        { icon_name: 'team', icon_type: 'ant-design' },
        { icon_name: 'sharealt', icon_type: 'ant-design' },
        { icon_name: 'setting', icon_type: 'ant-design' },
        { icon_name: 'picture', icon_type: 'ant-design' },
        { icon_name: 'tags', icon_type: 'ant-design' },
        { icon_name: 'cloud', icon_type: 'ant-design' },
        { icon_name: 'delete', icon_type: 'ant-design' },
        { icon_name: 'heart', icon_type: 'ant-design' },
        { icon_name: 'calculator', icon_type: 'ant-design' },

        { icon_name: 'archive', icon_type: 'entypo' },
        { icon_name: 'awareness-ribbon', icon_type: 'entypo' },
        { icon_name: 'baidu', icon_type: 'entypo' },
        { icon_name: 'basecamp', icon_type: 'entypo' },
        { icon_name: 'battery', icon_type: 'entypo' },
        { icon_name: 'bell', icon_type: 'entypo' },
        { icon_name: 'blackboard', icon_type: 'entypo' },
        { icon_name: 'block', icon_type: 'entypo' },
        { icon_name: 'book', icon_type: 'entypo' },
        { icon_name: 'bookmark', icon_type: 'entypo' },
        { icon_name: 'bowl', icon_type: 'entypo' },
        { icon_name: 'box', icon_type: 'entypo' },
        { icon_name: 'briefcase', icon_type: 'entypo' },
        { icon_name: 'brush', icon_type: 'entypo' },
        { icon_name: 'bucket', icon_type: 'entypo' },
        { icon_name: 'clapperboard', icon_type: 'entypo' },
        { icon_name: 'clipboard', icon_type: 'entypo' },
        { icon_name: 'colours', icon_type: 'entypo' },
    ]

    const onIconPress = (icon) => {
        console.log('icon pressed: ', icon)
        setIcon(icon)
    }


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
        category.icon_name = icon.icon_name
        category.icon_type = icon.icon_type
        await createCategory(categoriesDispatch, category)

        navigation.navigate('Categories')
    }

    return (
        <View>
            <HeaderBar title="Add Category" />
            <Input
                placeholder="Category Name"
                leftIcon={{ type: icon.icon_type, name: icon.icon_name }}
                style={styles}
                onChangeText={setName}
                defaultValue={name}
            />
            {!!nameError && <Text style={{ color: 'red' }}>{nameError}</Text>}
            <ListItem.Accordion
                content={
                    <>
                        <Icon type="font-awesome" name="fonticons" />
                        <ListItem.Content>
                            <ListItem.Title> Choose Icon</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                bottomDivider
            >
                <ScrollView>
                    {icons.map((icon, i) => (
                        <ListItem key={i} onPress={() => onIconPress(icon)} bottomDivider>
                            <Icon name={icon.icon_name} type={icon.icon_type} />
                            <ListItem.Content>
                                <ListItem.Title>{icon.icon_name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </ListItem.Accordion>
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