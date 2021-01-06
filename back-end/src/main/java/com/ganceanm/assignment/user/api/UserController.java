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

import com.ganceanm.assignment.aux.exception.NotUniqueUserNameException;
import com.ganceanm.assignment.aux.exception.UserNotFoundException;
import com.ganceanm.assignment.search.SearchResponse;
import com.ganceanm.assignment.search.SearchResponseConverter;
import com.ganceanm.assignment.security.clearance.ClearanceTwo;
import com.ganceanm.assignment.security.clearance.ClearanceZero;
import com.ganceanm.assignment.security.model.AuthenticatedUser;
import com.ganceanm.assignment.user.api.converter.UserConverter;
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
	private SearchResponseConverter searchResponseConverter;
	
	
	
	@ClearanceZero
	@GetMapping("/me")
	public UserMsg getMe() {
		return userConverter.toMsg(authenticatedUser.getUser());
	}
		
	@ClearanceTwo
	@GetMapping
	public SearchResponse find(
			@RequestParam(defaultValue = "1") int page, 
			@RequestParam(defaultValue = "15") int limit, 
			@RequestParam(defaultValue = "") String keyword,
			@RequestParam(defaultValue = "false") Boolean unassigned) {
		
			return searchResponseConverter.toMsg(userService.findByString(page, limit, keyword));		
	}
	
	@ClearanceZero
	@GetMapping("/{userId}")
	public UserMsg getUser(@PathVariable("userId") Long userId) {
		return userConverter.toMsg(userService.getById(userId));
	}
		
	@ClearanceZero
	@PutMapping
	public ResponseEntity<HttpStatus> put(@Valid @RequestBody UserMsg userMsg) {
		try {
			return userService.putUser(userConverter.toEntity(userMsg));
		} catch (UserNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (NotUniqueUserNameException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
	
	@ClearanceZero
	@DeleteMapping("/{userId}")
	public ResponseEntity<HttpStatus> delete(@PathVariable("userId") Long userId) {
		return userService.deleteUser(userId);
	}
}
