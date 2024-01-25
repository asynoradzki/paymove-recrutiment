package com.synoradzki.paymoverecruitment.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.FORBIDDEN)
public class AlreadyExistsException extends RuntimeException {

    public AlreadyExistsException(String resourceName) {
        super(String.format("%s already exists in database", resourceName));
    }
}