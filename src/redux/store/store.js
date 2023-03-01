import {createStore,combineReducers} from "redux";
import personReducer from "../reducers/personReducer";
import categoryReducer from "../reducers/categoryReducer"
const rootReducer=combineReducers({
    personState:personReducer,
    categoryState:categoryReducer
    
})
const store=createStore(rootReducer)
    export default store
