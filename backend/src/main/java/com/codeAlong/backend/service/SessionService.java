package com.codeAlong.backend.service;

import com.codeAlong.backend.model.Session;
import com.codeAlong.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SessionService {
    @Autowired
    private SessionRepository sessionRepository;

    public String createSession() {
        String sessionId = generateUniqueSessionId();
        Session session = new Session();
        session.setSessionId(sessionId);
        session.setCode("");
        sessionRepository.save(session);
        return sessionId;
    }

    public Optional<Session> joinSession(String sessionId) {
        return sessionRepository.findBySessionId(sessionId);
    }

    public void updateCode(String sessionId, String code) {
        Optional<Session> sessionOptional = sessionRepository.findBySessionId(sessionId);
        if (sessionOptional.isPresent()) {
            Session session = sessionOptional.get();
            session.setCode(code);
            sessionRepository.save(session);
        }
    }

    public String getCode(String sessionId) {
        Optional<Session> sessionOptional = sessionRepository.findBySessionId(sessionId);
        return sessionOptional.map(Session::getCode).orElse("");
    }

    private String generateUniqueSessionId() {
        String sessionId;
        do {
            sessionId = UUID.randomUUID().toString();
        } while (sessionRepository.findBySessionId(sessionId).isPresent());
        return sessionId;
    }
}
