# live-poll-battle
A real-time polling application where users can create or join rooms, vote on a poll question, and instantly see the results. The application uses React for the frontend and Node.js with WebSockets for the backend to enable real-time interactions.
## Setup

### Frontend:
1. Navigate to the `client/` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the React app locally.

### Backend:
1. Navigate to the `server/` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the Node.js server locally.

### Features
1. Frontend (ReactJS)
○ Allow a user to enter their name (unique, no password) and either:
       ■ Create a new poll room, or
       ■ Join an existing poll room using a room code.
○ Display a question with two options (e.g., "Cats or Dogs").
○ Let the user vote for one option.
○ Show real-time vote updates as other users vote.
○ Indicate that the user has already voted and prevent re-voting.
○ Implement a countdown timer where voting ends after 60 seconds and room is
disabled for voting.
○ Use local storage to persist the user's vote across page refreshes.
2. Backend (NodeJS + WebSocket)
○ Handle creation and storage of poll rooms.
○ Accept and broadcast votes to all clients in the room.
○ Keep poll state in memory (no database required).
○ Support multiple rooms with different users.

### Vote State Sharing and Room Management
In this application, when a user creates a new room, a unique roomCode is generated and displayed on the page. Other users can join the same room by entering the roomCode on their screen. Once in the room, all users are able to vote on a poll question in real time. The vote state, which includes the count for each option, is shared across all users in the room. The backend manages the vote state and a countdown timer using WebSockets, ensuring that as users vote, the vote counts are updated and broadcast to all participants in real time. The countdown timer starts once the first user joins, and voting is disabled after 60 seconds. This structure ensures that all users in the same room are synchronized and can see the poll’s results live as other users vote.

Thankyou
