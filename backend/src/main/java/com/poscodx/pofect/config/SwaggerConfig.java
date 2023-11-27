package app.bada.flower.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebMvc
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .apiInfo(apiInfo())
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("app.bada.flower.api.controller"))
                .paths(PathSelectors.any())
                .build()
                .enable(true);
    }

    private SecurityContext securityContext(){
        return springfox.documentation.spi.service.contexts.SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }

    private List<SecurityReference> defaultAuth(){
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("X-AUTH-TOKEN", authorizationScopes));
    }

    private ApiKey apiKey() {
        return new ApiKey("X-AUTH-TOKEN", "Bearer", "header");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("꽃바다 API")
                .description("꽃바다 관련 API 테스트 상세소개 및 사용법")
                .version("0.0.1")
                .contact(new Contact("flowerbada", "flowerbada.app", "wendy0301666@gmail.com"))
                .build();
    }

}

/*
http://localhost:8080/api/v1/swagger-ui/index.html#/
 */