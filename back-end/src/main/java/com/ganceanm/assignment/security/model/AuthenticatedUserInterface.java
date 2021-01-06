package com.ganceanm.assignment.security.model;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import com.ganceanm.assignment.user.model.User;

public interface AuthenticatedUserInterface {
	Authentication getAuthentication();
	UserDetails getPrincipal();
	User getUser();
}
