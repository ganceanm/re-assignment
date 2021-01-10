package com.ganceanm.assignment.internship.api;

import java.util.HashMap;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ganceanm.assignment.internship.api.converter.InternshipDetailsConverter;
import com.ganceanm.assignment.internship.api.message.InternshipDetailsMsg;
import com.ganceanm.assignment.internship.api.message.PutInternshipMsg;
import com.ganceanm.assignment.internship.service.InternshipService;
import com.ganceanm.assignment.search.SearchResponse;
import com.ganceanm.assignment.search.SearchResponseConverter;
import com.ganceanm.assignment.security.clearance.ClearanceOne;
import com.ganceanm.assignment.security.clearance.ClearanceZero;
import com.ganceanm.assignment.security.model.AuthenticatedUser;

@RestController
@RequestMapping("/internships")
public class InternshipController {

	@Autowired
	private InternshipService internshipService;

	@Autowired
	private SearchResponseConverter searchResponseConverter;
	
	@Autowired
	private InternshipDetailsConverter internshipDetailsConverter;
	
	@Autowired
	private AuthenticatedUser authenticatedUser;
	
	@ClearanceZero
	@GetMapping("/mine")
	public SearchResponse findByUser(
			@RequestParam(defaultValue = "1") int page, 
			@RequestParam(defaultValue = "15") int limit) {
		return searchResponseConverter.toMsg(internshipService.find(page, limit, authenticatedUser.getUser()));
	}
	
	
	
	@ClearanceZero
	@GetMapping("/{id}")
	public InternshipDetailsMsg getInternship(@PathVariable("id") Long id) {
		return internshipDetailsConverter.toMsg(internshipService.getById(id), authenticatedUser.getUser());
	}
	
	@ClearanceOne
	@PostMapping
	public ResponseEntity<HttpStatus> createInternship(@Valid @RequestBody InternshipDetailsMsg msg) {
		return internshipService.create(internshipDetailsConverter.toEntity(msg), authenticatedUser.getUser());
	}

	@ClearanceZero
	@GetMapping
	public SearchResponse find(
			@RequestParam(defaultValue = "0") int page, 
			@RequestParam(defaultValue = "15") int limit,
			@RequestParam(defaultValue = "") String keyword, // title or description contains this
			@RequestParam Optional<String> orderby, 
			@RequestParam Optional<String> dir,
			@RequestParam Optional<String> category,
			@RequestParam Optional<String> location,
			@RequestParam Optional<String> paid) {
		HashMap<String, String> optionals = new HashMap<>();

		if (orderby.isPresent()) {
			optionals.put("orderby", orderby.get());
		}
		if (dir.isPresent()) {
			optionals.put("dir", dir.get());
		}
		if (category.isPresent()) {
			optionals.put("category", category.get());
		}
		if (location.isPresent()) {
			optionals.put("location", location.get());
		}
		if (paid.isPresent()) {
			optionals.put("paid", paid.get());
		}
		return searchResponseConverter.toMsg(internshipService.find(page, limit, keyword, Optional.ofNullable(optionals)));
	}


	@ClearanceOne
	@PutMapping
	public ResponseEntity<HttpStatus> put(@Valid @RequestBody InternshipDetailsMsg msg) {
		return internshipService.putInternship(msg.getId(), internshipDetailsConverter.toEntity(msg), authenticatedUser.getUser());
	}
	
	@ClearanceZero
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteInternship(@PathVariable("id") Long id) {
		return internshipService.delete((id), authenticatedUser.getUser());
	}

}
