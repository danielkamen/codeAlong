import React, { useState } from 'react';
import axios from 'axios';

const JoinSession = ({ onSessionJoined }) => {
  const [sessionId, setSessionId] = useState('');

  const joinSession = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/session/join?sessionId=${sessionId}`);
      if (response.status === 200) {
        onSessionJoined(sessionId);
      } else {
        console.error('Session not found');
      }
    } catch (error) {
      console.error('Error joining session:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        placeholder="Enter Session ID"
      />
      <button onClick={joinSession}>Join Session</button>
    </div>
  );
};

export default JoinSession;
