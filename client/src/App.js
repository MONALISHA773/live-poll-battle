

// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Room from './components/Room';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
    const [roomCode, setRoomCode] = useState(null);
    const [userName, setUserName] = useState(null);

    const createRoom = (name) => {
        const code = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        console.log('Creating room with code:', code);
        setUserName(name);
        setRoomCode(code);
        socket.emit('createRoom', { userName: name, roomCode: code }); // ✅ Send room code too
    };
    

    const joinRoom = (name, code) => {
        setUserName(name);
        setRoomCode(code);
        socket.emit('joinRoom', { userName: name, roomCode: code });
    };

    return (
        <div className="app-container">
            {!roomCode ? (
                <Header onCreateRoom={createRoom} onJoinRoom={joinRoom} />
            ) : (
                <Room roomCode={roomCode} userName={userName} socket={socket} />
            )}
        </div>
    );
}

export default App;
