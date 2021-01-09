package com.ganceanm.assignment.internship.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.user.model.User;

public interface InternshipService {
	public Internship save(Internship room);
	public List<Internship> getAll();
	public ResponseEntity<HttpStatus> create(Internship internship, User users);
	public Internship getById(Long roomId);
	public Page<Internship> find(int page, int limit, User user);
	public ResponseEntity<HttpStatus> putInternship(Long id, int beds, List<Long> users);
}
