package com.ganceanm.assignment.user.api.message;

import com.ganceanm.assignment.user.model.UserRole;
import com.ganceanm.assignment.user.model.UserStatus;

public class UserMsg {
	private Long id;

	private String userName;

	private UserRole userRole;

	private UserStatus status;
	
	private String firstName;
	
	private String lastName;
	
	private String phoneNumber;
	
	private ProfileMsg profile;
	
	
	
	
	public ProfileMsg getProfile() {
		return profile;
	}

	public void setProfile(ProfileMsg profile) {
		this.profile = profile;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}


	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public UserStatus getStatus() {
		return status;
	}

	public void setStatus(UserStatus status) {
		this.status = status;
	}

}
