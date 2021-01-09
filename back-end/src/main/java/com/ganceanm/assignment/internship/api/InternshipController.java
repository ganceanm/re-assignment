package com.ganceanm.assignment.internship.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.ganceanm.assignment.security.clearance.ClearanceTwo;
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
	
	@ClearanceOne
	@PostMapping
	public ResponseEntity<HttpStatus> createInternship(@Valid @RequestBody InternshipDetailsMsg msg) {
		return internshipService.create(internshipDetailsConverter.toEntity(msg), authenticatedUser.getUser());
	}

//	@ClearanceTwo
//	@GetMapping
//	public SearchResponse find(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "15") int limit,
//			@RequestParam(defaultValue = "") String keyword) {
//		return searchResponseConverter.toMsg(internshipService.findByString(page, limit, keyword));
//	}


	@ClearanceOne
	@PutMapping
	public ResponseEntity<HttpStatus> put(@Valid @RequestBody PutInternshipMsg msg) {
		return internshipService.putInternship(msg.getId(), msg.getBeds(), msg.getUsers());
	}

}
