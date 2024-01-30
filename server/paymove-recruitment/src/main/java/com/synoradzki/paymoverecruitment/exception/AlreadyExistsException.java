package com.synoradzki.paymoverecruitment.exception;

public class AlreadyExistsException extends Exception {

    public AlreadyExistsException(String resourceName) {
        super(String.format("%s already exists in database", resourceName));
    }
}