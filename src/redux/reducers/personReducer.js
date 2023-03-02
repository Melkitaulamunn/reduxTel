import actionTypes from "../actions/actionTypes";

const initialState = {
    pending: false,
    success: false,
    people: [],
    fail: false,
    error: ""
};

const personReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.personActions.GET_PERSON_START:
            return {
                ...state,
                pending: true,
            };

        case actionTypes.personActions.GET_PERSON_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                error: "",
                people: action.payload
            }

        case actionTypes.personActions.GET_PERSON_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload,
            }

        case actionTypes.personActions.DELETE_PERSON_START:
            return {
                ...state,
                pending: true
            }

        case actionTypes.personActions.DELETE_PERSON_SUCCESS:
            var filteredPeople = state.people.filter(item => item.id !== action.payload)
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                error: "",
                people: filteredPeople
            }

        case actionTypes.personActions.DELETE_PERSON_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload,
            }

        case actionTypes.personActions.EDIT_PERSON_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.personActions.EDIT_PERSON_SUCCESS:
            var temp = [];
            for (let i = 0; i < state.people.length; i++) {
                if (state.people[i].id !== action.payload.id) {
                    temp.push(state.people[i])
                } else {
                    temp.push(action.payload)
                }
            }
            return {
                ...state,
                people: temp
            }
        case actionTypes.personActions.ADD_PERSON_START:
            return {
                ...state,
                pending: true
            }

        case actionTypes.personActions.ADD_PERSON_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                error: "",
                people: [...state.people, action.payload]
            }
        case actionTypes.personActions.ADD_PERSON_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default personReducer