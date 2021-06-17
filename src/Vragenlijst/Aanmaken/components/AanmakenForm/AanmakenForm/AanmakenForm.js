import { useState } from 'react';

import classes from './AanmakenForm.module.css';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import SoortVraagFilter from '../SoortVraagFilter/SoortVraagFilter';

const AanmakenForm = () => {
	const [vraagsoort, setVraagSoort] = useState('meerkeuze');

	const filterchangeHandler = (selectedVraagSoort) => {
		setVraagSoort(selectedVraagSoort);
	};

	return (
		<Card className={classes.card}>
			<h2 className={classes.titel}>Vragen Toevoegen</h2>
			<SoortVraagFilter selected={vraagsoort} onChangeFilter={filterchangeHandler} />
			{vraagsoort === 'open' && <p>Openvraag</p>}
			{vraagsoort === 'meerkeuze' && <p>Meerkeuzevraag</p>}
			{vraagsoort === 'schaal' && <p>Schaalvraag</p>}
			<Button className={classes.btn}>Vraag toevoegen</Button>
		</Card>
	);
};

export default AanmakenForm;
