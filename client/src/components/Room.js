
import React, { useState, useEffect } from 'react';
import Poll from './Poll';
import Countdown from './Countdown';
import './Room.css';

function Room({ roomCode, userName, socket }) {
    const [votes, setVotes] = useState({ option1: 0, option2: 0 });
    const [hasVoted, setHasVoted] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        socket.emit('joinRoom', { roomCode, userName });

        socket.on('voteUpdate', setVotes);
        socket.on('timerUpdate', setTimer);
        socket.on('errorMessage', (message) => {
            alert(message);
        });

        const voted = localStorage.getItem(`voted-${roomCode}-${userName}`);
        if (voted === 'true') {
            setHasVoted(true);
        }

        return () => {
            socket.off('voteUpdate');
            socket.off('timerUpdate');
            socket.off('errorMessage');
        };
    }, [roomCode, userName, socket]);

    const handleVote = (option) => {
        if (!hasVoted && timer > 0) {
            socket.emit('vote', { roomCode, option, userName });
            setHasVoted(true);
            localStorage.setItem(`voted-${roomCode}-${userName}`, 'true');
        }
    };

    return (
        <div className="room-container">
            <h2 className="question">What do you like? <br /> Cats or Dogs</h2>
            {roomCode && (
                <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
                    Room Code: <span style={{ color: '#007bff' }}>{roomCode}</span>
                </p>
            )}
            <Poll votes={votes} onVote={handleVote} hasVoted={hasVoted} timer={timer} />
            <Countdown timeLeft={timer} />
            {timer <= 0 && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>Voting time is over.</p>
            )}
        </div>
    );
}

export default Room;
