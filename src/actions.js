export const CHANGE_USER = 'CHANGE_USER';
export const GET_CSRFTOKEN = 'GET_CSRFTOKEN';
export const LOGIN_USER = 'LOGIN_USER';
export const EDIT_VRAGENLIJST = 'EDIT_VRAGENLIJST';
export const CLEAR_VRAGENLIJST = 'CLEAR_VRAGENLIJST';
export const REMOVE_ITEM_FROM_VRAGENLIJST = 'REMOVE_ITEM_FROM_VRAGENLIJST';

export const getCSRFToken = (token) => ({
	type: GET_CSRFTOKEN,
	payload: token,
});

export const changeUser = (user) => ({
	type: CHANGE_USER,
	payload: user,
});

export const loginUser = (status) => ({
	type: LOGIN_USER,
	payload: status,
});

export const editVragenlijst = (vragenlijst) => ({
	type: EDIT_VRAGENLIJST,
	payload: vragenlijst,
});

export const clearVragenlijst = () => ({
	type: CLEAR_VRAGENLIJST,
	payload: [],
});

export const removeItemFromVragenlijst = (id) => ({
	type: REMOVE_ITEM_FROM_VRAGENLIJST,
	payload: id,
});
