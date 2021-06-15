import { combineReducers, createStore } from "redux";
import { changedAnswer, answerToAdd } from "./reducers";

export const store = createStore (
    combineReducers({
        changedAnswer,
        answerToAdd
    })
);