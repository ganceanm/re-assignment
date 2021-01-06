package com.ganceanm.assignment.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.auth.service.AuthService;
import com.ganceanm.assignment.aux.exception.security.TokenExpiredException;

@Component
public class AuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

	@Autowired
	AuthService authService;

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {

	}

	@Override
	protected UserDetails retrieveUser(String token, UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {

		try {
			return authService.authByToken(token);
		} catch (TokenExpiredException e) {
			return new User("null", "null", false, false, false, false,
					AuthorityUtils.createAuthorityList("null"));
		}

	}
}