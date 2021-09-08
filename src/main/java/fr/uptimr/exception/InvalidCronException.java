package fr.uptimr.exception;

import io.smallrye.graphql.api.ErrorCode;

@ErrorCode("invalid-cron-exception")
public class InvalidCronException extends Exception {
    public InvalidCronException(String message) {
        super(message);
    }
}
