import React from 'react';
import Select from 'react-select';
import EmailForm from './EmailForm';
import MailgroepForm from './MailgroepForm';
import FileUploadForm from './FileUploadForm';
import { Navigatie } from '../Navigatie/Navigatie';
import Card from '../Vragenlijst/Aanmaken/components/UI/Card/Card';

import './EmailCard.css';
import '../Vragenlijst/VragenlijstVerzenden.css';

import axios from 'axios';
import { connect } from 'react-redux';

class EmailCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = { emails: [], mailGroepen: [], mailGroep: null };
	}

	componentDidMount() {
		this.getMailgroepen();
	}

	getMailgroepen() {
		const MAILGROEP_URL = 'http://localhost:8000/api/user/'+ this.props.User.userData.id +'/mailgroepen';
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

	handleMailGroupChange = (e) => {
		this.getEmails(e.value);
		this.setState({ mailGroep: e.value });		
	}

	renderEmails() {
		return this.state.emails.map((emails) => {
			return (
				<ul key={emails.id} className="email-card__content__emails">
					<li>{emails}</li>
				</ul>
			);
		});
	}

	onEmailSubmit = (emailInput) => {
		const nieuweMail = {
			email: emailInput,
			mailgroepId: this.state.mailGroep,
		};

		let postGo = 1;
		for(let i = 0; i < this.state.emails.length; i++) {
			if(emailInput == this.state.emails[i]) {
				postGo = 0;
			}
		}
		if(postGo == 1) {
			const NIEUWEMAIL_URL = 'http://localhost:8000/api/mailgroep/'+ this.state.mailgroep +'/emailadressen/create';
			let emailPost = axios
				.post(NIEUWEMAIL_URL, nieuweMail, {
					withCredentials: true,
					headers: {
						'Authorization': 'Bearer ' + this.props.User.token,
						'X-Requested-With': 'XMLHttpRequest',
						'X-XSRF-Token': this.props.csrf_token,
					},
				});
			this.getEmails(this.state.mailGroep);
		}
		else {
			console.log("nope");
		}

		
	};

	onMailgroepSubmit = (mailgroepInput) => {
		const nieuweMailgroep = {
			eigenaarId: this.props.User.userData.id,
			name: mailgroepInput,
		};

		const NIEUWEMAILGROEP_URL = 'http://localhost:8000/api/mailgroep';
		let mailgroepPost = axios
			.post(NIEUWEMAILGROEP_URL, nieuweMailgroep, {
				withCredentials: true,
				headers: {
					'Authorization': 'Bearer ' + this.props.User.token,
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
		});
		this.getMailgroepen();
	};

	render() {
		return (
			<>
				<section className="email-card__content">
					<Card>
						<MailgroepForm onSubmit={this.onMailgroepSubmit} />
						<Select
							id="js--selectEmail"
							className="form__input--select"
							name="mailgroep"
							onChange={this.handleMailGroupChange}
							options={this.state.mailGroepen}
						></Select>
						<EmailForm onSubmit={this.onEmailSubmit} />
					</Card>
					{/* <FileUploadForm /> */}
					{this.state.emails.length > 0 && <Card>{this.renderEmails(this.state.mailgoep)}</Card>}
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
