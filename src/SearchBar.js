import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {

    state = {searchTerm: ""}

    onSearch = (event) => {
        this.setState({searchTerm: event.target.value});     
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchTerm);
    }

    render() {
        return (
            <section className="searchbar">
                <form onSubmit={this.onSubmit} className="searchbar__form">
                    <label className="searchbar__form__label" htmlFor="email">Zoek email</label>
                    <input onChange={this.onSearch} className="searchbar__form__input" id="email" placeholder="Zoek hier een emailadres" type="text" value={this.state.searchTerm} />
                    <button className="searchbar__form__button" type="submit">Voeg email toe</button> 
                </form>             
            </section>
        );
    }
}

export default SearchBar;