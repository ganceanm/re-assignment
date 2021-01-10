package com.ganceanm.assignment.search;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.aplication.api.converter.AplicationListConverter;
import com.ganceanm.assignment.aplication.model.Aplication;
import com.ganceanm.assignment.internship.api.converter.InternshipListConverter;
import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.user.model.User;

@Component
public class SearchResponseConverter {
	
	@Autowired
	InternshipListConverter internshipListConverter;
	
	@Autowired
	AplicationListConverter aplicationListConverter;
	
	
	
	@SuppressWarnings("unchecked")
	public SearchResponse toMsg(Page<?> from) {
		SearchResponse to = new SearchResponse();
		
		to.setPage(from.getNumber());
		
		to.setPageCount(from.getTotalPages());
		
		to.setTotal(from.getTotalElements());
		
		
		
		if(!from.getContent().isEmpty()) {
			Object obj = from.getContent().get(0);
			
			if (obj instanceof Internship) {
				to.setValues(internshipListConverter.toMsg((List<Internship>)from.getContent()));
			} else if (obj instanceof Aplication) {
				to.setValues(aplicationListConverter.toMsg((List<Aplication>)from.getContent()));
			} 
			
		}
		
		return to;
	}
}