import React from 'react';

import './EmailForm.css';

class EmailForm extends React.Component {

    state = {emailInput: ""}

    onChange = (event) => {
        this.setState({emailInput: event.target.value});    
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.emailInput);
        // console.log(this.state.emailInput);
    }

    render() {
        return (
            <section className="searchbar">
                <form onSubmit={this.onSubmit} className="searchbar__form" method="POST">
                    <label className="searchbar__form__label" htmlFor="email">Nieuw emailadres</label>
                    <input onChange={this.onChange} className="searchbar__form__input" id="email" placeholder="Typ een nieuw emailadres" type="text" value={this.state.emailInput} />
                    <button className="searchbar__form__button" type="submit">Voeg email toe</button> 
                </form>             
            </section>
        );
    }
}

export default EmailForm;

