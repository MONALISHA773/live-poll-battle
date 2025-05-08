import React from 'react';
import './Poll.css';

function Poll({ votes, onVote, hasVoted, timer }) {
    const disabled = hasVoted || timer <= 0;

    return (
        <div className="poll-container">
            <button onClick={() => onVote('option1')} disabled={disabled}>
                🐱 Cats ({votes.option1})
            </button>
            <button onClick={() => onVote('option2')} disabled={disabled}>
                🐶 Dogs ({votes.option2})
            </button>
        </div>
    );
}

export default Poll;
