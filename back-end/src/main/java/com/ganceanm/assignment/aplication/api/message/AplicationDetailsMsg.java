package com.ganceanm.assignment.aplication.api.message;

import java.util.Date;

import com.ganceanm.assignment.aplication.model.AplicationStatus;

public class AplicationDetailsMsg {
	private Long id;
	private Long applicantId;
	private String applicantName;
	private AplicationStatus status;
	private Date createdAt;
	
	

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getApplicantId() {
		return applicantId;
	}

	public void setApplicantId(Long applicantId) {
		this.applicantId = applicantId;
	}

	public String getApplicantName() {
		return applicantName;
	}

	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}

	public AplicationStatus getStatus() {
		return status;
	}

	public void setStatus(AplicationStatus status) {
		this.status = status;
	}

}
