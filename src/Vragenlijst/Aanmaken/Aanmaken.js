// import classes from './Aanmaken.module.css';

import AanmakenLijst from './components/AanmakenLijst/AanmakenLijst';
import AanmakenForm from './components/AanmakenForm/AanmakenForm/AanmakenForm';

const Aanmaken = () => {
	return (
		<>
			<AanmakenForm />
			<AanmakenLijst />
		</>
	);
};

export default Aanmaken;
