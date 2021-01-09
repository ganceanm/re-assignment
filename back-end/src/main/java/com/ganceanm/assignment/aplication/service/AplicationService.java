package com.ganceanm.assignment.aplication.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ganceanm.assignment.aplication.model.Aplication;
import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.user.model.User;


public interface AplicationService {
	public Aplication save(Aplication aplication);
	public List<Aplication> getAll();
	public ResponseEntity<HttpStatus> submitAplication(Long applicantId, Long internshipId);
	public Aplication getById(Long aplicationId);
	public Page<Aplication> find(int page, int limit, User user);
	public Page<Aplication> find(int page, int limit, Internship internship);
	public ResponseEntity<HttpStatus> updateAplication(Long id, String status);
	public ResponseEntity<HttpStatus> cancelAplication(Long aplicationId);
}
