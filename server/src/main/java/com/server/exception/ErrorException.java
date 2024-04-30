package com.server.exception;

import lombok.Getter;

@Getter
public class ErrorException extends RuntimeException {
    private ErrorCode errorCode;

    private ErrorException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public static ErrorException type(ErrorCode errorCode) {
        return new ErrorException(errorCode);
    }
}
