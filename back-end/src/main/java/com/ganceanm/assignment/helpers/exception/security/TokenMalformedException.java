package com.ganceanm.assignment.helpers.exception.security;

import org.springframework.security.core.AuthenticationException;

public class TokenMalformedException extends AuthenticationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3439123380421426177L;

	public TokenMalformedException(String msg) {
		super(msg);
	}
}