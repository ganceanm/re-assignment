package com.ganceanm.assignment.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.helpers.exception.InactiveUserException;
import com.ganceanm.assignment.helpers.exception.WrongPasswordException;
import com.ganceanm.assignment.helpers.exception.WrongUserNameException;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.model.UserStatus;
import com.ganceanm.assignment.user.service.UserService;

@Component
public class UsernamePasswordValidator {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserService usersService;

	public User validateCredentials(String userName, String password)
			throws WrongUserNameException, WrongPasswordException, InactiveUserException {
		try {
			User user = usersService.getByUserName(userName);

			if(user.getStatus() == UserStatus.Inactive) {
				throw new InactiveUserException();
			}
			
			if (!passwordEncoder.checkPassword(user, password)) {
				throw new WrongPasswordException();
			}
			
			return user;
		} catch (WrongUserNameException e) {
			throw new WrongUserNameException();
		}
	}
}
