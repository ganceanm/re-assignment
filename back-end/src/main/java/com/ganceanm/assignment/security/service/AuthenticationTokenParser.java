package com.ganceanm.assignment.security.service;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.helpers.exception.security.TokenExpiredException;
import com.ganceanm.assignment.helpers.exception.security.TokenMalformedException;
import com.ganceanm.assignment.security.model.AuthenticationTokenDetails;
import com.ganceanm.assignment.user.model.UserRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.InvalidClaimException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class AuthenticationTokenParser {

	@Autowired
	private AuthenticationTokenSettings settings;

	public AuthenticationTokenDetails parseToken(String token) throws TokenExpiredException {
		try {
			Claims claims = Jwts.parser().setSigningKey(settings.getSecret()).requireAudience(settings.getAudience())
					.setAllowedClockSkewSeconds(settings.getClockSkew()).parseClaimsJws(token).getBody();

			return new AuthenticationTokenDetails.Builder().withId(extractTokenIdFromClaims(claims))
					.withUsername(extractUsernameFromClaims(claims)).withAuthorities(extractAuthorityFromClaims(claims))
					.withIssuedDate(extractIssuedDateFromClaims(claims))
					.withExpirationDate(extractExpirationDateFromClaims(claims))
					.withRefreshCount(extractRefreshCountFromClaims(claims))
					.withRefreshLimit(extractRefreshLimitFromClaims(claims)).build();
		} catch (UnsupportedJwtException | MalformedJwtException | SignatureException | InvalidClaimException e) {
			throw new TokenMalformedException("Unsupported token");
		} catch (ExpiredJwtException e) {
            throw new TokenExpiredException();
        }  catch (Exception e) {
            throw new TokenMalformedException("Unsupported token");
        }
	}

	private String extractTokenIdFromClaims(@NotNull Claims claims) {
		return (String) claims.get(Claims.ID);
	}

	private String extractUsernameFromClaims(@NotNull Claims claims) {
		return claims.getSubject();
	}

	private UserRole extractAuthorityFromClaims(@NotNull Claims claims) {
		Object o = claims.getOrDefault(settings.getAuthorityClaimName(), claims);
		if (o.getClass() == String.class) {
			return UserRole.valueOf((String) o);
		} else {
			return (UserRole) o;
		}
	}

	private ZonedDateTime extractIssuedDateFromClaims(@NotNull Claims claims) {
		return ZonedDateTime.ofInstant(claims.getIssuedAt().toInstant(), ZoneId.systemDefault());
	}

	private ZonedDateTime extractExpirationDateFromClaims(@NotNull Claims claims) {
		return ZonedDateTime.ofInstant(claims.getExpiration().toInstant(), ZoneId.systemDefault());
	}

	private int extractRefreshCountFromClaims(@NotNull Claims claims) {
		return (int) claims.get(settings.getRefreshCountClaimName());
	}

	private int extractRefreshLimitFromClaims(@NotNull Claims claims) {
		return (int) claims.get(settings.getRefreshLimitClaimName());
	}
}
