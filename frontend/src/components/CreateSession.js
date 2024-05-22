import React, { useState } from 'react';
import axios from 'axios';

const CreateSession = ({ onSessionCreated }) => {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const createSession = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/session/create');
      setSessionId(response.data);
      onSessionCreated(response.data);
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={createSession} disabled={loading}>
        {loading ? 'Creating Session...' : 'Create Session'}
      </button>
      {sessionId && (
        <div>
          <p>Session ID: {sessionId}</p>
        </div>
      )}
    </div>
  );
};

export default CreateSession;
