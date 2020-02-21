import { Reducer } from "../Containers/Student/Reducer"
import { combineReducers } from "redux";
const rootReducer = combineReducers(Object.assign({
    Reducer
}));

export default (state, action) =>
     rootReducer(state, action);