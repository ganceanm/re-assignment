package com.ganceanm.assignment.aplication.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ganceanm.assignment.aplication.model.Aplication;
import com.ganceanm.assignment.aplication.model.AplicationPagingRepository;
import com.ganceanm.assignment.aplication.model.AplicationRepository;
import com.ganceanm.assignment.aplication.model.AplicationStatus;
import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.internship.service.InternshipService;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.service.UserService;

@Service
public class AplicationServiceBean implements AplicationService {
	@Autowired
	private AplicationRepository aplicationRepository;

	@Autowired
	private AplicationPagingRepository aplicationPagingRepository;

	@Autowired
	private UserService usersService;
	
	@Autowired
	private InternshipService internshipService;

	@Override
	public Aplication save(Aplication aplication) {
		if (aplication.getId() == null) {
			aplication.setCreatedAt(new Date());
		}

		aplication.setModifiedAt(new Date());

		return aplicationRepository.save(aplication);
	}

	@Override
	public Aplication getById(Long internshipId) {
		return aplicationRepository.getOne(internshipId);
	}

	@Override
	public List<Aplication> getAll() {
		return aplicationRepository.findAll();
	}

	@Override
	public Page<Aplication> find(int page, int limit, User user) {
		return aplicationPagingRepository.findByUser(user, PageRequest.of(page, limit));
	}
	
	@Override
	public Page<Aplication> find(int page, int limit, Internship internship) {
		return aplicationPagingRepository.findByInternship(internship, PageRequest.of(page, limit));
	}
	
	@Override
	public Page<Aplication> find(int page, int limit, Long internshipId) {
		Internship internship = internshipService.getById(internshipId);
		return aplicationPagingRepository.findByInternship(internship, PageRequest.of(page, limit));
	}

	@Override
	public Page<Aplication> findMine(int page, int limit, User user) {
		return aplicationPagingRepository.findByUser(user, PageRequest.of(page, limit));
	}
	
	@Override
	public ResponseEntity<HttpStatus> updateAplication(Long id, String status) {
		Aplication aplication = getById(id);

		aplication.setStatus(AplicationStatus.valueOf(status));

		save(aplication);
		return ResponseEntity.accepted().build();
	}

	@Override
	public ResponseEntity<HttpStatus> submitAplication(User applicant, Long internshipId) {
		Aplication aplication = new Aplication();
		
		aplication.setApplicant(applicant);
		aplication.setInternship(internshipService.getById(internshipId));
		aplication.setStatus(AplicationStatus.SUBMITTED);
		
		save(aplication);
		return ResponseEntity.accepted().build();
	}

	@Override
	public ResponseEntity<HttpStatus> cancelAplication(User user, Long internshipId) {
		Aplication aplication = aplicationRepository.getByUserAndInternshipActive(user, internshipService.getById(internshipId));

		aplicationRepository.delete(aplication);
		return ResponseEntity.accepted().build();
	}

	@Override
	public Boolean hasUserApplied(User user, Internship internship) {
		Aplication aplication = aplicationRepository.getByUserAndInternshipActive(user, internship);
		return aplication != null;
	}

	@Override
	public ResponseEntity<HttpStatus> promoteAplication(Long aplicationId) {
		Aplication aplication = getById(aplicationId);

		switch(aplication.getStatus()) {
		case SUBMITTED:
			aplication.setStatus(AplicationStatus.ASSESSMENT);
			break;
		case ASSESSMENT:
			aplication.setStatus(AplicationStatus.INTERVIEW);
			break;
		case INTERVIEW:
			aplication.setStatus(AplicationStatus.ACCEPTED);
			break;
		case ACCEPTED:
			break;
		case REJECTED:
			break;
		}

		save(aplication);
		return ResponseEntity.accepted().build();
	}

	@Override
	public ResponseEntity<HttpStatus> rejectAplication(Long aplicationId) {
		Aplication aplication = getById(aplicationId);

		aplication.setStatus(AplicationStatus.REJECTED);

		save(aplication);
		return ResponseEntity.accepted().build();
	}
}
