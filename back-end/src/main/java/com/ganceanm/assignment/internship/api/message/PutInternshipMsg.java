package com.ganceanm.assignment.internship.api.message;

import java.util.List;

public class PutInternshipMsg {
	Long id;
	int beds;
	List<Long> users;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getBeds() {
		return beds;
	}

	public void setBeds(int beds) {
		this.beds = beds;
	}

	public List<Long> getUsers() {
		return users;
	}

	public void setUsers(List<Long> users) {
		this.users = users;
	}

}
