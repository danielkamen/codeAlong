package com.codeAlong.backend.config;

import com.codeAlong.backend.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Payload;
import org.json.JSONObject;
import org.json.JSONException;

@Controller
public class WebSocketController {

    @Autowired
    private SessionService sessionService;

    @MessageMapping("/codeUpdate")
    @SendTo("/topic/code")
    public String codeUpdate(@Payload String message) {
        // Parse the message to extract sessionId and code
        // Assuming the message is in the format: {"sessionId": "sessionId", "code": "code"}
        try {
            JSONObject jsonMessage = new JSONObject(message);
            String sessionId = jsonMessage.getString("sessionId");
            String code = jsonMessage.getString("code");

            // Update the code in the session
            sessionService.updateCode(sessionId, code);
            return message;
        } catch (JSONException e) {
            e.printStackTrace();
            return "";
        }
    }
}