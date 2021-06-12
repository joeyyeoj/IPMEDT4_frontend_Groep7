export const CHANGE_USER = "CHANGE_USER";
export const GET_CSRFTOKEN = "GET_CSRFTOKEN";
export const LOGIN_USER = "LOGIN_USER"

export const getCSRFToken = token => ({
    type: GET_CSRFTOKEN,
    payload: token
})

export const changeUser = user => ({
    type: CHANGE_USER,
    payload: user
})

export const loginUser = status => ({
    type: LOGIN_USER,
    payload: status
})
