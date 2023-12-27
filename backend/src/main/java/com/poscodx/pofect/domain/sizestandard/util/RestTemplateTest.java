package com.poscodx.pofect.domain.sizestandard.util;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.common.resttemplate.CustomRestTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestTemplateTest extends CustomRestTemplate {
    private final String factAddress = "localhost:8080";

    public ResponseDto requestFato(HttpServletRequest request) throws Exception{

        String uri = "/api/main/1";
        setUrl(request, uri);

        ResponseDto test =
                (ResponseDto) super.exchange(HttpMethod.GET, request,null, ResponseDto.class);

        if(Objects.isNull(test)){
            System.out.println("nono");
        }

        return test;
    }
    @Override
    protected void setUrl(HttpServletRequest request, String uri) {
        String protocol = "http://";
        String domain = protocol + factAddress;
        this.url = domain + uri;
    }
}
