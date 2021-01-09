package com.ganceanm.assignment.internship.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.internship.model.InternshipCategory;
import com.ganceanm.assignment.internship.model.InternshipPagingRepository;
import com.ganceanm.assignment.internship.model.InternshipRepository;
import com.ganceanm.assignment.internship.model.InternshipStatus;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.model.UserRole;
import com.ganceanm.assignment.user.service.UserService;

@Service
public class InternshipServiceBean implements InternshipService {

	@Autowired
	private InternshipRepository internshipRepository;
	
	@Autowired
	private InternshipPagingRepository internshipPagingRepository;


	@Autowired
	private UserService usersService;

	@Override
	public Internship save(Internship internship) {
		if (internship.getId() == null) {
			internship.setCreatedAt(new Date());
		}

		internship.setModifiedAt(new Date());

		return internshipRepository.save(internship);
	}

	@Override
	public Internship getById(Long internshipId) {
		return internshipRepository.getOne(internshipId);
	}

	
	@Override
	public List<Internship> getAll() {
		return internshipRepository.findAll();
	}

	@Override
	public Page<Internship> find(int page, int limit, User user) {
		return	internshipPagingRepository.findByCreator(user, PageRequest.of(page, limit));
	}
	
	@Override
	public ResponseEntity<HttpStatus> putInternship(Long id, int beds, List<Long> users) {
		Internship internship = getById(id);

		//TODO: add content
			save(internship);
			return ResponseEntity.accepted().build();
		}

	@Override
	public ResponseEntity<HttpStatus> create(Internship internship, User user) {
		
		internship.setCreatedBy(user);
		internship.setStatus(InternshipStatus.ACTIVE);
		
		save(internship);
		return ResponseEntity.accepted().build();
	}
	}

