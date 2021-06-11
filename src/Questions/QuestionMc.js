import React from 'react';
import TextArea from './TextArea.js';

const QuestionOpen = props => {

    return (
        <div className="questions__questionMc">
            <form>
                <input className="questions__mcButton" type="submit" value="A"></input>
                <input className="questions__mcButton" type="submit" value="B"></input>
                <input className="questions__mcButton" type="submit" value="C"></input>
                <input className="questions__mcButton" type="submit" value="D"></input>
            </form>
        </div>
    );
}

export default QuestionOpen;