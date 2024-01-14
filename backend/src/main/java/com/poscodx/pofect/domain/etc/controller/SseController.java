package com.poscodx.pofect.domain.etc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/alert")
public class SseController {

    private final List<SseEmitter> emitters = new ArrayList<>();

    @GetMapping("/events")
    public SseEmitter handleSse() {
        SseEmitter emitter = new SseEmitter();

        emitters.add(emitter);

        emitter.onCompletion(() -> {
            emitters.remove(emitter);
            //sendAlert("Result","Connection closed");
        });
        emitter.onTimeout(() -> {
            emitters.remove(emitter);
            //sendAlert("Result","Connection timed out");
        });

        return emitter;
    }

    public void sendAlert(String alertHeader, String alertContent) {
        List<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
//                // 현재 시간을 얻음
//                Instant now = Instant.now();
//
//                // 날짜를 특정 포맷의 문자열로 변환
//                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//                String currentTime = dateFormat.format(Date.from(now));
//
//                // 객체를 JSON 문자열로 변환하여 전송
//                String json = "{\"title\": \"" + alertHeader + "\", \"subtitle\": \"" + alertContent + "\", \"date\": \"" + currentTime + "\"}";
//                emitter.send(json);
                // 현재 시간의 타임스탬프를 얻음
                long currentTimestamp = System.currentTimeMillis();

                // 객체를 JSON 문자열로 변환하여 전송
                String json = "{\"title\": \"" + alertHeader + "\", \"subtitle\": \"" + alertContent + "\", \"date\": " + currentTimestamp + "}";
                emitter.send(json);
            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        });

        // Remove dead emitters
        emitters.removeAll(deadEmitters);
    }
}