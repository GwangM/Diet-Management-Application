package com.fDiary.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FDairyServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FDairyServerApplication.class, args);
    }

}
