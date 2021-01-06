package com.ganceanm.assignment.auth.api.converter;

import org.springframework.stereotype.Component;

import com.ganceanm.assignment.auth.api.message.RegistrationMsg;
import com.ganceanm.assignment.user.model.User;

@Component
public class RegistrationConverter {

	public User toEntity(RegistrationMsg from) {
		User to = new User();

		to.setUserName(from.getEmail());
		to.setFirstName(from.getFirstName());
		to.setLastName(from.getLastName());
		to.setUserRole(from.getUserRole());
		to.setPhoneNumber(from.getPhoneNumber());
		
		return to;
	}
}
