import {
	CHANGE_USER,
	LOGIN_USER,
	GET_CSRFTOKEN,
	EDIT_VRAGENLIJST,
	CLEAR_VRAGENLIJST,
} from './actions';

export const CSRFToken = (state = '', action) => {
	switch (action.type) {
		case GET_CSRFTOKEN:
			return action.payload;
		default:
			return state;
	}
};

export const User = (state = Object, action) => {
	switch (action.type) {
		case CHANGE_USER:
			return action.payload;
		default:
			return state;
	}
};

export const logged_in = (state = Boolean, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return action.payload;
		default:
			return state;
	}
};

export const Vragenlijst = (state = { vragenlijst: [] }, action) => {
	switch (action.type) {
		case EDIT_VRAGENLIJST:
			return {
				...state,
				vragenlijst: [...state.vragenlijst, action.payload],
			};
		case CLEAR_VRAGENLIJST:
			return {
				vragenlijst: [],
			};
		default:
			return state;
	}
};
