import { connect } from 'react-redux';
import styles from './AanmakenLijst.module.css';
import { editVragenlijst } from '../../../../actions';

import Card from '../UI/Card/Card';
import InnerCard from '../UI/InnerCard/InnerCard';

const AanmakenLijst = (props) => {
	return (
		<Card className={styles.card}>
			<h2 className={styles.titel}>Vragen</h2>
			<ul>
				{props.vragen_lijst.vragenlijst.map((vraag) => (
					<li
						key={vraag.vraag + vraag.opties + vraag.type}
						className={styles.lijstItem}
					>
						<InnerCard className={styles.inner}>
							<h3>{vraag.vraag}</h3>
							{/* <p>{vraag.opties}</p> */}
							{vraag.type === 3 && <p>{vraag.opties}</p>}
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

export default connect(mapStateToProps, { editVragenlijst: editVragenlijst })(
	AanmakenLijst
);
