package com.ganceanm.assignment.security.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.aux.exception.WrongUserNameException;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.service.UserService;

@Component
public class AuthenticatedUser  implements AuthenticatedUserInterface {
	
	@Autowired
	UserService usersService;
	
    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

	@Override
	public UserDetails getPrincipal() {
		return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

	@Override
	public User getUser() {
		try {
			return usersService.getByUserName(getAuthentication().getName());
		} catch (WrongUserNameException e) {
			e.printStackTrace();
		}
		return null;
	}
}
