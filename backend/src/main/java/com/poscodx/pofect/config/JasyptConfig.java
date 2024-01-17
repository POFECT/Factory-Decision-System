package com.poscodx.pofect.config;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.security.NoSuchAlgorithmException;

public class JasyptConfig {
    @Value("${jasypt.key}")
    private String key;

    @Bean(name = "jasyptStringEncryptor")
    public StringEncryptor stringEncryptor() throws NoSuchAlgorithmException {
        Sha256 sha256 = new Sha256();
        String cryptogram = sha256.encrypt(key + "Idle");
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword(cryptogram);
        config.setAlgorithm("PBEWithMD5AndDES");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setProviderName("SunJCE");
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        return encryptor;

    }
}
