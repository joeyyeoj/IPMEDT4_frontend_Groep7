import { useState } from 'react';
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

const AanmakenForm = (props) => {
	const [vraagsoort, setVraagSoort] = useState('meerkeuze');

	const filterchangeHandler = (selectedVraagSoort) => {
		setVraagSoort(selectedVraagSoort);
	};

	const vragenlijstOpslaan = () => {
		const vragenlijst = props.vragen_lijst;
	};

	return (
		<Card className={classes.card}>
			<h2 className={classes.titel}>Vragen Toevoegen</h2>
			<SoortVraagFilter selected={vraagsoort} onChangeFilter={filterchangeHandler} />
			{vraagsoort === 'open' && <OpenForm />}
			{vraagsoort === 'meerkeuze' && <MeerkeuzeForm />}
			{vraagsoort === 'schaal' && <SchaalForm />}
			<Button onClick={vragenlijstOpslaan} className={classes.btn}>
				Vragenlijst opslaan
			</Button>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return { vragen_lijst: state.Vragenlijst };
};

export default connect(mapStateToProps, { editVragenlijst: editVragenlijst })(
	AanmakenForm
);
