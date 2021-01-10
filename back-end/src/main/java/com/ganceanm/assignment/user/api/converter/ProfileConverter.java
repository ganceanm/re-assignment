package com.ganceanm.assignment.user.api.converter;

import org.springframework.stereotype.Component;

import com.ganceanm.assignment.user.api.message.ProfileMsg;
import com.ganceanm.assignment.user.model.Profile;
import com.ganceanm.assignment.user.model.UserRole;

@Component
public class ProfileConverter {
	public ProfileMsg toMsg(Profile from, UserRole type) {
		ProfileMsg to = new ProfileMsg();
		
		to.setType(type.toString());
		if(from.getEmail() != null) {
			to.setEmail(from.getEmail());
		}
		
		if(from.getPhoneNumber() != null) {
			to.setPhoneNumber(from.getPhoneNumber());
		}
		
		if(from.getEmail() != null) {
			to.setEmail(from.getEmail());
		}
		
		
		
		to.setPhoneNumber(from.getPhoneNumber());
		to.setAddress(from.getAddress());
		
		to.setCompanyName(from.getCompanyName());
		to.setCompanyDescription(from.getCompanyDescription());
		to.setName(from.getName());
		to.setAboutMe(from.getAboutMe());
		to.setEducation(from.getEducation());
		to.setExperience(from.getExperience());
		to.setSkills(from.getSkills());
		to.setHobbiesAndInterests(from.getHobbiesAndInterests());
		
		return to;
	}
	
	public Profile toEntity(ProfileMsg from) {
		Profile to = new Profile();
		
		to.setEmail(from.getEmail());
		to.setPhoneNumber(from.getPhoneNumber());
		to.setAddress(from.getAddress());
		
		to.setCompanyName(from.getCompanyName());
		to.setCompanyDescription(from.getCompanyDescription());
		to.setName(from.getName());
		to.setAboutMe(from.getAboutMe());
		to.setEducation(from.getEducation());
		to.setExperience(from.getExperience());
		to.setSkills(from.getSkills());
		to.setHobbiesAndInterests(from.getHobbiesAndInterests());
		
		return to;
	}
}
