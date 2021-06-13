import * as Redux from "redux";
import {User, CSRFToken, logged_in} from "./reducers";
import {combineReducers} from "redux";

export const store = Redux.createStore(
    combineReducers({
        CSRFToken,
        User,
        logged_in,
    })
)
