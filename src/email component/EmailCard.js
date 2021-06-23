import React from 'react';
import Select from 'react-select';
import EmailForm from './EmailForm';
import FileUploadForm from './FileUploadForm.js';
import { Navigatie } from '../Navigatie/Navigatie';
import Card from '../Vragenlijst/Aanmaken/components/UI/Card/Card';

import './EmailCard.css';
import '../Vragenlijst/VragenlijstVerzenden.css';

import axios from 'axios';
import { connect } from 'react-redux';

class EmailCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = { emails: []};
	}

	componentDidMount() {
		this.getMailgroepen();
		this.getEmails(1);
	}

	getMailgroepen() {
		const MAILGROEP_URL = 'http://localhost:8000/api/user/'+ this.props.User.userData.id +'/mailgroep';
		axios
			.get(MAILGROEP_URL, {
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
	}


	getEmails(emailgroepId) {
		let emailArray = [];
		const EMAIL_URL =
			'http://localhost:8000/api/mailgroep/' + emailgroepId + '/emailadressen/';
		axios
			.get(EMAIL_URL, {
				withCredentials: true,
				headers: {
					'Authorization': 'Bearer ' + this.props.User.token,
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
			})
			.then((res) => {
				for (let i = 0; i < res.data.length; i++) {
					emailArray.push(res.data[i]['email']);
				}
				this.setState({ emails: emailArray });
			});
	}

	renderEmails() {
		return this.state.emails.map((emails) => {
			return (
				<p key={emails.id} className="email-card__content__emails">
					{emails}
				</p>
			);
		});
	}

	onSubmit = (emailInput) => {
		const nieuweMail = {
			email: emailInput,
			mailgroepId: 1,
		};

		const NIEUWEMAIL_URL = 'http://localhost:8000/api/mailgroep/1/emailadressen';
		let posttest = axios
			.post(NIEUWEMAIL_URL, nieuweMail, {
				withCredentials: true,
				headers: {
					'Authorization': 'Bearer ' + this.props.User.token,
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
			})

			.then(function (response) {
				console.log(response);
			})
			.catch(function (response) {
				console.log(response);
			});
		console.log(posttest);
		console.log(nieuweMail);
	};

	render() {
		return (
			<>
				<section className="email-card__content">
					<Select
						id="js--selectEmail"
						className="form__input--select"
						name="mailgroep"
						onChange={this.handleMailGroupChange}
						options={this.state.mailGroepen}
					></Select>
					<EmailForm onSubmit={this.onSubmit} />
					{/* <FileUploadForm /> */}
					{this.state.emails.length > 0 && <Card>{this.renderEmails()}</Card>}
				</section>
				<Navigatie
					overzichtActive={false}
					toevoegenActive={false}
					emailsActive={true}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		csrf_token: state.CSRFToken,
		User: state.User,
		logged_in: state.logged_in,
	};
};

export default connect(mapStateToProps)(EmailCard);
