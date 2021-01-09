package com.ganceanm.assignment.aplication.api;

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

import com.ganceanm.assignment.aplication.api.message.SubmitAplicationMsg;
import com.ganceanm.assignment.aplication.api.message.UpdateAplicationMsg;
import com.ganceanm.assignment.aplication.service.AplicationService;
import com.ganceanm.assignment.search.SearchResponse;
import com.ganceanm.assignment.search.SearchResponseConverter;
import com.ganceanm.assignment.security.clearance.ClearanceOne;
import com.ganceanm.assignment.security.clearance.ClearanceZero;
import com.ganceanm.assignment.security.model.AuthenticatedUser;

@RestController
@RequestMapping("/aplications")
public class AplicationController {
	@Autowired
	private AplicationService aplicationService;

	@Autowired
	private SearchResponseConverter searchResponseConverter;

	@Autowired
	private AuthenticatedUser authenticatedUser;
	
	@ClearanceZero
	@GetMapping
	public SearchResponse findByUser(
			@RequestParam(defaultValue = "1") int page, 
			@RequestParam(defaultValue = "15") int limit) {
		return searchResponseConverter.toMsg(aplicationService.find(page, limit, authenticatedUser.getUser()));
	}

	@ClearanceZero
	@PostMapping
	public ResponseEntity<HttpStatus> submitAplication(@Valid @RequestBody SubmitAplicationMsg msg) {
		return aplicationService.submitAplication(msg.getApplicantId(), msg.getInternshipId());
	}

	@ClearanceOne
	@PutMapping
	public ResponseEntity<HttpStatus> updateStatus(@Valid @RequestBody UpdateAplicationMsg msg) {
		return aplicationService.updateAplication(msg.getId(), msg.getStatus());
	}

	@ClearanceZero
	@DeleteMapping("/{aplicationId}")
	public ResponseEntity<HttpStatus> cancelAplication(@PathVariable("aplicationId") Long aplicationId) {
		return aplicationService.cancelAplication(aplicationId);
	}
}
