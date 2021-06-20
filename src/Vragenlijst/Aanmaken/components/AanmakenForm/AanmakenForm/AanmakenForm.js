import { useState } from 'react';

import classes from './AanmakenForm.module.css';

import Card from '../../UI/Card/Card';
import SoortVraagFilter from '../SoortVraagFilter/SoortVraagFilter';
import MeerkeuzeForm from '../MeerkeuzeForm/MeerkeuzeForm';
import OpenForm from '../OpenForm/OpenForm';
import SchaalForm from '../SchaalForm/SchaalForm';

const AanmakenForm = () => {
	const [vraagsoort, setVraagSoort] = useState('meerkeuze');

	const filterchangeHandler = (selectedVraagSoort) => {
		setVraagSoort(selectedVraagSoort);
	};

	return (
		<Card className={classes.card}>
			<h2 className={classes.titel}>Vragen Toevoegen</h2>
			<SoortVraagFilter selected={vraagsoort} onChangeFilter={filterchangeHandler} />
			{vraagsoort === 'open' && <OpenForm />}
			{vraagsoort === 'meerkeuze' && <MeerkeuzeForm />}
			{vraagsoort === 'schaal' && <SchaalForm />}
		</Card>
	);
};

export default AanmakenForm;
