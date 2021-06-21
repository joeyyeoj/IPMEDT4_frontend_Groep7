import Redux from 'redux';
import { combineReducers } from 'redux';
import { Vragenlijst } from './reducers';

export const store = Redux.createStore(
	combineReducers({
		Vragenlijst,
	})
);
