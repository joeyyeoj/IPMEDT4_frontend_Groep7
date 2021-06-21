import React from "react";
import 'react-dom';
import './Navigatie.css'
import bars from './icons/bars-solid.png'
import plus from './icons/plus-solid.png'
import { Link } from "react-router-dom";

export const Navigatie = (props) => {
    return (
        <nav className="navigatie">
            <ul className="navigatie__items">
                <li className={props.overzichtActive ? 'navigatie__item navigatie__item--active navigatie__item--active--left' : 'navigatie__item'}>
                    <Link to="/dashboard">
                        <img className="navigatie__icon" src={bars} />
                        <p className="navigatie__itemText">Overzicht</p>
                    </Link>

                </li>
                <li className={props.toevoegenActive ? 'navigatie__item navigatie__item--active navigatie__item--active--right' : 'navigatie__item'}>
                    <Link to="/opgeslagen">
                        <img className="navigatie__icon" src={plus} alt="" />
                        <p className="navigatie__itemText">Mijn enquetes</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
