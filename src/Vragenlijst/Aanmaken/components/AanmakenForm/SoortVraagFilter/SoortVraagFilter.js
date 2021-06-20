import React from 'react';

import classes from './SoortVraagFilter.module.css';

const SoortVraagFilter = (props) => {
	const dropdownChangeHandler = (event) => {
		props.onChangeFilter(event.target.value);
	};

	return (
		<div className={classes.vraagSoortFilter}>
			<div className={classes.vraagSoortFilter__control}>
				<label>Kies een vraagsoort</label>
				<select value={props.selected} onChange={dropdownChangeHandler}>
					<option value="open">Open vraag</option>
					<option value="meerkeuze">Meerkeuze vraag (4 opties)</option>
					<option value="schaal">Schaal vraag</option>
				</select>
			</div>
		</div>
	);
};

export default SoortVraagFilter;
