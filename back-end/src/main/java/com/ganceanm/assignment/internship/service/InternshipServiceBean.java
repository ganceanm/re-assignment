package com.ganceanm.assignment.internship.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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
import com.ganceanm.assignment.internship.model.InternshipSpecification;
import com.ganceanm.assignment.internship.model.InternshipStatus;
import com.ganceanm.assignment.search.SearchCriteria;
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
		return internshipPagingRepository.findByCreator(user, PageRequest.of(page, limit));
	}

	@Override
	public Page<Internship> find(int page, int limit, String keyword, Optional<HashMap<String, ?>> optionals) {
		List<String> keys = new ArrayList<>();
		keys.add("title");
		keys.add("description");

		List<String> text = Arrays.asList(keyword.split(" "));

		InternshipSpecification spec = new InternshipSpecification(new SearchCriteria(keys, ":", text, optionals));

		return internshipPagingRepository.findAll(spec, PageRequest.of(page, limit));
	}

	@Override
	public ResponseEntity<HttpStatus> putInternship(Long id, Internship newi, User user) {
		Internship old = getById(id);
		
		if(Long.compare(old.getCreatedBy().getId(), user.getId()) != 0) {
			return ResponseEntity.badRequest().build();
		}
		
		old.setCategory(newi.getCategory());
		old.setTitle(newi.getTitle());
		old.setDescription(newi.getDescription());
		old.setStartingDate(newi.getStartingDate());
		old.setDuration(newi.getDuration());
		old.setPaid(newi.getPaid());
		old.setLocation(newi.getLocation());
		old.setHoursPerDay(newi.getHoursPerDay());
		
		save(old);
		return ResponseEntity.accepted().build();
	}

	@Override
	public ResponseEntity<HttpStatus> delete(Long id, User user) {
		Internship internship = getById(id);
		
		if(Long.compare(internship.getCreatedBy().getId(), user.getId()) != 0) {
			return ResponseEntity.badRequest().build();
		}
		
		internship.setDeleted(Boolean.TRUE);
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
