import { combineReducers } from "redux";
import userReducer from './user'
import historyReducer from './history' 

export default combineReducers({
    userReducer, historyReducer
})