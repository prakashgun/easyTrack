export default (state, action) => {
    switch (action.type) {
        case 'CREATE_DEFAULT_CATEGORIES':
            return [...state, action.payload]
        case 'GET_EXISTING_CATEGORIES':
            return action.payload
        case 'CATEGORY_CREATED':
            return [...state, action.payload]
        case 'CATEGORY_DELETED':
            return state.filter(category => category != action.payload)
        default:
            console.log(action)
            throw new Error('Invalid action type in Categories reducer')
    }
}