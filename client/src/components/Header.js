import React, { useState } from 'react';
import './Header.css';

function Header({ onCreateRoom, onJoinRoom }) {
    const [name, setName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    const handleCreate = () => {
        if (name) onCreateRoom(name);
    };

    const handleJoin = () => {
        if (name && roomCode) onJoinRoom(name, roomCode);
    };

    return (
        <div className="header-container">
            <h1 className="title">Poll Room</h1>
            <input
                className="input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className="room-actions">
                <button className="button create" onClick={handleCreate}>Create Poll Room</button>
                <input
                    className="input"
                    type="text"
                    placeholder="Room code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                />
                <button className="button join" onClick={handleJoin}>Join Poll Room</button>
            </div>
        </div>
    );
}

export default Header;