import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { editVragenlijst } from '../../../../../actions';

import classes from '../MeerkeuzeForm/MeerkeuzeForm.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const MeerkeuzeForm = (props) => {
	const [vraag, setVraag] = useState('');
	const [optie1, setOptie1] = useState('');
	const [optie2, setOptie2] = useState('');
	const [optie3, setOptie3] = useState('');
	const [optie4, setOptie4] = useState('');
	const [vraagIsValid, setVraagIsValid] = useState(true);
	const [optie1IsValid, setOptie1IsValid] = useState(true);
	const [optie2IsValid, setOptie2IsValid] = useState(true);
	const [optie3IsValid, setOptie3IsValid] = useState(true);
	const [optie4IsValid, setOptie4IsValid] = useState(true);

	const vraagInputRef = useRef();
	const optie1InputRef = useRef();
	const optie2InputRef = useRef();
	const optie3InputRef = useRef();
	const optie4InputRef = useRef();

	const vraagChangeHandler = (event) => {
		setVraag(event.target.value);
		if (event.target.value === '') {
			setVraagIsValid(false);
		} else {
			setVraagIsValid(true);
		}
	};
	const optie1ChangeHandler = (event) => {
		setOptie1(event.target.value);
		if (event.target.value === '') {
			setOptie1IsValid(false);
		} else {
			setOptie1IsValid(true);
		}
	};
	const optie2ChangeHandler = (event) => {
		setOptie2(event.target.value);
		if (event.target.value === '') {
			setOptie2IsValid(false);
		} else {
			setOptie2IsValid(true);
		}
	};
	const optie3ChangeHandler = (event) => {
		setOptie3(event.target.value);
		if (event.target.value === '') {
			setOptie3IsValid(false);
		} else {
			setOptie3IsValid(true);
		}
	};
	const optie4ChangeHandler = (event) => {
		setOptie4(event.target.value);
		if (event.target.value === '') {
			setOptie4IsValid(false);
		} else {
			setOptie4IsValid(true);
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const oudeVragenlijst = props.vragen_lijst;
		let TEMP_vragenlijst = oudeVragenlijst;
		const nieuweVraag = {
			type: 'meerkeuze',
			vraag: vraag,
			optie1: optie1,
			optie2: optie2,
			optie3: optie3,
			optie4: optie4,
		};
		TEMP_vragenlijst.push(nieuweVraag);
		props.editVragenlijst(TEMP_vragenlijst);
		console.log(props.vragen_lijst);
	};

	return (
		<form onSubmit={submitHandler}>
			<Input
				id="openvraag-vraag"
				label="Vraag"
				type="text"
				placeholder="Type hier een meerkeuze vraag....."
				isValid={vraagIsValid}
				onChange={vraagChangeHandler}
				useRef={vraagInputRef}
			/>
			{vraag !== '' && (
				<Input
					id="openvraag-optie1"
					label="Optie 1"
					type="text"
					placeholder="Type hier de eerste optie....."
					isValid={optie1IsValid}
					onChange={optie1ChangeHandler}
					useRef={optie1InputRef}
				/>
			)}
			{optie1 !== '' && (
				<Input
					id="openvraag-optie2"
					label="Optie 2"
					type="text"
					placeholder="Type hier de tweede optie....."
					isValid={optie2IsValid}
					onChange={optie2ChangeHandler}
					useRef={optie2InputRef}
				/>
			)}
			{optie2 !== '' && (
				<Input
					id="openvraag-optie3"
					label="Optie 3"
					type="text"
					placeholder="Type hier de derde optie....."
					isValid={optie3IsValid}
					onChange={optie3ChangeHandler}
					useRef={optie3InputRef}
				/>
			)}
			{optie3 !== '' && (
				<Input
					id="openvraag-optie4"
					label="Optie 4"
					type="text"
					placeholder="Type hier de vierde optie....."
					isValid={optie4IsValid}
					onChange={optie4ChangeHandler}
					useRef={optie4InputRef}
				/>
			)}
			{optie4 !== '' && (
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
	MeerkeuzeForm
);
