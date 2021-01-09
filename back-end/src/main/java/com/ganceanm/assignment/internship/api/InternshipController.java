package com.ganceanm.assignment.internship.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ganceanm.assignment.internship.api.message.PutRoomMsg;
import com.ganceanm.assignment.internship.service.InsernshipService;
import com.ganceanm.assignment.search.SearchResponse;
import com.ganceanm.assignment.search.SearchResponseConverter;
import com.ganceanm.assignment.security.clearance.ClearanceTwo;

@RestController
@RequestMapping("/internship")
public class InternshipController {

	@Autowired
	private InsernshipService internshipService;

	@Autowired
	private SearchResponseConverter searchResponseConverter;
	


	@ClearanceTwo
	@GetMapping
	public SearchResponse find(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "15") int limit,
			@RequestParam(defaultValue = "") String keyword) {
		return searchResponseConverter.toMsg(internshipService.findByString(page, limit, keyword));
	}


	@ClearanceTwo
	@PutMapping
	public ResponseEntity<HttpStatus> put(@Valid @RequestBody PutRoomMsg msg) {
		return internshipService.putInternship(msg.getId(), msg.getBeds(), msg.getUsers());
	}

}
