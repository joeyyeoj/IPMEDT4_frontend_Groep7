import React from 'react';
import './Questions.css';
import NextPrevButtons from './NextPrevButtons';

const Questions = props => {
    return (
        <article className="questions">
            <section className="questions__questionArea u-glasMorphism">
                {/* <p>Test</p> */}
            </section>
            <NextPrevButtons />
        </article>
    );
}

export default Questions;