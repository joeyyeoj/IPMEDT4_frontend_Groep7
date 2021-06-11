import React from 'react';
import TextArea from './TextArea.js';

const QuestionOpen = props => {

    return (
        <div className="questions__questionOpen">
            <form>
                <TextArea limit={250} value="" />
            </form>
        </div>
    );
}

export default QuestionOpen;