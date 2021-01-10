package com.ganceanm.assignment.auth.api.message;

import com.ganceanm.assignment.user.model.UserRole;

public class RegistrationMsg {
	private String email;
	private UserRole userRole;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

}
