package com.ganceanm.assignment.auth.service;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;

import com.ganceanm.assignment.helpers.exception.InactiveUserException;
import com.ganceanm.assignment.helpers.exception.WrongPasswordException;
import com.ganceanm.assignment.helpers.exception.WrongUserNameException;
import com.ganceanm.assignment.helpers.exception.security.TokenExpiredException;


public interface AuthService {
	public String authByPassword(String userName, String password) throws WrongUserNameException, WrongPasswordException, InactiveUserException;
	User authByToken(String token) throws TokenExpiredException;
	public ResponseEntity<?> setPassword(String token, String password);
	ResponseEntity<?> resetPassword(String userName);
}
