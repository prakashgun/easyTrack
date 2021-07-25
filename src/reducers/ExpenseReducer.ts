export default (state, action) => {
    switch (action.type) {
        case 'GET_ALL_EXPENSES':
            return action.payload
        case 'EXPENSE_CREATED':
            return [...state, action.payload]
        case 'EXPENSE_DELETED':
            return state.filter(expense => expense != action.payload)
        default:
            console.log(action)
            throw new Error('Invalid action type in Expense reducer')
    }
}