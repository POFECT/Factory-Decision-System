package com.poscodx.pofect.common.resttemplate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;

public abstract class CustomRestTemplate<T> {

    @Autowired
    protected RestTemplate restTemplate;
    protected String url;

    private static final HostnameVerifier PROMISCUOUS_VERIFIER = (s, sslSession) -> true;

    protected Object exchange(
        HttpMethod method,
        HttpServletRequest request,
        T body,
        Class cls
    ) throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        HttpHeaders headers = new HttpHeaders();


        HttpEntity<String> httpEntity;

        restTemplate.setRequestFactory(new SimpleClientHttpRequestFactory() {
            @Override
            protected void prepareConnection(HttpURLConnection connection, String httpMethod) throws IOException {
                if (connection instanceof HttpsURLConnection) {
                    ((HttpsURLConnection) connection).setHostnameVerifier(PROMISCUOUS_VERIFIER);
                }
                super.prepareConnection(connection, httpMethod);
            }
        });

        if (Objects.isNull(body)) {
            httpEntity = new HttpEntity<>(headers);
        } else {
            httpEntity = new HttpEntity(body, headers);
        }

        ResponseEntity<?> responseEntity = restTemplate
            .exchange(url, method, httpEntity, cls);

        return responseEntity.getBody();
    }


    protected Object exchange(
        HttpMethod method,
        T body, Class cls) throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.ACCEPT, MediaType.TEXT_HTML_VALUE);
        headers.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);

        headers.setContentType(MediaType.APPLICATION_JSON);


        HttpEntity<String> httpEntity;

        restTemplate.setRequestFactory(new SimpleClientHttpRequestFactory() {
            @Override
            protected void prepareConnection(HttpURLConnection connection, String httpMethod) throws IOException {
                if (connection instanceof HttpsURLConnection) {
                    ((HttpsURLConnection) connection).setHostnameVerifier(PROMISCUOUS_VERIFIER);
                }
                super.prepareConnection(connection, httpMethod);
            }
        });

        if (Objects.isNull(body)) {
            httpEntity = new HttpEntity<>(headers);
        } else {
            httpEntity = new HttpEntity(body, headers);
        }

        ResponseEntity<?> responseEntity = restTemplate
            .exchange(url, method, httpEntity, cls);

        return responseEntity.getBody();
    }


    protected abstract void setUrl(HttpServletRequest request, String uri);

}
