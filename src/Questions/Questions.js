import React from 'react';
import './Questions.css';
import QuestionOpen from './QuestionOpen';
import QuestionMc from './QuestionMc';
import QuestionRange from './QuestionRange';
import axios from 'axios';
import ProgressBar from './ProgressBar';

class Questions extends React.Component {
    state = {
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
        currentAnswer: ''
    };

    constructor(props) {
        super(props);

        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
    }

    componentDidMount() {
        this.makeApiCall(1);
    }

    makeApiCall = (listId) => {
        let questionArray = [];
        let kindArray = [];
        let optionsArray = [];
        let questionIdsArray = [];

        const BASE_URL = 'http://localhost:8000/api/vragenlijst/' + listId + '/vragen';
        axios.get(BASE_URL).then(res => {
            for(let i=0; i<res.data.length; i++) {
                questionArray.push(res.data[i]['vraag']);
                kindArray.push(res.data[i]['vraagsoort']);
                optionsArray.push(res.data[i]['opties']);
                questionIdsArray.push(res.data[i]['id']);
            }
            this.setState({questions: questionArray, options: optionsArray, kind: kindArray, questionIds: questionIdsArray});
        });
    }

    submitToApi = () => {
        const URL = 'http://localhost:8000/api/antwoord/submit';
        for(let i=0; i<this.state.questionIds.length; i++) {
            const answer = {
                questionId: this.state.questionIds[i],
                answer: this.state.answers[i]
            }
            axios.post(URL, answer);
        }
        this.setState({submitted: true});
    }

    changeCurrentAnswer = (data) => {
        if(this.state.kind[this.state.currentQuestion] === 3) {
            this.nextQuestion(data);
        }
        else {
            this.setState({currentAnswer: data});
            this.setState({disabledNext: false});
        }
    }

    checkQuestionKind() {
        console.log(this.state);
        const kind = this.state.kind[this.state.currentQuestion];
        if(kind === 1) {
            return (
                <article className="u-height-100">
                    <section className="questions">
                        <div className="questions__questionArea u-glasMorphism">
                            <h3>{this.state.questions[this.state.currentQuestion]}</h3>
                            <QuestionOpen onChange={this.changeCurrentAnswer} />
                        </div>                    
                        <div>
                            <button onClick={this.prevQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabledPrev}>Vorige</button>
                            <button onClick={this.nextQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabledNext}>Volgende</button>
                        </div>
                    </section>
                    <ProgressBar currentQuestion={this.state.currentQuestion} length={this.state.questions.length} />
                </article>
            );
        }
        if(kind === 2) {
            return (
                <article className="u-height-100">
                    <section className="questions">
                        <div className="questions__questionArea u-glasMorphism">
                            <h3>{this.state.questions[this.state.currentQuestion]}</h3>
                            <QuestionRange onChange={this.changeCurrentAnswer} />
                        </div>
                        <div>
                            <button onClick={this.prevQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabledPrev}>Vorige</button>
                            <button onClick={this.nextQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabledNext}>Volgende</button>
                        </div>
                    </section>
                    <ProgressBar currentQuestion={this.state.currentQuestion} length={this.state.questions.length} />
                </article>
            );
        }
        if(kind === 3) {
            return (
                <article className="u-height-100">
                    <section className="questions">
                        <div className="questions__questionArea u-glasMorphism">
                            <h3>{this.state.questions[this.state.currentQuestion]}</h3>
                            <QuestionMc options={this.state.options[this.state.currentQuestion].split(',')} onSubmit={this.changeCurrentAnswer} />
                        </div>
                        <div>
                            <button onClick={this.prevQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabledPrev}>Vorige</button>
                            <button onClick={this.nextQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabledNext}>Volgende</button>
                        </div>
                    </section>
                    <ProgressBar currentQuestion={this.state.currentQuestion} length={this.state.questions.length} />
                </article>
            );
        }
        if(this.state.currentQuestion === this.state.questions.length && this.state.end && !this.state.submitted) {
            // for( let i=0; i<this.state.questions.length; i++) {
            //     console.log('test');
            // }
            // return <button onClick={this.submitToApi}>Submit</button>;
            return (
                <article className="questions">
                    <section className="questions__questionArea u-glasMorphism u-text-center">
                        <h3>Bedankt!</h3>
                        <p>Dit was de laatste vraag van deze enquète, bedankt voor het invullen.</p>
                        <p>U kunt de enquète nu versturen.</p>
                        <button className="questions__button questions__button--submit" onClick={this.submitToApi}>Verstuur</button>
                    </section>
                </article>
            );
        }
        if(this.state.currentQuestion === this.state.questions.length && this.state.end && this.state.submitted) {
            return (
                <article className="questions">
                    <section className="questions__questionArea u-glasMorphism u-text-center">
                        <h3>De enquète is verstuurd!</h3>
                        <p>U kunt het venster sluiten</p>
                    </section>
                    <ProgressBar currentQuestion={this.state.currentQuestion} length={this.state.questions.length} />
                </article>
            );
        }
        else {
            return (
                <article className="loaderArea">
                    <section class="loaderArea__loader"></section>
                    <h2>Even geduld...</h2>
                </article>
            );
        }
    }

    nextQuestion(data) {
        let answersArray = this.state.answers;
        if(this.state.kind[this.state.currentQuestion] === 2 && this.state.currentAnswer === '') {
            answersArray.push('3');
        }
        else if(this.state.kind[this.state.currentQuestion] === 3) {
            answersArray.push(data);
        }
        else {
            answersArray.push(this.state.currentAnswer);
        }
        
        const currentQuestion = this.state.currentQuestion;
        const nextQuestion = currentQuestion+1;
        
        if(this.state.disabledPrev === true) {
            this.setState({disabledPrev: false});
        }
        
        if(nextQuestion === this.state.questions.length) {
            this.setState({end: true});
        }

        if(this.state.kind[nextQuestion] === 2) {
            this.setState({disabledNext: false})
        }
        else {
            this.setState({disabledNext: true});
        }
        this.setState({currentQuestion: nextQuestion, answers: answersArray, currentAnswer: ''});
    }

    prevQuestion() {
        let answersArray = this.state.answers;
        answersArray.splice(-1, 1);

        const currentQuestion = this.state.currentQuestion;
        const prevQuestion = currentQuestion-1;
        if(this.state.disabledPrev === false && this.state.currentQuestion === 1) {
            this.setState({disabledPrev: true});
        }
        this.setState({currentQuestion: prevQuestion, asnwers: answersArray, currentAnswer: '', disabledNext: true});
    }

    render() {
       return this.checkQuestionKind();
    }
}

export default Questions;