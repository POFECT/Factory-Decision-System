package com.poscodx.pofect.domain.sizestandard.util;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;


@Service
@Transactional(readOnly = true)
public class RestTemplateTest extends CustomRestTemplate {
    private final String factAddress = "localhost:8080";

    public FactoryOrderInfoResDto requestFato(HttpServletRequest request, String userEmailAddress) throws Exception{

        String uri = "/api/users/" + userEmailAddress;
        setUrl(request, uri);

        FactoryOrderInfoResDto userDetail =
                (FactoryOrderInfoResDto) super.exchange(HttpMethod.GET, request,null, FactoryOrderInfoResDto.class);

        if(Objects.isNull(userDetail)){
            System.out.println("nono");
        }

        return userDetail;
    }
    @Override
    protected void setUrl(HttpServletRequest request, String uri) {
        String protocol = "http://";
        String domain = protocol + factAddress;
        this.url = domain + uri;
    }
}
