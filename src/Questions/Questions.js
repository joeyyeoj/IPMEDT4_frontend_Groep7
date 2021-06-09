import React from 'react';
import './Questions.css';
import NextPrevButtons from './NextPrevButtons';
import QuestionOpen from './QuestionOpen';

const Questions = props => {
    return (
        <article className="questions">
            <section className="questions__questionArea u-glasMorphism">
                <QuestionOpen />
            </section>
            <NextPrevButtons />
        </article>
    );
}

export default Questions;