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
	public ResponseEntity<HttpStatus> submitAplication(User applicant, Long internshipId);
	public Aplication getById(Long aplicationId);
	public Boolean hasUserApplied(User user, Internship internship);
	public Page<Aplication> findMine(int page, int limit, User user);
	public Page<Aplication> find(int page, int limit, User user);
	public Page<Aplication> find(int page, int limit, Internship internship);
	public Page<Aplication> find(int page, int limit, Long internshipId);
	public ResponseEntity<HttpStatus> updateAplication(Long id, String status);
	public ResponseEntity<HttpStatus> cancelAplication(User user, Long aplicationId);
	public ResponseEntity<HttpStatus> promoteAplication(Long aplicationId);
	public ResponseEntity<HttpStatus> rejectAplication(Long aplicationId);
}
