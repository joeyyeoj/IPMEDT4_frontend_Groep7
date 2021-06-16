import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {

    state = {searchTerm: ""}

    onChange = (event) => {
        this.setState({emailInput: event.target.value});     
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.emailInput);
    }

    render() {
        return (
            <section className="searchbar">
                <form onSubmit={this.onSubmit} className="searchbar__form">
                    <label className="searchbar__form__label" htmlFor="email">Zoek email</label>
                    <input onChange={this.onChange} className="searchbar__form__input" id="email" placeholder="Zoek hier een emailadres" type="text" value={this.state.emailInput} />
                    <button className="searchbar__form__button" type="submit">Voeg email toe</button> 
                </form>             
            </section>
        );
    }
}

export default SearchBar;