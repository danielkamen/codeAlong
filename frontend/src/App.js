import React, { useState } from 'react';
import CreateSession from './components/CreateSession';
import JoinSession from './components/JoinSession';
import CodeEditor from './components/CodeEditor';
import './App.css';

const App = () => {
  const [sessionId, setSessionId] = useState(null);

  const handleSessionCreated = (id) => {
    setSessionId(id);
  };

  const handleSessionJoined = (id) => {
    setSessionId(id);
  };

  if (sessionId) {
    return (
      <div>
        <CodeEditor sessionId={sessionId} />
        <p>Session ID: {sessionId}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Code Along Site</h1>
      <CreateSession onSessionCreated={handleSessionCreated} />
      <JoinSession onSessionJoined={handleSessionJoined} />
    </div>
  );
};

export default App;
