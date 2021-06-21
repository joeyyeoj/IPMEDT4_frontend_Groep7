import { connect } from 'react-redux';
import classes from './AanmakenLijst.module.css';

import Card from '../UI/Card/Card';

const AanmakenLijst = (props) => {
	return (
		<Card className={classes.card}>
			<h2 className={classes.titel}>Vragen</h2>
			<p>{props.vragen_lijst[0].vraag}</p>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		vragen_lijst: state.Vragenlijst,
	};
};

export default connect(mapStateToProps, {})(AanmakenLijst);
