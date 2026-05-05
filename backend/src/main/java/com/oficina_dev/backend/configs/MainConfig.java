package com.oficina_dev.backend.configs;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("main")
public class MainConfig implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
    }
}