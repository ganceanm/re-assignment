package com.ganceanm.assignment.user.api.converter;

import org.springframework.stereotype.Component;

import com.ganceanm.assignment.user.api.message.SimpleUserMsg;
import com.ganceanm.assignment.user.model.User;

@Component
public class SimpleUserConverter {
	public SimpleUserMsg toMsg(User from) {
		SimpleUserMsg to = new SimpleUserMsg();
		
		to.setUserId(from.getId());
		
		to.setFirstName(from.getFirstName());
		
		to.setLastName(from.getLastName());
		
		return to;
	}
}
