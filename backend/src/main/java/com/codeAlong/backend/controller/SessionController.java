package com.codeAlong.backend.controller;

import com.codeAlong.backend.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
public class SessionController {
    @Autowired
    private SessionService sessionService;

    @PostMapping("/create")
    public ResponseEntity<String> createSession() {
        String sessionId = sessionService.createSession();
        return ResponseEntity.ok(sessionId);
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinSession(@RequestParam String sessionId) {
        return sessionService.joinSession(sessionId).isPresent()
                ? ResponseEntity.ok("Session joined")
                : ResponseEntity.status(404).body("Session not found");
    }

    @PostMapping("/update")
    public ResponseEntity<Void> updateCode(@RequestParam String sessionId, @RequestParam String code) {
        sessionService.updateCode(sessionId, code);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/code")
    public ResponseEntity<String> getCode(@RequestParam String sessionId) {
        String code = sessionService.getCode(sessionId);
        return code != null ? ResponseEntity.ok(code) : ResponseEntity.status(404).build();
    }
}
