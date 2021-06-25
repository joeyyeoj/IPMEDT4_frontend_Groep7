import React from 'react';
import axios from 'axios';
import Vraag from './Vraag';
import './Antwoorden.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Antwoorden extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			vragen: [],
			redirect: false,
			redirectSend: false,
		};
	}

	componentDidMount() {
		this.haalVragenOp(this.props.location.state.id);
	}

	printPage() {
		let vragen = document.getElementsByClassName('vraag');
		let vraagCanvases = document.getElementsByClassName('vraag__canvas');
		for (let i = 0; i < vragen.length; i++) {
			vragen[i].style.gridColumn = 'span 2';
		}
		for (let i = 0; i < vraagCanvases.length; i++) {
			vraagCanvases[i].style.width = '75%';
		}
		setTimeout(() => {
			window.print();
			this.setState({ redirect: true });
		}, 500);
	}

	haalVragenOp(vragenlijstId) {
		let array = [];

		const BASE_URL =
			'http://localhost:8000/api/vragenlijst/' + vragenlijstId + '/vragen/';
		axios
			.get(BASE_URL, {
				withCredentials: true,
				headers: {
					'Authorization': 'Bearer ' + this.props.User.token,
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
			})
			.then((res) => {
				for (let i = 0; i < res.data.length; i++) {
					array.push({
						vraag: res.data[i].vraag,
						id: res.data[i].id,
						soort: res.data[i].vraagsoort,
					});
				}
				this.setState({ vragen: array });
			});
	}

	terugRedirect() {
		this.setState({ redirect: true });
	}

	redirectSend() {
		this.setState({ redirectSend: true });
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/dashboard" />;
		}

		if (this.state.redirectSend) {
			return <Redirect to="/verzenden" />;
		}

		if (this.props.location.state.responses < 5) {
			return (
				<section className="vragen" id="js--vragen">
					<nav className="vragen__navigatie">
						<ul className="vragen__navigatie__list">
							<li
								className="vragen__navigatie__listItem"
								onClick={this.terugRedirect.bind(this)}
							>
								<i className="fas fa-arrow-left"></i>Terug
							</li>
							<li
								className="vragen__navigatie__listItem"
								onClick={this.redirectSend.bind(this)}
							>
								<i className="far fa-paper-plane"></i>Verstuur
							</li>
							<li
								className="vragen__navigatie__listItem"
								onClick={this.printPage.bind(this)}
							>
								<i className="fas fa-print"></i>Print
							</li>
						</ul>
					</nav>
					<h1 className="vragen__responses__header">Er zijn geen resultaten</h1>
				</section>
			);
		}

		console.log(this.state.responses);
		return (
			<section className="vragen" id="js--vragen">
				<nav className="vragen__navigatie">
					<ul className="vragen__navigatie__list">
						<li
							className="vragen__navigatie__listItem"
							onClick={this.terugRedirect.bind(this)}
						>
							<i className="fas fa-arrow-left"></i>Terug
						</li>
						<li
							className="vragen__navigatie__listItem"
							onClick={this.redirectSend.bind(this)}
						>
							<i className="far fa-paper-plane"></i>Verstuur
						</li>
						<li
							className="vragen__navigatie__listItem"
							onClick={this.printPage.bind(this)}
						>
							<i className="fas fa-print"></i>Print
						</li>
					</ul>
				</nav>
				<h1 className="vragen__resultaten">Resultaten</h1>
				{this.state.vragen.map(function (vraag, id) {
					return (
						<Vraag key={id} vraag={vraag.vraag} id={vraag.id} soort={vraag.soort} />
					);
				})}
			</section>
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

export default connect(mapStateToProps)(Antwoorden);
