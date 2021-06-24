import React from 'react';

import './Form.css';

class formContainer extends React.Component {
	state = { emailInput: '' };

	onChange = (event) => {
		this.setState({ emailInput: event.target.value });
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state.emailInput);
		// console.log(this.state.emailInput);
	};

	render() {
		return (
				<section className="formContainer">
					<form onSubmit={this.onSubmit} className="formContainer__form" id="js--email-form" method="POST">
						<label className="formContainer__form__label" htmlFor="email">
							Nieuw emailadres
						</label>
						<input
							onChange={this.onChange}
							className="formContainer__form__input"
							id="email"
							placeholder="Typ een nieuw emailadres"
							type="text"
							value={this.state.emailInput}
						/>
						<button className="formContainer__form__button" type="submit">
							Voeg email toe
						</button>
					</form>
				</section>
		);
	}
}

export default formContainer;
