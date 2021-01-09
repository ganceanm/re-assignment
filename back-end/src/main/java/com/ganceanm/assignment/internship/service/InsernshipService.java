package com.ganceanm.assignment.internship.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ganceanm.assignment.internship.model.Internship;

public interface InsernshipService {
	public Internship save(Internship room);
	public List<Internship> getAll();
	public Internship getById(Long roomId);
	public Page<Internship> findByString(int page, int limit, String params);
	public ResponseEntity<HttpStatus> putInternship(Long id, int beds, List<Long> users);
}
