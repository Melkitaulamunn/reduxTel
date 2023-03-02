import actionTypes from "../actions/actionTypes";

const initialState = {
    pending: false,
    success: false,
    fail: false,
    error: "",
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.categoryActions.GET_CATEGORY_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.categoryActions.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                categories: action.payload
            }
        case actionTypes.categoryActions.GET_CATEGORY_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            }

        case actionTypes.categoryActions.ADD_CATEGORY_START:
            return {
                ...state,
                pending: true,
            }

        case actionTypes.categoryActions.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case actionTypes.categoryActions.ADD_CATEGORY_FAIL:
            return {
                ...state,
                fail: true,
                error: action.payload
            }

        case actionTypes.categoryActions.DELETE_CATEGORY_START:
            return {
                ...state,
                pending: true,
            }

        case actionTypes.categoryActions.DELETE_CATEGORY_SUCCESS:
            var filteredCategory = state.categories.filter(category => category.id !== action.payload)
            return {
                ...state,
                categories: filteredCategory,

            }
        default:
            return state;
    }
}

export default categoryReducer