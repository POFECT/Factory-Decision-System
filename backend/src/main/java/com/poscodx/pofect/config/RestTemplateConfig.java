package com.poscodx.pofect.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class RestTemplateConfig {
    private final ObjectMapper objectMapper;

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(getBufferingClientHttpRequestFactory());
        restTemplate.getMessageConverters().stream()
            .filter(messageConverter -> messageConverter instanceof MappingJackson2HttpMessageConverter)
            .forEach(messageConverter -> ((MappingJackson2HttpMessageConverter) messageConverter).setObjectMapper(
                objectMapper));
        restTemplate.setInterceptors(getInterceptors());
        restTemplate.setErrorHandler(getEmptyResponseErrorHandler());
        return restTemplate;
    }

    private List<ClientHttpRequestInterceptor> getInterceptors() {
        return Arrays.asList(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest request, byte[] body,
                                                ClientHttpRequestExecution execution) throws IOException {
                ClientHttpResponse response = execution.execute(request, body);
                return response;
            }
        });
    }

    private BufferingClientHttpRequestFactory getBufferingClientHttpRequestFactory() {
        HttpComponentsClientHttpRequestFactory httpComponentsClientHttpRequestFactory =
            new HttpComponentsClientHttpRequestFactory();
        httpComponentsClientHttpRequestFactory.setConnectTimeout(1000);
        httpComponentsClientHttpRequestFactory.setReadTimeout(30000);
        return new BufferingClientHttpRequestFactory(httpComponentsClientHttpRequestFactory);
    }

    private ResponseErrorHandler getEmptyResponseErrorHandler() {
        return new ResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse clientHttpResponse) {
                return false;
            }

            @Override
            public void handleError(ClientHttpResponse clientHttpResponse) {

            }
        };
    }
}