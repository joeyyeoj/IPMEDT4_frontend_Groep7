import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { editVragenlijst } from '../../../store/actions';
import axios from 'axios';

import classes from './AanmakenForm.module.css';

import Card from '../../UI/Card/Card';
import SoortVraagFilter from '../SoortVraagFilter/SoortVraagFilter';
import MeerkeuzeForm from '../MeerkeuzeForm/MeerkeuzeForm';
import OpenForm from '../OpenForm/OpenForm';
import SchaalForm from '../SchaalForm/SchaalForm';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const AanmakenForm = (props) => {
	const [vraagsoort, setVraagSoort] = useState('meerkeuze');
	const [vragenlijstNaam, setVragenlijstNaam] = useState('');
	const [vragenlijstNaamIsValid, setVragenlijstNaamIsValid] = useState(true);

	const vragenlijstNaamRef = useRef();

	const filterchangeHandler = (selectedVraagSoort) => {
		setVraagSoort(selectedVraagSoort);
	};

	const vragenlijstNaamChangeHandler = (event) => {
		setVragenlijstNaam(event.target.value);
		if (event.target.value === '') {
			setVragenlijstNaamIsValid(false);
		} else {
			setVragenlijstNaamIsValid(true);
		}
	};

	const vragenlijstOpslaan = () => {
		const VRAGENLIJST_URL = 'http://localhost:8000/api/vragenlijst/create';
		const vragenlijst = props.vragen_lijst;
		const DATA = {
			vragenlijst: vragenlijst,
			eigenaarId: props.User.userData.id,
			vragenlijstNaam: vragenlijstNaam,
		};
		axios
			.post(VRAGENLIJST_URL, DATA, {
				withCredentials: true,
				headers: {
					'Authorization': 'Bearer ' + props.User.token,
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': props.csrf_token,
				},
			})
			.then((res) => {
				console.log(res);
			});
	};

	return (
		<>
			<Card className={classes.card}>
				<h2 className={classes.titel}>Vragen Toevoegen</h2>
				<SoortVraagFilter
					selected={vraagsoort}
					onChangeFilter={filterchangeHandler}
				/>
				{vraagsoort === 'open' && <OpenForm />}
				{vraagsoort === 'meerkeuze' && <MeerkeuzeForm />}
				{vraagsoort === 'schaal' && <SchaalForm />}
			</Card>
			<Card className={classes.card}>
				<h2 className={classes.titel}>Lijst opslaan</h2>
				<Input
					id="vragenlijstNaam"
					label="Naam van de vragenlijst"
					type="text"
					placeholder="Type hier de naam van de enquête...."
					isValid={vragenlijstNaamIsValid}
					onChange={vragenlijstNaamChangeHandler}
					userRef={vragenlijstNaamRef}
				/>
				{vragenlijstNaam !== '' && (
					<Button onClick={vragenlijstOpslaan} className={classes.btn}>
						Vragenlijst opslaan
					</Button>
				)}
			</Card>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		vragen_lijst: state.Vragenlijst,
		logged_in: state.logged_in,
		User: state.User,
	};
};

export default connect(mapStateToProps, { editVragenlijst: editVragenlijst })(
	AanmakenForm
);
