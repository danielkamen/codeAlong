import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CodeEditor = () => {
  const { sessionId } = useParams();
  const [code, setCode] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const fetchExistingCode = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/session/code?sessionId=${sessionId}`);
        if (response.status === 200) {
          setCode(response.data);
        }
      } catch (error) {
        console.error('Error fetching existing code:', error);
      }
    };

    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/code', (message) => {
        const { code: newCode } = JSON.parse(message.body);
        setCode(newCode);
      });

      // Fetch existing code after connecting
      fetchExistingCode();

      client.send('/app/joinSession', {}, JSON.stringify({ sessionId }));
    });

    setStompClient(client);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [sessionId]);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    if (stompClient) {
      stompClient.send('/app/codeUpdate', {}, JSON.stringify({ sessionId, code: newCode }));
    }
  };

  return (
    <textarea
      value={code}
      onChange={handleCodeChange}
      style={{ height: '90vh', width: '100%' }}
    />
  );
};

export default CodeEditor;
