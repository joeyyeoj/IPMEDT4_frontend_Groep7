import * as Redux from "redux";
import {User, CSRFToken} from "./reducers";
import {combineReducers} from "redux";

export const store = Redux.createStore(
    combineReducers({
        CSRFToken,
        User,
    })
)
