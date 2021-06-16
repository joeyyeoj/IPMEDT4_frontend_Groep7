import React from 'react';
import './Questions.css';
// import NextPrevButtons from './NextPrevButtons';
import QuestionOpen from './QuestionOpen';
import QuestionMc from './QuestionMc';
import QuestionRange from './QuestionRange';
import axios from 'axios';

class Questions extends React.Component {
    state = {
        currentQuestion: 0,
        disabled: true,
        questions: [],
        options: [],
        kind: [],
        antwoorden: [],
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

        const BASE_URL = 'http://localhost:8000/api/vragenlijst/' + listId + '/vragen';
        axios.get(BASE_URL).then(res => {
            for(let i=0; i<res.data.length; i++) {
                questionArray.push(res.data[i]['vraag']);
                kindArray.push(res.data[i]['vraagsoort']);
                optionsArray.push(res.data[i]['opties']);
            }
            this.setState({questions: questionArray, options: optionsArray, kind: kindArray});        
            console.log(this.state);
        });
    } 

    checkQuestionKind() {
        const kind = this.state.kind[this.state.currentQuestion];
        if(kind === 1) {
            return (
                <article className="u-height-100">
                    <section className="questions">
                        <div className="questions__questionArea u-glasMorphism">
                            <h3>{this.state.questions[this.state.currentQuestion]}</h3>
                            <QuestionOpen />
                        </div>                    
                        <div>
                            <button onClick={this.prevQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabled}>Vorige</button>
                            <button onClick={this.nextQuestion} className="questions__button u-glasMorphism">Volgende</button>
                        </div>
                    </section>
                    <section className="progressArea">
                        <label className="progressArea__label u-glasMorphism">Vraag {this.state.currentQuestion} van {this.state.questions.length}</label>
                        <progress className="progressArea__progress" value={this.state.currentQuestion} max={this.state.questions.length}></progress>
                    </section>
                </article>
            );
        }
        if(kind === 2) {
            return (
                <article className="u-height-100">
                    <section className="questions">
                        <div className="questions__questionArea u-glasMorphism">
                            <h3>{this.state.questions[this.state.currentQuestion]}</h3>
                            <QuestionRange />
                        </div>
                        <div>
                            <button onClick={this.prevQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabled}>Vorige</button>
                            <button onClick={this.nextQuestion} className="questions__button u-glasMorphism">Volgende</button>
                        </div>
                    </section>
                    <section className="progressArea">
                        <label className="progressArea__label u-glasMorphism">Vraag {this.state.currentQuestion} van {this.state.questions.length}</label>
                        <progress className="progressArea__progress" value={this.state.currentQuestion} max={this.state.questions.length}></progress>
                    </section>
                </article>
            );
        }
        if(kind === 3) {
            return (
                <article className="u-height-100">
                    <section className="questions">
                        <div className="questions__questionArea u-glasMorphism">
                            <h3>{this.state.questions[this.state.currentQuestion]}</h3>
                            <QuestionMc options={this.state.options[this.state.currentQuestion]} />
                        </div>
                        <div>
                            <button onClick={this.prevQuestion} className="questions__button u-glasMorphism" disabled={this.state.disabled}>Vorige</button>
                            <button onClick={this.nextQuestion} className="questions__button u-glasMorphism">Volgende</button>
                        </div>
                    </section>
                    <section className="progressArea">
                        <label className="progressArea__label u-glasMorphism">Vraag {this.state.currentQuestion} van {this.state.questions.length}</label>
                        <progress className="progressArea__progress" value={this.state.currentQuestion} max={this.state.questions.length}></progress>
                    </section>
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

    nextQuestion() {
        const currentQuestion = this.state.currentQuestion;
        const nextQuestion = currentQuestion+1;
        if(this.state.disabled === true) {
            this.setState({disabled: false});
        }
        this.setState({currentQuestion: nextQuestion});
        console.log('volgende');
    }

    prevQuestion() {
        const currentQuestion = this.state.currentQuestion;
        const prevQuestion = currentQuestion-1;
        if(this.state.disabled === false && this.state.currentQuestion === 1) {
            this.setState({disabled: true});
        }
        this.setState({currentQuestion: prevQuestion});
        console.log('vorige');
    }

    render() {
       return this.checkQuestionKind();
    }
}

export default Questions;