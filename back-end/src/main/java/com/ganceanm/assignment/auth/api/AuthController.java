package com.ganceanm.assignment.auth.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ganceanm.assignment.auth.api.message.AuthMsg;
import com.ganceanm.assignment.auth.api.message.RegistrationMsg;
import com.ganceanm.assignment.auth.api.message.SetPasswordMsg;
import com.ganceanm.assignment.auth.service.AuthService;
import com.ganceanm.assignment.helpers.exception.InactiveUserException;
import com.ganceanm.assignment.helpers.exception.NotUniqueUserNameException;
import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.helpers.exception.WrongPasswordException;
import com.ganceanm.assignment.helpers.exception.WrongUserNameException;
import com.ganceanm.assignment.auth.api.converter.RegistrationConverter;
import com.ganceanm.assignment.user.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@Autowired
	private UserService usersService;
	
	@Autowired
	private RegistrationConverter registrationConverter;

	@PostMapping("/login")
	public ResponseEntity<String> login(@Valid @RequestBody AuthMsg authMsg) {
		try {
			String token = authService.authByPassword(authMsg.getUserName(), authMsg.getPassword());
			return ResponseEntity.ok(token);
		} catch (WrongUserNameException e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
		} catch (WrongPasswordException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} catch (InactiveUserException e) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
		}
	}

	@PostMapping("/registration")
	public ResponseEntity<?> register(@Valid @RequestBody RegistrationMsg registrationMsg) {
		try {
			return usersService.createUser(registrationConverter.toEntity(registrationMsg));
		} catch (NotUniqueUserNameException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}

	@PostMapping("/setpassword")
	public ResponseEntity<?> setpassword(@Valid @RequestBody SetPasswordMsg setPasswordMsg) {
		return authService.setPassword(setPasswordMsg.getToken(), setPasswordMsg.getPassword());
	}

	@GetMapping("/verifyresetable/{token}")
	public ResponseEntity<?> verifyresetable(@PathVariable("token") String token) {
		try {
			usersService.getByResetToken(token);
			return ResponseEntity.ok().build();
		} catch (UserNotFoundException e) {
			return ResponseEntity.noContent().build();
		}
	}

	@PostMapping("/resetpassword")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody AuthMsg authMsg) {
		return authService.resetPassword(authMsg.getUserName());
	}
}
