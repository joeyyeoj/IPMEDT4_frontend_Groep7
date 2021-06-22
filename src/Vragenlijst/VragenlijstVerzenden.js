import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux';
import './VragenlijstVerzenden.css';
import { changeUser, getCSRFToken, loginUser } from '../actions';
import { Redirect } from 'react-router-dom';
import '../FormsStyling/Forms.css';
import classes from '../Vragenlijst/Aanmaken/Aanmaken.module.css';
export class VragenlijstVerzenden extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vragenlijst: null,
			mailgroep: null,
			mailGroepen: [],
			vragenlijsten: [],
			redirect: false,
			mailGroupValid: false,
			vragenlijstValid: false,
			verzonden: false,
		};
	}

	componentDidMount() {
		if (!this.props.logged_in) {
			this.setState({
				redirectToLogin: true,
			});
			return;
		}

		const BASE_URL = 'http://localhost:8000/api';
		axios
			.get(BASE_URL + '/user/' + this.props.User.userData.id + '/mailgroepen', {
				withCredentials: true,
				headers: {
					'Authorization': 'Bearer ' + this.props.User.token,
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
			})
			.then((response) => {
				const temp_mailgroepen = [];
				response.data.forEach((mailgroep) =>
					temp_mailgroepen.push({ value: mailgroep.id, label: mailgroep.name })
				);
				this.setState({
					mailGroepen: temp_mailgroepen,
				});
			});

		axios
			.get(BASE_URL + '/user/' + this.props.User.userData.id + '/vragenlijsten', {
				withCredentials: true,
				headers: {
					'Authorization': 'Bearer ' + this.props.User.token,
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
			})
			.then((response) => {
				const temp_vragenlijsten = [];
				response.data.forEach((vragenlijst) =>
					temp_vragenlijsten.push({ value: vragenlijst.id, label: vragenlijst.name })
				);
				this.setState({
					vragenlijsten: temp_vragenlijsten,
				});
			});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<>
				<nav
					className={` ${classes.terug__navigatie} ${'terug__navigatie--verzenden'}`}
				>
					<ul className={classes.terug}>
						<li
							onClick={this.terugRedirect.bind(this)}
							className={classes.terug__navigatie__listItem}
						>
							<i className="fas fa-arrow-left"></i>Terug
						</li>
					</ul>
				</nav>
				<form onSubmit={this.onSubmit} className="form form--verzenden">
					<fieldset className="form__fieldset">
						<label className="form__label" htmlFor="onderzoek">
							Selecteer een onderzoek:
						</label>
						<Select
							id="js--selectOnderzoek"
							className="form__input--select"
							name="onderzoek"
							onChange={this.handleOnderzoekChange}
							options={this.state.vragenlijsten}
						></Select>
					</fieldset>
					<fieldset className="form__fieldset">
						<label className="form__label" htmlFor="mailgroep">
							Versturen naar:{' '}
						</label>
						<Select
							id="js--selectEmail"
							className="form__input--select"
							name="mailgroep"
							onChange={this.handleMailGroupChange}
							options={this.state.mailGroepen}
						></Select>
					</fieldset>
					{this.state.verzonden ? (
						<p className="form__success">Enquete verzonden!</p>
					) : (
						''
					)}
					<input
						className="form__submit"
						type="submit"
						disabled={
							this.state.mailGroupValid && this.state.vragenlijstValid ? '' : true
						}
					/>
				</form>
			</>
		);
	}

	handleMailGroupChange = (e) => {
		this.setState({
			mailgroep: e.value,
			mailGroupValid: true,
			verzonden: false,
		});
	};

	handleOnderzoekChange = (e) => {
		this.setState({
			vragenlijst: e.value,
			vragenlijstValid: true,
			verzonden: false,
		});
	};

	terugRedirect() {
		this.setState({ redirect: true });
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.makeApiCall();
		setTimeout(() => {
			this.setState({ redirect: true });
		}, 1000);
	};

	makeApiCall = () => {
		const sendEmailUrl = 'http://localhost:8000/api/send-email';
		const pakketje = {
			mailgroep: this.state.mailgroep,
			vragenlijst: this.state.vragenlijst,
		};
		axios.post(sendEmailUrl, pakketje, {
			withCredentials: true,
			headers: {
				'Authorization': 'Bearer ' + this.props.User.token,
				'X-Requested-With': 'XMLHttpRequest',
				'X-XSRF-Token': this.props.csrf_token,
			},
		});
		this.setState({
			verzonden: true,
		});
	};
}

const mapStateToProps = (state) => {
	return {
		csrf_token: state.CSRFToken,
		User: state.User,
		logged_in: state.logged_in,
	};
};

export default connect(mapStateToProps, {
	getCSRFToken: getCSRFToken,
	changeUser: changeUser,
})(VragenlijstVerzenden);
