import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { editVragenlijst } from '../../../../../actions';

import classes from '../MeerkeuzeForm/MeerkeuzeForm.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const SchaalForm = (props) => {
	const [vraag, setVraag] = useState('');
	const [vraagIsValid, setVraagIsValid] = useState(true);

	const vraagInputRef = useRef();

	const vraagChangeHandler = (event) => {
		setVraag(event.target.value);
		if (event.target.value === '') {
			setVraagIsValid(false);
		} else {
			setVraagIsValid(true);
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const nieuweVraag = {
			id:
				Math.random() * (999999 - 0.00000000000001) +
				0.00000000000001 +
				new Date().getTime(),
			type: 2,
			vraag: vraag,
			opties: 'Helemaal oneens, Oneens, Neutraal, Eens, Helemaal eens',
		};
		props.editVragenlijst(nieuweVraag);
		setVraag('');
		console.log(props.vragen_lijst);
	};

	return (
		<form onSubmit={submitHandler}>
			<Input
				id="schaalvraag-vraag"
				label="Vraag"
				type="text"
				placeholder="Type hier een schaal vraag....."
				isValid={vraagIsValid}
				onChange={vraagChangeHandler}
				useRef={vraagInputRef}
				value={vraag}
			/>
			{vraag !== '' && (
				<Button type="submit" className={classes.btn}>
					Vraag toevoegen
				</Button>
			)}
		</form>
	);
};

const mapStateToProps = (state) => {
	return { vragen_lijst: state.Vragenlijst };
};

export default connect(mapStateToProps, { editVragenlijst: editVragenlijst })(
	SchaalForm
);
