package com.ganceanm.assignment.security.service;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.security.model.AuthenticationTokenDetails;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class AuthenticationTokenIssuer {

	@Autowired
	private AuthenticationTokenSettings settings;
	
	public String issueToken(AuthenticationTokenDetails details) {
		return Jwts.builder()
				.setId(details.getId())
				.setIssuer(settings.getIssuer())
				.setAudience(settings.getAudience())
				.setSubject(details.getUsername())
				.setIssuedAt(Date.from(details.getIssuedDate().toInstant()))
				.setExpiration(Date.from(details.getExpirationDate().toInstant()))
				.claim(settings.getAuthorityClaimName(), details.getAuthority())
				.claim(settings.getRefreshCountClaimName(), details.getRefreshCount())
				.claim(settings.getRefreshLimitClaimName(), details.getRefreshLimit())
				.signWith(SignatureAlgorithm.HS512, settings.getSecret())
				.compact();
	}
	
}
