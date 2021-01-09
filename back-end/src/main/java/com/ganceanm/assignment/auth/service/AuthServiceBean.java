package com.ganceanm.assignment.auth.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import com.ganceanm.assignment.helpers.exception.InactiveUserException;
import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.helpers.exception.WrongPasswordException;
import com.ganceanm.assignment.helpers.exception.WrongUserNameException;
import com.ganceanm.assignment.helpers.exception.security.TokenExpiredException;
import com.ganceanm.assignment.helpers.exception.security.TokenMalformedException;
import com.ganceanm.assignment.security.model.AuthenticationTokenDetails;
import com.ganceanm.assignment.security.service.AuthenticationTokenService;
import com.ganceanm.assignment.security.service.PasswordEncoder;
import com.ganceanm.assignment.security.service.UsernamePasswordValidator;
import com.ganceanm.assignment.services.email.EmailService;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.model.UserStatus;
import com.ganceanm.assignment.user.service.UserService;

@Service
public class AuthServiceBean implements AuthService {

	@Autowired
	private UserService usersService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UsernamePasswordValidator usernamePasswordValidator;

	@Autowired
	private AuthenticationTokenService authTokenService;

	@Autowired
	private EmailService emailService;

	@Override
	public String authByPassword(String userName, String password)
			throws WrongUserNameException, WrongPasswordException, InactiveUserException {
		try {
			com.ganceanm.assignment.user.model.User user = usernamePasswordValidator.validateCredentials(userName, password);

			return authTokenService.issueToken(userName, user.getUserRole());

		} catch (WrongUserNameException | WrongPasswordException | InactiveUserException e) {
			throw e;
		}
	}

	@Override
	public org.springframework.security.core.userdetails.User authByToken(String token) throws TokenExpiredException {
		AuthenticationTokenDetails tokenDetails = null;
		try {

			tokenDetails = authTokenService.parseToken(token);

			User user = usersService.getByUserName(tokenDetails.getUsername());

			return new org.springframework.security.core.userdetails.User(
					user.getUserName(), user.getPassword(), true, true, true, true,
					AuthorityUtils.createAuthorityList(user.getUserRole().toString()));

		} catch (TokenMalformedException | WrongUserNameException e1) {
			throw new TokenExpiredException();
		} catch (TokenExpiredException e2) {
			throw e2;
		}
	}

	@Override
	public ResponseEntity<?> setPassword(String token, String password) {
		try {
			User u = usersService.getByResetToken(token);

			u.setPassword(passwordEncoder.encodePassword(password));
			u.setStatus(UserStatus.Active);
			u.setResetToken(null);
			usersService.save(u);
			return ResponseEntity.ok().build();
		} catch (UserNotFoundException e) {
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<?> resetPassword(String userName) {
		try {
			User u = usersService.getByUserName(userName);
			u.setResetToken(UUID.randomUUID().toString());

			String url = "http://localhost:3000/#/setpassword/" + u.getResetToken();

			StringBuilder emailText = new StringBuilder("");
			emailText.append("Hello ").append(u.getFirstName()).append(" ").append(u.getLastName()).append("!\n")
					.append("To reset your password click on the following link:\n").append(url);

			emailService.sendEmail(u.getUserName(), "Reset password", emailText.toString());

			usersService.save(u);
			return ResponseEntity.ok().build();
		} catch (WrongUserNameException e) {
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
