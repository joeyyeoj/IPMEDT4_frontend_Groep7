import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
    render() {
        return (
            <section className="searchbar">
                <form className="searchbar__form">
                    <label className="searchbar__form__label" htmlFor="email">Zoek email</label>
                    <input className="searchbar__form__input" id="email" placeholder="Zoek hier een emailadres" type="text" />
                    <button className="searchbar__form__button" type="submit">Voeg email toe</button> 
                </form>             
            </section>
        );
    }
}

export default SearchBar;