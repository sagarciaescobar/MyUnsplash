package com.dev.myunsplash.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration @EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.dev.myunsplash.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }
    private ApiInfo apiInfo() {
        return new ApiInfo(
                "My UnSplash API",
                "API to share images with my unsplash - devchallenge exercise",
                "API V 1.0",
                "Terms of service",
                new Contact("Sergio Alejandro Garcia", "https://github.com/sagarciaescobar", "sa.garciaescobar@gmail.com"),
                "Attribution-NonCommercial 4.0 International", "https://creativecommons.org/licenses/by-nc/4.0/", Collections.emptyList());
    }
}
