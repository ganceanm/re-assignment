package com.ganceanm.assignment.user.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ganceanm.assignment.helpers.exception.NotUniqueUserNameException;
import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.search.SearchResponse;
import com.ganceanm.assignment.search.SearchResponseConverter;
import com.ganceanm.assignment.security.clearance.ClearanceTwo;
import com.ganceanm.assignment.security.clearance.ClearanceZero;
import com.ganceanm.assignment.security.model.AuthenticatedUser;
import com.ganceanm.assignment.user.api.converter.ProfileConverter;
import com.ganceanm.assignment.user.api.converter.UserConverter;
import com.ganceanm.assignment.user.api.message.ProfileMsg;
import com.ganceanm.assignment.user.api.message.UserMsg;
import com.ganceanm.assignment.user.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticatedUser authenticatedUser;
	
	@Autowired
	private UserConverter userConverter;
	
	
	@Autowired
	private ProfileConverter profileConverter;
	
	
	
	@ClearanceZero
	@GetMapping("/me")
	public UserMsg getMe() {
		return userConverter.toMsg(authenticatedUser.getUser());
	}
		
		
	@ClearanceZero
	@GetMapping("/{userId}")
	public UserMsg getUser(@PathVariable("userId") Long userId) {
		return userConverter.toMsg(userService.getById(userId));
	}
		
	@ClearanceZero
	@PutMapping("/profile")
	public ResponseEntity<HttpStatus> put(@Valid @RequestBody ProfileMsg userMsg) {
		return userService.updateProfile(profileConverter.toEntity(userMsg), authenticatedUser.getUser());
	}
	
	@ClearanceZero
	@DeleteMapping("/{userId}")
	public ResponseEntity<HttpStatus> delete(@PathVariable("userId") Long userId) {
		return userService.deleteUser(userId);
	}
}
