export const EDIT_VRAGENLIJST = 'EDIT_VRAGENLIJST';

export const editVragenlijst = (vragenlijst) => ({
	type: EDIT_VRAGENLIJST,
	payload: vragenlijst,
});
