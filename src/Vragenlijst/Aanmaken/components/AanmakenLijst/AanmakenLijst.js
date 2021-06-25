import { connect } from 'react-redux';
import styles from './AanmakenLijst.module.css';
import { editVragenlijst, removeItemFromVragenlijst } from '../../../../actions';

import Card from '../UI/Card/Card';
import InnerCard from '../UI/InnerCard/InnerCard';

const AanmakenLijst = (props) => {
	const removeItem = (id) => {
		props.removeItemFromVragenlijst(id);
	};

	return (
		<Card className={styles.card}>
			<h2 className={styles.titel}>Vragen</h2>
			<ul>
				{props.vragen_lijst.vragenlijst.map((vraag) => (
					<li key={vraag.id} className={styles.lijstItem}>
						<InnerCard className={styles.inner}>
							<div className={styles.inner__vraag}>
								<h3>{vraag.vraag}</h3>
								<p>{vraag.opties}</p>
							</div>

							<i
								className={`${styles.removeIcon} ${'far fa-trash-alt'}`}
								onClick={removeItem.bind(this, vraag.id)}
							></i>
						</InnerCard>
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

export default connect(mapStateToProps, {
	editVragenlijst: editVragenlijst,
	removeItemFromVragenlijst: removeItemFromVragenlijst,
})(AanmakenLijst);
