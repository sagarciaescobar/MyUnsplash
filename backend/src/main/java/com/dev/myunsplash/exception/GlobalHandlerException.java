package com.dev.myunsplash.exception;

import lombok.extern.log4j.Log4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
@Log4j
public class GlobalHandlerException {

    //@ExceptionHandler(Exception.class)
    //    public ResponseEntity<?> allErrors(Exception ex, WebRequest req){
    //    System.out.println(ex);
    //    return new ResponseEntity<>("Error: " + ex.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    //}
}
