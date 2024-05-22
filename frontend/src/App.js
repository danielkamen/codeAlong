import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import CreateSession from './components/CreateSession';
import JoinSession from './components/JoinSession';
import CodeEditor from './components/CodeEditor';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

const Home = ({ onSessionCreated, onSessionJoined }) => (
  <div>
    <h1>Code Along Site</h1>
    <nav>
      <a href="/register">Register</a> | <a href="/login">Login</a>
    </nav>
    <CreateSession onSessionCreated={onSessionCreated} />
    <JoinSession onSessionJoined={onSessionJoined} />
  </div>
);


const Session = () => {
  const { sessionId } = useParams();
  return (
    <div>
      <CodeEditor sessionId={sessionId} />
      <p>Session ID: {sessionId}</p>
    </div>
  );
};

const HomeWrapper = () => {
  const navigate = useNavigate();

  const handleSessionCreated = (id) => {
    navigate(`/${id}`);
  };

  const handleSessionJoined = (id) => {
    navigate(`/${id}`);
  };

  return <Home onSessionCreated={handleSessionCreated} onSessionJoined={handleSessionJoined} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:sessionId" element={<Session />} />
      </Routes>
    </Router>
  );
};

export default App;
