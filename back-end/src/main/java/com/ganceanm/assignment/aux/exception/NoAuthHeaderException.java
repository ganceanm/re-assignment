package com.ganceanm.assignment.aux.exception;

import org.springframework.security.core.AuthenticationException;

public class NoAuthHeaderException extends AuthenticationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5633728145794976200L;

	public NoAuthHeaderException(String msg) {
		super(msg);
	}
}
