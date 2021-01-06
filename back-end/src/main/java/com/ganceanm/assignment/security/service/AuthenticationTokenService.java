package com.ganceanm.assignment.security.service;

import java.time.ZonedDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.aux.exception.security.TokenExpiredException;
import com.ganceanm.assignment.security.model.AuthenticationTokenDetails;
import com.ganceanm.assignment.user.model.UserRole;

@Component
public class AuthenticationTokenService {

	@Autowired
	private AuthenticationTokenSettings settings;
	
	@Autowired
	private AuthenticationTokenIssuer tokenIssuer;

	@Autowired
	private AuthenticationTokenParser tokenParser;

	public String issueToken(String username, UserRole authority) {
		
		String id = generateTokenIdentifier();
		ZonedDateTime issuedDate = ZonedDateTime.now();
		ZonedDateTime expirationDate = calculateExpirationDate(issuedDate);
		
		return tokenIssuer.issueToken(new AuthenticationTokenDetails.Builder()
                .withId(id)
                .withUsername(username)
                .withAuthorities(authority)
                .withIssuedDate(issuedDate)
                .withExpirationDate(expirationDate)
                .withRefreshCount(0)
                .withRefreshLimit(settings.getRefreshLimit()).build());
        
	}
	
	public AuthenticationTokenDetails parseToken(String token) throws TokenExpiredException {
		return tokenParser.parseToken(token);
	}

	private ZonedDateTime calculateExpirationDate(ZonedDateTime issuedDate) {
		return issuedDate.plusSeconds(settings.getValidFor());
	}

	private String generateTokenIdentifier() {
		return UUID.randomUUID().toString();
	}
}
