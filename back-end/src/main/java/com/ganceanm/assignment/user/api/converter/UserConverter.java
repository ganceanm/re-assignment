package com.ganceanm.assignment.user.api.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.user.api.message.UserMsg;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.service.UserService;

@Component
public class UserConverter {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProfileConverter profileConverter;
	
	public UserMsg toMsg(User from) {
		UserMsg to = new UserMsg();
		
		to.setId(from.getId());
		to.setUserName(from.getUserName());
		to.setStatus(from.getStatus());
		to.setUserRole(from.getUserRole());
		
		to.setProfile(profileConverter.toMsg(from.getProfile(), from.getUserRole()));
		
		return to;
	}
	
	public User toEntity(UserMsg from) throws UserNotFoundException{
		User to = userService.getById(from.getId());
		
		if(to.getId() == null) {
			throw new UserNotFoundException();
		} else {
			to.setUserName(from.getUserName());
			to.setProfile(profileConverter.toEntity(from.getProfile()));
		}
		
		return to;
	}
}
