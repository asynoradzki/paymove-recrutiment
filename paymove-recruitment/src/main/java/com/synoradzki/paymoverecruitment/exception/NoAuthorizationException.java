package com.synoradzki.paymoverecruitment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class NoAuthorizationException extends Exception{
    public NoAuthorizationException(String message) {
        super(message);
    }
}