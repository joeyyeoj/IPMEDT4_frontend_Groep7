export const CHANGE_ANSWER = "CHANGE_ANSWER";
export const ADD_ANSWER = "ANSWER_TO_ADD";

export const changeAnswer = answer => ({
    type: CHANGE_ANSWER,
    payload: answer
});

export const addAnswer = answer => ({
    type: ADD_ANSWER,
    payload: answer
});