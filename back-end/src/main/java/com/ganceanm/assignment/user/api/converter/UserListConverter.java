package com.ganceanm.assignment.user.api.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ganceanm.assignment.user.api.message.UserSearchMsg;
import com.ganceanm.assignment.user.model.User;

@Component
public class UserListConverter {

	public List<UserSearchMsg> toMsg(List<User> from) {
	    
		List<UserSearchMsg> to = new ArrayList<>();

		for (User u : from) {
			UserSearchMsg usMsg = new UserSearchMsg();
			usMsg.setUserId(u.getId());
			usMsg.setUserName(u.getUserName());
			usMsg.setFirstName(u.getFirstName());
			usMsg.setLastName(u.getLastName());
			usMsg.setUserRole(u.getUserRole());
			usMsg.setStatus(u.getStatus());
			to.add(usMsg);
		}


		return to;
	}
}
