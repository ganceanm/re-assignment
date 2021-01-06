package com.ganceanm.assignment.security.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.user.model.User;

@Component
public class PasswordEncoder {
	
	public String encodePassword(String rawPassword) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.encode(rawPassword);
	}
	
	public boolean checkPassword(User users, String rawPassword) {
		String encodedPassword = users.getPassword();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.matches(rawPassword, encodedPassword);
	}
}
