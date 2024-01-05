package com.poscodx.pofect.common.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.PathNotFoundException;
import com.poscodx.pofect.common.security.dto.JsonResult;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.stereotype.Component;

import com.jayway.jsonpath.JsonPath;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Stream;

@SpringBootConfiguration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, Converter<Jwt, JwtAuthenticationToken> jwtAuthenticationConverter, AccessDeniedHandler accessDeniedHandler, AuthenticationEntryPoint authenticationEntryPoint) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .logout().disable()
                .anonymous().disable()
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> {
                    //acl (Access Control List)
                    authorizationManagerRequestMatcherRegistry
                            // .requestMatchers(new RegexRequestMatcher("^.*swagger.*$", null)).permitAll()
                            // .requestMatchers(new RegexRequestMatcher("^/v3/api\\-docs.*$", null)).permitAll()
                            .requestMatchers(new RegexRequestMatcher("^(.*swagger.*)|(/v3/api\\-docs.*)$", null)).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/user/login/**",null)).permitAll()
                            //.requestMatchers(new RegexRequestMatcher("^/swagger-resources/.*$", null)).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/factory-standard/hello", null)).permitAll()
                            /*.requestMatchers(new AntPathRequestMatcher("/", "GET")).hasRole("READ")
                            .requestMatchers(new RegexRequestMatcher("^\\/(?:[^\\/]+\\/)*\\*\\*\\/$", "POST")).hasRole("WRITE")
                            .requestMatchers(new RegexRequestMatcher("^\\/(?:[^\\/]+\\/)*\\*\\*\\/$", "PUT")).hasRole("WRITE")
                            .requestMatchers(new RegexRequestMatcher("^\\/(?:[^\\/]+\\/)*\\*\\*\\/$", "PATCH")).hasRole("WRITE")
                            .requestMatchers(new RegexRequestMatcher("^\\/(?:[^\\/]+\\/)*\\*\\*\\/$", "DELETE")).hasRole("WRITE")
                            */.anyRequest().denyAll();
                });

        http
                .oauth2ResourceServer(oauth2 -> {
                    oauth2
                            // The oauth2ResourceServer Method will Validate the Bound JWT Token against Keycloak Server
                            .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter))
                            // 403 Access deny, not found 가 나지 않고 (denyAll을 탐) 403에러발생 (정해진 경로가 아닌 다른데로 접근시)
                            .accessDeniedHandler(accessDeniedHandler)
                            // 401: Access token (expired), refresh token expired 권한오류(read만 되는데 write..)
                            .authenticationEntryPoint(authenticationEntryPoint);
                });

        return http.build();
    }
    @Component
    static private class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401(Invalid Token...)
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");

            String json = new ObjectMapper().writeValueAsString(JsonResult.fail("401 Unauthorized"));
            response.getOutputStream().write(json.getBytes("utf-8"));
        }
    }

    @Component
    static private class CustomAccessDeniedHandler implements AccessDeniedHandler{
        @Override
        public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403(Wrong API Endpoint...)
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");

            String json = new ObjectMapper().writeValueAsString(JsonResult.fail("403 Forbidden"));
            response.getOutputStream().write(json.getBytes("utf-8"));
        }
    }

    @Component
    @RequiredArgsConstructor
    static private class JwtAuthenticationConverter implements Converter<Jwt, JwtAuthenticationToken> {

        private final Converter<Jwt, Collection<? extends GrantedAuthority>> jwtGrantedAuthoritiesConverter;

        @Override
        public JwtAuthenticationToken convert(Jwt jwt) {
            final var authorities = jwtGrantedAuthoritiesConverter.convert(jwt);
            final String username = JsonPath.read(jwt.getClaims(), "preferred_username");
            JwtAuthenticationToken token = new JwtAuthenticationToken(jwt, authorities, username);

            System.out.println("authorities:" + authorities);
            System.out.println("username:" + username);
            System.out.println("token:" + token);

            return token;
        }

        @Component
        static private class JwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<? extends GrantedAuthority>> {

            @Override
            @SuppressWarnings({ "rawtypes", "unchecked" })
            public Collection<? extends GrantedAuthority> convert(Jwt jwt) {

                return Stream.of("$.realm_access.roles", "$.resource_access.*.roles").flatMap(claimPaths -> {

                    Object claim = null;

                    try {
                        claim = JsonPath.read(jwt.getClaims(), claimPaths);
                    } catch (PathNotFoundException e) {
                        /* handle nothing */
                    }

                    if (claim == null) {
                        return Stream.empty();
                    }

                    if (claim instanceof String strClaim) {
                        return Stream.of(strClaim.split(","));
                    }

                    if (claim instanceof String[] strClaim) {
                        return Stream.of(strClaim);
                    }

                    if (!Collection.class.isAssignableFrom(claim.getClass())) {
                        return Stream.empty();
                    }

                    final var iter = ((Collection) claim).iterator();

                    if (!iter.hasNext()) {
                        return Stream.empty();
                    }

                    final var firstItem = iter.next();

                    if (firstItem instanceof String) {
                        return (Stream<String>) ((Collection) claim).stream();
                    }

                    if (Collection.class.isAssignableFrom(firstItem.getClass())) {
                        return (Stream<String>) ((Collection) claim).stream()
                                .flatMap(colItem -> ((Collection) colItem).stream()).map(String.class::cast);
                    }

                    return Stream.empty();

                }).map(strAuthority -> {

                    // supporting Spring Securit's Checking Authority "ROLE_" Based.
                    return ("ROLE_" + strAuthority);

                }).map(SimpleGrantedAuthority::new).map(GrantedAuthority.class::cast).toList();
            }
        }
    }

/*    @LoadBalanced
    @Bean
    RestTemplate restTemplte() {
        return new RestTemplate();
    }*/
}
