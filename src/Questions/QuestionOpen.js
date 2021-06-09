import React from 'react';
import TextArea from './TextArea.js';

const QuestionOpen = props => {

    return (
        <div className="questions__questionOpen">
            <h1>Title</h1>
            <form>
                <TextArea limit={250} value="" />
            </form>
        </div>
    );
}

export default QuestionOpen;