package com.dev.myunsplash.exception;

import lombok.extern.log4j.Log4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@RestControllerAdvice
@Log4j
public class GlobalHandlerException {

    //@ExceptionHandler(Exception.class)
    //    public ResponseEntity<?> allErrors(Exception ex, WebRequest req){
    //    System.out.println(ex);
    //    return new ResponseEntity<>("Error: " + ex.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    //}

    @ExceptionHandler(NoSuchAImage.class)
    public ResponseEntity<String> notAImage(Exception ex){
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(ex.getMessage());
    }
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public  ResponseEntity<String> maxSizeExceeded(Exception ex){
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(ex.getMessage());
    }
    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<String> badRequestFormat(Exception ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("bad request, part of the params have wrong key or missing one");
    }

    @ExceptionHandler(IdNotFound.class)
    public ResponseEntity<String> notFoundId(Exception ex, WebRequest request){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
