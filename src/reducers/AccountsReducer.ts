export default (state,action) => {
    switch(action.type){
        case 'CREATE_DEFAULT_ACCOUNTS':
            return [...state, action.payload]
        case 'GET_EXISTING_ACCOUNTS':
            return action.payload
        case 'ACCOUNT_CREATED':
            return [...state, action.payload]
        default:
            throw new Error('Invalid action type in Accounts reducer')
    }
}