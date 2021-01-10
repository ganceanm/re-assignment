package com.ganceanm.assignment.internship.api.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.aplication.service.AplicationService;
import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.internship.api.message.InternshipDetailsMsg;
import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.internship.model.InternshipCategory;
import com.ganceanm.assignment.user.api.converter.SimpleUserConverter;
import com.ganceanm.assignment.user.api.message.SimpleUserMsg;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.service.UserService;

@Component
public class InternshipDetailsConverter {
	
	@Autowired
	SimpleUserConverter userConverter;
	
	@Autowired
	UserService usersService;
	
	@Autowired
	AplicationService aplicationService;
	
	public InternshipDetailsMsg toMsg(Internship from, User user) {
		InternshipDetailsMsg to = new InternshipDetailsMsg();
		
		to.setId(from.getId());
		to.setCategory(from.getCategory().toString());
//		to.setCreatedBy(from.getCreatedBy());
		to.setCreatedAt(from.getCreatedAt().toString());
		to.setDescription(from.getDescription());
		to.setTitle(from.getTitle());
		to.setStartingDate(from.getStartingDate());
		to.setDuration(from.getDuration());
		to.setPaid(from.getPaid());
		to.setLocation(from.getLocation());
		to.setHoursPerDay(from.getHoursPerDay());
		
		to.setHasApplied(aplicationService.hasUserApplied(user, from));
		return to;
	}
	
	public Internship toEntity(InternshipDetailsMsg from) {
		Internship to = new Internship();
		
		to.setId(from.getId());
		to.setCategory(InternshipCategory.valueOf(from.getCategory()));
		to.setDescription(from.getDescription());
		to.setTitle(from.getTitle());
		to.setStartingDate(from.getStartingDate());
		to.setDuration(from.getDuration());
		to.setPaid(from.getPaid());
		to.setLocation(from.getLocation());
		to.setHoursPerDay(from.getHoursPerDay());
		
		return to;
	}
}
