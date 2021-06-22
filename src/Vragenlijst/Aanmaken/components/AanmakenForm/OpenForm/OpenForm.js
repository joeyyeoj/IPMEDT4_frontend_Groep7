import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { editVragenlijst } from '../../../../../actions';

import classes from '../MeerkeuzeForm/MeerkeuzeForm.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const OpenForm = (props) => {
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
			type: 1,
			vraag: vraag,
			opties: 'Dit is een open vraag',
		};
		props.editVragenlijst(nieuweVraag);
		setVraag('');
		console.log(props.vragen_lijst);
	};

	return (
		<form onSubmit={submitHandler}>
			<Input
				id="openvraag-vraag"
				label="Vraag"
				type="text"
				placeholder="Type hier een open vraag....."
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
	OpenForm
);
