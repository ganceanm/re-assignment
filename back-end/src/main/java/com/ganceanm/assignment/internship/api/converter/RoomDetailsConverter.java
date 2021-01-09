package com.ganceanm.assignment.internship.api.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.internship.api.message.InternshipDetailsMsg;
import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.user.api.converter.SimpleUserConverter;
import com.ganceanm.assignment.user.api.message.SimpleUserMsg;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.service.UserService;

@Component
public class RoomDetailsConverter {
	
	@Autowired
	SimpleUserConverter userConverter;
	
	@Autowired
	UserService usersService;
	
	public InternshipDetailsMsg toMsg(Internship from) {
		InternshipDetailsMsg to = new InternshipDetailsMsg();
		
		to.setId(from.getId());
		to.setCategory(from.getCategory().toString());
//		to.setCreatedBy(from.getCreatedBy());
		to.setCreatedAt(from.getCreatedAt().toString());
		to.setDescription(from.getDescription());
		to.setTitle(from.getTitle());
		
		return to;
	}
}
