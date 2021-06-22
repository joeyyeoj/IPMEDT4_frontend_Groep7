import classes from './Aanmaken.module.css';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import AanmakenLijst from './components/AanmakenLijst/AanmakenLijst';
import AanmakenForm from './components/AanmakenForm/AanmakenForm/AanmakenForm';

const Aanmaken = () => {
	const [redirect, setRedirect] = useState(false);

	const terugRedirect = () => {
		setRedirect(true);
	};

	if (redirect === true) {
		return <Redirect to="/dashboard" />;
	} else {
		return (
			<>
				<nav className={classes.terug__navigatie}>
					<ul className={classes.terug}>
						<li
							onClick={terugRedirect}
							className={classes.terug__navigatie__listItem}
						>
							<i className="fas fa-arrow-left"></i>Terug
						</li>
					</ul>
				</nav>
				<AanmakenForm />
				<AanmakenLijst />
			</>
		);
	}
};

export default Aanmaken;
