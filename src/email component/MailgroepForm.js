import React from 'react';
import './Form.css';

class MailgroepForm extends React.Component {
    state = { mailgroepInput: '' };

	onChange = (event) => {
		this.setState({ mailgroepInput: event.target.value });
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state.mailgroepInput);
	};

    render() {
		return (
				<section className="formContainer">
					<form onSubmit={this.onSubmit} className="formContainer__form" id="js--mailgroep-form" method="POST">
						<label className="formContainer__form__label" htmlFor="mailgroep">
							Nieuwe mailgroep
						</label>
						<input
							onChange={this.onChange}
							className="formContainer__form__input"
							id="mailgroep"
							placeholder="Typ een nieuwe mailgroep"
							type="text"
							value={this.state.mailgroepInput}
						/>
						<button className="formContainer__form__button" type="submit">
							Voeg mailgroep toe
						</button>
					</form>
				</section>
		);
	}
}

export default MailgroepForm;