import React from 'react';

import './EmailCard.css';
import EmailForm from './EmailForm.js';
import FileUploadForm from './FileUploadForm.js';
import { Navigatie } from '../Navigatie/Navigatie';
import Card from '../Vragenlijst/Aanmaken/components/UI/Card/Card';

import axios from 'axios';
import { connect } from 'react-redux';

class EmailCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = { emails: [], id: '' };
	}

	componentDidMount() {
		this.getEmails(1);
	}

	getEmails(emailgroepId) {
		let emailArray = [];
		const EMAILGROEP_URL =
			'http://localhost:8000/api/mailgroep/' + emailgroepId + '/emailadressen/';
		axios
			.get(EMAILGROEP_URL, {
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
