package com.ganceanm.assignment.aplication.api.converter;

import org.springframework.stereotype.Component;

import com.ganceanm.assignment.aplication.api.message.AplicationDetailsMsg;
import com.ganceanm.assignment.aplication.model.Aplication;

@Component
public class AplicationDetailsConverter {
	public AplicationDetailsMsg toMsg(Aplication from) {
		AplicationDetailsMsg to = new AplicationDetailsMsg();
		
		to.setId(from.getId());
		to.setStatus(from.getStatus());
		to.setApplicantId(from.getApplicant().getId());
		to.setCreatedAt(from.getCreatedAt());
		if(from.getApplicant().getProfile().getName() != null) {
			to.setApplicantName(from.getApplicant().getProfile().getName());
		} else {
			to.setApplicantName(from.getApplicant().getUserName());
		}
		
		
		return to;
	}
}
