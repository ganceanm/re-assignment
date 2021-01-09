package com.ganceanm.assignment.internship.api.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ganceanm.assignment.internship.api.message.SimpleInternshipMsg;
import com.ganceanm.assignment.internship.model.Internship;

@Component
public class InternshipListConverter {
	
	public List<SimpleInternshipMsg> toMsg(List<Internship> from) {
		
		List<SimpleInternshipMsg> to = new ArrayList<>();

		for (Internship r : from) {
			SimpleInternshipMsg iMsg = new SimpleInternshipMsg();
			
			iMsg.setId(r.getId());
			iMsg.setTitle(r.getTitle());
			iMsg.setCreatedAt(r.getCreatedAt().toString());
			
			to.add(iMsg);
		}

		return to;
	}
}
