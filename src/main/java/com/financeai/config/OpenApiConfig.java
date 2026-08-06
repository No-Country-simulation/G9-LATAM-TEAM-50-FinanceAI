package com.financeai.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI financeApi() {

        return new OpenAPI()

                .info(new Info()

                        .title("Finance AI API")

                        .description("Backend del sistema Finance AI")

                        .version("1.0"));

    }

}