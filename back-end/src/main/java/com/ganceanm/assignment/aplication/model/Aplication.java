package com.ganceanm.assignment.aplication.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.ganceanm.assignment.helpers.model.BaseTableEntity;
import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.user.model.User;

@Entity
@Table(name = "aplications")
public class Aplication extends BaseTableEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@ManyToOne
	private User applicant;

	@NotNull
	@ManyToOne
	private Internship internship;

	@NotNull
	@Enumerated(EnumType.STRING)
	private AplicationStatus status;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getApplicant() {
		return applicant;
	}

	public void setApplicant(User applicant) {
		this.applicant = applicant;
	}

	public Internship getInternship() {
		return internship;
	}

	public void setInternship(Internship internship) {
		this.internship = internship;
	}

	public AplicationStatus getStatus() {
		return status;
	}

	public void setStatus(AplicationStatus status) {
		this.status = status;
	}

}
