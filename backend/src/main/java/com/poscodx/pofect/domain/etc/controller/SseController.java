package com.poscodx.pofect.domain.etc.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/alert")
public class SseController {

    private final List<SseEmitter> emitters = new ArrayList<>();

    public SseEmitter handleSse() {
        SseEmitter emitter = new SseEmitter();

        emitters.add(emitter);

        emitter.onCompletion(() -> {
            emitters.remove(emitter);
            sendAlert("Connection closed");
        });
        emitter.onTimeout(() -> {
            emitters.remove(emitter);
            sendAlert("Connection timed out");
        });

        return emitter;
    }

    public void sendAlert(String eventData) {
        List<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                emitter.send(eventData);
            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        });

        // Remove dead emitters
        emitters.removeAll(deadEmitters);
    }
}