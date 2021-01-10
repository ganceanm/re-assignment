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
	@PostMapping("/{internshipId}")
	public ResponseEntity<HttpStatus> submitAplication(@PathVariable("internshipId") Long internshipId) {
		return aplicationService.submitAplication(authenticatedUser.getUser(), internshipId);
	}
	
	@ClearanceZero
	@GetMapping("/{internshipId}")
	public SearchResponse findByInternship(
			@RequestParam(defaultValue = "1") int page, 
			@RequestParam(defaultValue = "15") int limit,
			@PathVariable("internshipId") Long internshipId) {
		return searchResponseConverter.toMsg(aplicationService.find(page, limit, internshipId));
	}

	@ClearanceOne
	@PutMapping("/promote/{aplicationId}")
	public ResponseEntity<HttpStatus> promoteAplication(@PathVariable("aplicationId") Long aplicationId) {
		return aplicationService.promoteAplication(aplicationId);
	}
	
	@ClearanceOne
	@PutMapping("/reject/{aplicationId}")
	public ResponseEntity<HttpStatus> rejectAplication(@PathVariable("aplicationId") Long aplicationId) {
		return aplicationService.rejectAplication(aplicationId);
	}

	@ClearanceZero
	@DeleteMapping("/{aplicationId}")
	public ResponseEntity<HttpStatus> cancelAplication(@PathVariable("aplicationId") Long aplicationId) {
		return aplicationService.cancelAplication(authenticatedUser.getUser(), aplicationId);
	}
}
