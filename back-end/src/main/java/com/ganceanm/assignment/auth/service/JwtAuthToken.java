package com.ganceanm.assignment.auth.service;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class JwtAuthToken extends UsernamePasswordAuthenticationToken {


    /**
	 * 
	 */
	private static final long serialVersionUID = -3693444758576003554L;
	private String token;

    public JwtAuthToken(String token) {
        super(null, null);
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }
}
