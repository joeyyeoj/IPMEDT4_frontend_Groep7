import React from 'react';
import './Register.css';
import axios from 'axios';
import { changeUser, getCSRFToken, loginUser } from '../actions';
import { connect } from 'react-redux';
import '../FormsStyling/Forms.css';
import { Redirect } from 'react-router-dom';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nameError: {
				message: '',
				valid: false,
				touched: false,
			},
			emailError: {
				message: '',
				valid: false,
				touched: false,
			},
			passwordError: {
				message: '',
				valid: false,
				touched: false,
			},
			passwordConfirmationError: {
				message: '',
				valid: false,
				touched: false,
			},
			allInputsValid: false,
			redirectToDashboard: false,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	render() {
		if (this.state.redirectToDashboard) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<form
				className="form form--register"
				onSubmit={this.onSubmit}
				id="form"
				method="POST"
			>
				<fieldset className="form__fieldset">
					<label className="form__label" htmlFor="name">
						Naam {!this.state.nameError.valid ? this.state.nameError.message : ''}
					</label>
					<input
						className={
							!this.state.nameError.valid && this.state.nameError.touched
								? 'form__input form__input--invalid'
								: 'form__input'
						}
						type="text"
						id="name"
						name="name"
						onChange={this.handleInputChange}
					/>
					<label className="form__label" htmlFor="email">
						Email {!this.state.emailError.valid ? this.state.emailError.message : ''}
					</label>
					<input
						className={
							!this.state.emailError.valid && this.state.emailError.touched
								? 'form__input form__input--invalid'
								: 'form__input'
						}
						type="text"
						id="email"
						name="email"
						onChange={this.handleInputChange}
					/>
					<label className="form__label" htmlFor="organisatie">
						Organisatie
					</label>
					<input
						className="form__input"
						type="text"
						name="organisatie"
						onChange={this.handleInputChange}
					/>
				</fieldset>
				<fieldset className="form__fieldset">
					<label className="form__label" htmlFor="password">
						Wachtwoord{' '}
						{!this.state.passwordError.valid ? this.state.passwordError.message : ''}
					</label>
					<input
						className={
							!this.state.passwordError.valid && this.state.passwordError.touched
								? 'form__input form__input--invalid'
								: 'form__input'
						}
						type="password"
						name="password"
						onChange={this.handleInputChange}
					/>
					<label className="form__label" htmlFor="password__confirm">
						Wachtwoord bevestigen
					</label>
					<input
						className={
							!this.state.passwordConfirmationError.valid &&
							this.state.passwordConfirmationError.touched
								? 'form__input form__input--incorrect'
								: 'form__input'
						}
						type="password"
						id="password_confirm"
						name="password_confirm"
						onChange={this.handleInputChange}
					/>
				</fieldset>
				<fieldset className="form__fieldset">
					<input type="submit" className="form__submit" value="Registreren" />
				</fieldset>
			</form>
		);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});

		this.validateInputs(target);
	}

	validateEmail(email) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	validateInputs(target) {
		const value = target.value;
		const name = target.name;

		switch (name) {
			case 'name':
				if (value != null && value.length >= 2) {
					this.setState({
						nameError: {
							valid: true,
						},
					});
				} else if (!value || value === '') {
					this.setState({
						nameError: {
							valid: false,
							message: 'mag niet leeg zijn',
							touched: true,
						},
					});
				} else if (value.length < 2) {
					this.setState({
						nameError: {
							valid: false,
							message: 'is te kort',
							touched: true,
						},
					});
				}
				break;
			case 'email':
				if (this.validateEmail(value)) {
					this.setState({
						emailError: {
							valid: true,
						},
					});
				} else if (value == null || value === '') {
					this.setState({
						emailError: {
							valid: false,
							message: 'mag niet leeg zijn',
							touched: true,
						},
					});
				} else if (!this.validateEmail(value)) {
					this.setState({
						emailError: {
							valid: false,
							message: 'is ongeldig',
							touched: true,
						},
					});
				}
				break;
			case 'password':
				if (value && value.length >= 8 && value === this.state.password_confirm) {
					this.setState({
						passwordError: {
							valid: true,
						},
						passwordConfirmationError: {
							valid: true,
						},
					});
				} else if (value == null || value === '') {
					this.setState({
						passwordError: {
							valid: false,
							message: 'mag niet leeg zijn',
							touched: true,
						},
					});
				} else if (value.length < 8) {
					this.setState({
						passwordError: {
							valid: false,
							message: 'is te kort (minimaal 8 karakters)',
							touched: true,
						},
					});
				} else if (value !== this.state.password_confirm) {
					this.setState({
						passwordError: {
							valid: false,
							message: 'velden moeten hetzelfde zijn',
							touched: true,
						},
						passwordConfirmationError: {
							valid: false,
							touched: true,
						},
					});
				}
				break;
			case 'password_confirm':
				if (value && value !== '' && value === this.state.password) {
					this.setState({
						passwordConfirmationError: {
							valid: true,
							touched: true,
						},
						passwordError: {
							valid: true,
							touched: true,
						},
					});
				} else if (!value || value === '') {
					this.setState({
						passwordConfirmationError: {
							valid: false,
							message: 'mag niet leeg zijn',
							touched: true,
						},
						passwordError: {
							valid: false,
							message: 'velden moeten hetzelfde zijn',
						},
					});
				} else if (value && value !== '' && value !== this.state.password) {
					this.setState({
						passwordConfirmationError: {
							valid: false,
							touched: true,
						},
						passwordError: {
							valid: false,
							message: 'velden moeten gelijk zijn',
							touched: true,
						},
					});
				}
				break;
		}
	}

	makeApiCall = () => {
		const REGISTER_URL = 'http://127.0.0.1:8000/api/users/create';
		const userAccount = {
			name: this.state.name,
			email: this.state.email,
			organisatie: this.state.organisatie,
			password: this.state.password,
			password_confirmation: this.state.password_confirm,
		};

		axios
			.post(REGISTER_URL, userAccount, {
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
			})
			.then((response) => {
				let userCreated = {
					token: response.data.token,
					userData: {
						id: response.data.user.id,
						name: response.data.user.name,
						email: response.data.user.email,
						organisatie: response.data.user.organisatie,
					},
				};

				this.setState({
					redirectToDashboard: true,
				});
				this.props.changeUser(userCreated);
				this.props.loginUser(true);
			})
			.catch((error) => console.log(error));
	};

	checkAllInputErrors() {
		return (
			this.state.nameError.valid &&
			this.state.emailError.valid &&
			this.state.passwordError.valid &&
			this.state.passwordConfirmationError.valid
		);
	}

	onSubmit = (event) => {
		event.preventDefault();

		if (this.checkAllInputErrors()) {
			this.makeApiCall();
		} else {
			alert('Er is iets mis gegaan, check of je alle velden juist hebt ingevoerd.');
		}
	};
}

const mapStateToProps = (state) => {
	return { csrf_token: state.CSRFToken, User: state.User };
};

export default connect(mapStateToProps, {
	getCSRFToken: getCSRFToken,
	changeUser: changeUser,
	loginUser: loginUser,
})(Register);
