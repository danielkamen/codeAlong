import React, { useState } from 'react';

const JoinSession = ({ onSessionJoined }) => {
  const [sessionId, setSessionId] = useState('');

  const joinSession = () => {
    onSessionJoined(sessionId);
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
