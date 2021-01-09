package com.ganceanm.assignment.aplication.api.message;

public class SubmitAplicationMsg {
	private Long applicantId;
	private Long internshipId;

	public Long getApplicantId() {
		return applicantId;
	}

	public void setApplicantId(Long applicantId) {
		this.applicantId = applicantId;
	}

	public Long getInternshipId() {
		return internshipId;
	}

	public void setInternshipId(Long internshipId) {
		this.internshipId = internshipId;
	}

}
