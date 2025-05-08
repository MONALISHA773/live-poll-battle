import React from 'react';
import './Countdown.css';

function Countdown({ timeLeft }) {
    return <div className="countdown">⏳ Time left: {timeLeft}s</div>;
}

export default Countdown;
