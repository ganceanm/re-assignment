package com.ganceanm.assignment.aplication.api.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.aplication.api.message.AplicationDetailsMsg;
import com.ganceanm.assignment.aplication.model.Aplication;

@Component
public class AplicationListConverter {

	@Autowired
	private AplicationDetailsConverter converter;
	
	public List<AplicationDetailsMsg> toMsg(List<Aplication> from) {
		
		List<AplicationDetailsMsg> to = new ArrayList<>();

		for (Aplication a : from) {
			to.add(converter.toMsg(a));
		}

		return to;
	}
}
