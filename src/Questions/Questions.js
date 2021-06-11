import React from 'react';
import './Questions.css';
import NextPrevButtons from './NextPrevButtons';
import QuestionOpen from './QuestionOpen';
import QuestionMc from './QuestionMc';
const Questions = props => {
    return (
        <article className="questions">
            <section className="questions__questionArea u-glasMorphism">
                <h3>Wat zouden we aan de school kunnen veranderen?</h3>
                <QuestionOpen />
                {/* <QuestionMc /> */}
            </section>
            <NextPrevButtons />
        </article>
    );
}

export default Questions;