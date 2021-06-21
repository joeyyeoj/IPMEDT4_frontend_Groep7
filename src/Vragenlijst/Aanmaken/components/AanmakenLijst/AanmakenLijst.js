import { connect } from 'react-redux';
import classes from './AanmakenLijst.module.css';
import { editVragenlijst } from '../../../../actions';

import Card from '../UI/Card/Card';

const AanmakenLijst = (props) => {
	return (
		<Card className={classes.card}>
			<h2 className={classes.titel}>Vragen</h2>
			<ul>
				{props.vragen_lijst.map((vraag) => (
					<li key={vraag.vraag}>
						<Card className={classes.cardInner}>
							<h3>{vraag.vraag}</h3>
							<p>{vraag.opties}</p>
							{/* {vraag.type === 3 && <p>{vraag.opties}</p>} */}
						</Card>
					</li>
				))}
			</ul>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		vragen_lijst: state.Vragenlijst,
	};
};

export default connect(mapStateToProps, { editVragenlijst: editVragenlijst })(
	AanmakenLijst
);
