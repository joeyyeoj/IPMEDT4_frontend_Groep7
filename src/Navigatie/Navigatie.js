import React from 'react';
import 'react-dom';
import './Navigatie.css';
import bars from './icons/bars-solid.png';
import plus from './icons/plus-solid.png';
import { Link } from 'react-router-dom';

export const Navigatie = (props) => {
	return (
		<nav className="navigatie">
			<ul className="navigatie__items">
				<li
					className={
						props.overzichtActive
							? 'navigatie__item navigatie__item--active navigatie__item--active--left'
							: 'navigatie__item'
					}
				>
					<Link to="/dashboard">
						<i className="fas fa-bars navigatie__icon"></i>
						<p className="navigatie__itemText">Overzicht</p>
					</Link>
				</li>
				<li
					className={
						props.toevoegenActive
							? 'navigatie__item navigatie__item--active navigatie__item--active--midden'
							: 'navigatie__item'
					}
				>
					<Link to="/opgeslagen">
						<i class="fas fa-clipboard-list navigatie__icon"></i>
						<p className="navigatie__itemText">Enquetes</p>
					</Link>
				</li>
				<li
					className={
						props.emailsActive
							? 'navigatie__item navigatie__item--active navigatie__item--active--right'
							: 'navigatie__item'
					}
				>
					<Link to="/emails">
						<i class="fas fa-address-book navigatie__icon"></i>
						<p className="navigatie__itemText">Mailgroepen</p>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
