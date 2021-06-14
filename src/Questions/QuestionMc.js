import React from 'react';

const QuestionOpen = props => {
    const options = props.options.split(',');
    console.log(options);

    return (
        <div className="questions__questionMc">
            <form>
                <input className="questions__mcButton" type="submit" value={"A " + options[0]}></input>
                <input className="questions__mcButton" type="submit" value={"B " + options[1]}></input>
                <input className="questions__mcButton" type="submit" value={"C " + options[2]}></input>
                <input className="questions__mcButton" type="submit" value={"D " + options[3]}></input>
            </form>
        </div>
    );
}

export default QuestionOpen;