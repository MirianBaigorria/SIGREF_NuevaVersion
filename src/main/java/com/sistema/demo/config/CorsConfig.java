package com.sistema.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Permite CORS en todos los endpoints
                        .allowedOrigins("*")  // Permite cualquier origen (en desarrollo, cambiar esto en producción)
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")  // Métodos permitidos
                        .allowedHeaders("*");  // Permite cualquier header
            }
        };
    }
}
