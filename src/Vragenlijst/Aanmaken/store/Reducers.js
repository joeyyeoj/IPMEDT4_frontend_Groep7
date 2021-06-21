import { EDIT_VRAGENLIJST } from './actions';

export const Vragenlijst = (state = [], action) => {
	switch (action.type) {
		case EDIT_VRAGENLIJST:
			return action.payload;
		default:
			return state;
	}
};
