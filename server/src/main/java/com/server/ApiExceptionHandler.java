package com.server;

import com.server.controller.AddMovieController;
import com.server.controller.MemberController;
import com.server.exception.ErrorCode;
import com.server.exception.ErrorException;
import com.server.exception.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = {
        MemberController.class, AddMovieController.class
})
public class ApiExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> catchException(ErrorException ex) {
        ErrorCode errorCode = ex.getErrorCode();
        return ResponseEntity
                .status(errorCode.getStatus())
                .body(ErrorResponse.of(errorCode));
    }
}
