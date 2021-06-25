import React from 'react';
import './Questions.css';
import QuestionOpen from './QuestionOpen';
import QuestionMc from './QuestionMc';
import QuestionRange from './QuestionRange';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import { connect } from 'react-redux';

class Questions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentQuestion: 0,
			questions: [],
			questionIds: [],
			options: [],
			kind: [],
			answers: [],
			disabledPrev: true,
			disabledNext: true,
			end: false,
			submitted: false,
			currentAnswer: '',
		};

		this.nextQuestion = this.nextQuestion.bind(this);
		this.prevQuestion = this.prevQuestion.bind(this);
	}

	componentDidMount() {
		this.makeApiCall(this.props.location.state.id);
	}

	makeApiCall = (listId) => {
		let questionArray = [];
		let kindArray = [];
		let optionsArray = [];
		let questionIdsArray = [];

		const BASE_URL =
			'https://api-ipmedt4.tychovanveen.nl/public/api/vragenlijst/' +
			listId +
			'/vragen/';
		axios
			.get(BASE_URL, {
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-XSRF-Token': this.props.csrf_token,
				},
			})
			.then((res) => {
				for (let i = 0; i < res.data.length; i++) {
					questionArray.push(res.data[i]['vraag']);
					kindArray.push(res.data[i]['vraagsoort']);
					optionsArray.push(res.data[i]['opties']);
					questionIdsArray.push(res.data[i]['id']);
				}
				this.setState({
					questions: questionArray,
					options: optionsArray,
					kind: kindArray,
					questionIds: questionIdsArray,
				});
			});
	};

	submitToApi = () => {
		const URL = 'https://api-ipmedt4.tychovanveen.nl/public/api/antwoord/submit/';
		for (let i = 0; i < this.state.questionIds.length; i++) {
			const answer = {
				questionId: this.state.questionIds[i],
				answer: this.state.answers[i],
				code: this.props.location.state.code,
			};
			axios.post(URL, answer);
		}
		this.setState({ submitted: true });
	};

	changeCurrentAnswer = (data) => {
		if (this.state.kind[this.state.currentQuestion] === 3) {
			this.nextQuestion(data);
		} else {
			this.setState({ currentAnswer: data });
			this.setState({ disabledNext: false });
		}
	};

	checkQuestionKind() {
		const kind = this.state.kind[this.state.currentQuestion];
		if (kind === 1) {
			return (
				<article className="u-height-100">
					<section className="questions">
						<div className="questions__questionArea u-glasMorphism">
							<h3>{this.state.questions[this.state.currentQuestion]}</h3>
							<QuestionOpen
								value={this.state.currentAnswer}
								onChange={this.changeCurrentAnswer}
							/>
						</div>
						<div>
							<button
								onClick={this.prevQuestion}
								className="questions__button u-glasMorphism"
								disabled={this.state.disabledPrev}
							>
								Vorige
							</button>
							<button
								onClick={this.nextQuestion}
								className="questions__button u-glasMorphism"
								disabled={this.state.disabledNext}
							>
								Volgende
							</button>
						</div>
					</section>
					<ProgressBar
						currentQuestion={this.state.currentQuestion}
						length={this.state.questions.length}
					/>
				</article>
			);
		}
		if (kind === 2) {
			return (
				<article className="u-height-100">
					<section className="questions">
						<div className="questions__questionArea u-glasMorphism">
							<h3>{this.state.questions[this.state.currentQuestion]}</h3>
							<QuestionRange
								onChange={this.changeCurrentAnswer}
								value={this.state.currentAnswer}
							/>
						</div>
						<div>
							<button
								onClick={this.prevQuestion}
								className="questions__button u-glasMorphism"
								disabled={this.state.disabledPrev}
							>
								Vorige
							</button>
							<button
								onClick={this.nextQuestion}
								className="questions__button u-glasMorphism"
								disabled={this.state.disabledNext}
							>
								Volgende
							</button>
						</div>
					</section>
					<ProgressBar
						currentQuestion={this.state.currentQuestion}
						length={this.state.questions.length}
					/>
				</article>
			);
		}
		if (kind === 3) {
			return (
				<article className="u-height-100">
					<section className="questions">
						<div className="questions__questionArea u-glasMorphism">
							<h3>{this.state.questions[this.state.currentQuestion]}</h3>
							<QuestionMc
								options={this.state.options[this.state.currentQuestion].split(',')}
								onSubmit={this.changeCurrentAnswer}
							/>
						</div>
						<div>
							<button
								onClick={this.prevQuestion}
								className="questions__button u-glasMorphism"
								disabled={this.state.disabledPrev}
							>
								Vorige
							</button>
							<button
								onClick={this.nextQuestion}
								className="questions__button u-glasMorphism"
								disabled={this.state.disabledNext}
							>
								Volgende
							</button>
						</div>
					</section>
					<ProgressBar
						currentQuestion={this.state.currentQuestion}
						length={this.state.questions.length}
					/>
				</article>
			);
		}
		if (
			this.state.currentQuestion === this.state.questions.length &&
			this.state.end &&
			!this.state.submitted
		) {
			return (
				<article className="u-height-100">
					<section className="questions">
						<div className="questions__questionArea u-glasMorphism u-text-center">
							<h3>Bedankt!</h3>
							<p>
								Dit was de laatste vraag van deze enquète, bedankt voor het invullen.
							</p>
							<p>U kunt de enquète nu versturen.</p>
							<button
								className="questions__button questions__button--submit"
								onClick={this.submitToApi}
							>
								Verstuur
							</button>
						</div>
						<ProgressBar
							currentQuestion={this.state.currentQuestion}
							length={this.state.questions.length}
						/>
					</section>
				</article>
			);
		}
		if (
			this.state.currentQuestion === this.state.questions.length &&
			this.state.end &&
			this.state.submitted
		) {
			return (
				<article className="u-height-100">
					<section className="questions">
						<div className="questions__questionArea u-glasMorphism u-text-center">
							<h3>De enquète is verstuurd!</h3>
							<p>U kunt het venster sluiten</p>
						</div>
					</section>
				</article>
			);
		} else {
			return (
				<article className="u-height-100">
					<section className="loaderArea">
						<div className="loaderArea__loader"></div>
						<h2>Even geduld...</h2>
					</section>
				</article>
			);
		}
	}

	nextQuestion(data) {
		let answersArray = this.state.answers;
		const rangeValues = ['1', '2', '3', '4', '5'];
		if (
			this.state.kind[this.state.currentQuestion] === 2 &&
			!rangeValues.includes(this.state.currentAnswer)
		) {
			answersArray.push('3');
		} else if (this.state.kind[this.state.currentQuestion] === 3) {
			answersArray.push(data);
		} else {
			answersArray.push(this.state.currentAnswer);
		}

		const currentQuestion = this.state.currentQuestion;
		const nextQuestion = currentQuestion + 1;

		if (this.state.kind[nextQuestion] != 2) {
			this.setState({ currentAnswer: '' });
		}

		if (this.state.disabledPrev === true) {
			this.setState({ disabledPrev: false });
		}

		if (nextQuestion === this.state.questions.length) {
			this.setState({ end: true });
		}

		if (this.state.kind[nextQuestion] === 2) {
			this.setState({
				disabledNext: false,
				currentAnswer: 3,
			});
		} else {
			this.setState({ disabledNext: true });
		}
		this.setState({ currentQuestion: nextQuestion, answers: answersArray });
	}

	prevQuestion() {
		let answersArray = this.state.answers;

		const currentQuestion = this.state.currentQuestion;
		const prevQuestion = currentQuestion - 1;
		if (this.state.disabledPrev === false && this.state.currentQuestion === 1) {
			this.setState({ disabledPrev: true });
		}

		if (
			this.state.kind[prevQuestion] === 1 ||
			(this.state.kind[prevQuestion] === 2 &&
				this.state.kind[currentQuestion] === this.state.kind[prevQuestion])
		) {
			this.setState({ currentAnswer: answersArray[answersArray.length - 1] });
		} else {
			this.setState({ currentAnswer: '' });
		}

		if (this.state.kind[prevQuestion] === 3) {
			this.setState({ disabledNext: true });
		} else {
			this.setState({ disabledNext: false });
		}

		answersArray.splice(-1, 1);
		this.setState({ currentQuestion: prevQuestion, asnwers: answersArray });
	}

	render() {
		return this.checkQuestionKind();
	}
}

const mapStateToProps = (state) => {
	return {
		csrf_token: state.CSRFToken,
	};
};

export default connect(mapStateToProps)(Questions);
