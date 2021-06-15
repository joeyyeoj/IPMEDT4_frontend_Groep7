import {CHANGE_ANSWER, ADD_ANSWER} from './actions';

export const changedAnswer = (state = '', action) => {
    switch(action.type) {
        case CHANGE_ANSWER:
            return action.poayload;
        default:
            return state;
    }
};

export const answerToAdd = (state = '', action) => {
    switch(action.type) {
        case ADD_ANSWER:
            return action.payload;
        default:
            return state;
    }
}