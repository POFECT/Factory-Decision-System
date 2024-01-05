package com.poscodx.pofect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class PofectApplication {

	public static void main(String[] args) {
		SpringApplication.run(PofectApplication.class, args);
	}

}
