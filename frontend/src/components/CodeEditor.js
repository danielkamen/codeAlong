import React, { useState, useEffect } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const CodeEditor = ({ sessionId }) => {
  const [code, setCode] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/code', (message) => {
        const { code: newCode } = JSON.parse(message.body);
        setCode(newCode);
      });

      client.send('/app/codeUpdate', {}, JSON.stringify({ sessionId, code }));
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
