package com.ganceanm.assignment.user.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ganceanm.assignment.helpers.exception.NotUniqueUserNameException;
import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.helpers.exception.WrongUserNameException;
import com.ganceanm.assignment.search.SearchCriteria;
import com.ganceanm.assignment.security.service.PasswordEncoder;
import com.ganceanm.assignment.services.email.EmailService;
import com.ganceanm.assignment.user.model.ProfileRepository;
import com.ganceanm.assignment.user.model.Profile;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.model.UserPagingRepository;
import com.ganceanm.assignment.user.model.UserRepository;
import com.ganceanm.assignment.user.model.UserRole;
import com.ganceanm.assignment.user.model.UserSpecification;
import com.ganceanm.assignment.user.model.UserStatus;

@Service
public class UserServiceBean implements UserService {

	@Autowired
	private UserRepository usersRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private UserPagingRepository usersSortingRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private EmailService emailService;

	@Override
	public User save(User user) {
		user.setModifiedAt(new Date());

		return usersRepository.save(user);
	}

	@Override
	public User getById(Long userId) {
		Optional<User> opt = usersRepository.findById(userId);

		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}
	}

	@Override
	public User getByUserName(String userName) throws WrongUserNameException {
		User u = usersRepository.findUserByName(userName);
		if (u == null) {
			throw new WrongUserNameException();
		}
		return u;
	}

	@Override
	public ResponseEntity<HttpStatus> createUser(User users) throws NotUniqueUserNameException {
		User u = usersRepository.findUserByName(users.getUserName());

		if (u == null) {
			u = users;
		} else {
			throw new NotUniqueUserNameException();
		}

		u.setPassword(passwordEncoder.encodePassword(""));
		u.setStatus(UserStatus.Inactive);

		u.setResetToken(UUID.randomUUID().toString());

		String url = "http://localhost:3000/setpassword/" + u.getResetToken();

		StringBuilder emailText = new StringBuilder("");
		emailText.append("Hello!\n").append("To set your password click on the following link:\n").append(url);

		emailService.sendEmail(u.getUserName(), "Configure password", emailText.toString());

		u.setCreatedAt(new Date());
		try {
			save(u);
			Profile p = new Profile();
			p.setUser(u);
			u.setProfile(profileRepository.save(p));
			return ResponseEntity.accepted().build();
		} catch (Exception e) {
			throw new NotUniqueUserNameException();
		}
	}

	@Override
	public ResponseEntity<HttpStatus> putUser(User user) throws NotUniqueUserNameException {
		try {
			save(user);
			return ResponseEntity.accepted().build();
		} catch (Exception e) {
			throw new NotUniqueUserNameException();
		}
	}

	@Override
	public List<User> getAll() {
		return usersRepository.findAll();
	}

	@Override
	public Page<User> findByString(int page, int limit, String params) {
		List<String> keys = new ArrayList<>();
		keys.add("lastName");
		keys.add("firstName");

		List<String> text = Arrays.asList(params.split(" "));

		UserSpecification spec = new UserSpecification(new SearchCriteria(keys, "l:", text, Optional.empty()));

		return usersSortingRepository.findAll(spec, PageRequest.of(page, limit));
	}

	@Override
	public User getByResetToken(String token) throws UserNotFoundException {
		User u = usersRepository.findUserByResetToken(token);
		if (u == null) {
			throw new UserNotFoundException();
		}
		return u;
	}

	@Override
	public ResponseEntity<HttpStatus> deleteUser(Long userId) {
		try {
			User user = getById(userId);

			user.setStatus(UserStatus.Inactive);
			user.setDeleted(true);

			save(user);
			return ResponseEntity.accepted().build();
		} catch (Exception e) {
			return ResponseEntity.noContent().build();
		}
	}

	@Override
	public ResponseEntity<HttpStatus> updateProfile(Profile newp, User users) {
		Profile profile = users.getProfile();
		
		profile.setEmail(newp.getEmail());
		profile.setPhoneNumber(newp.getPhoneNumber());
		profile.setAddress(newp.getAddress());
		
		profile.setCompanyName(newp.getCompanyName());
		profile.setCompanyDescription(newp.getCompanyDescription());
		profile.setName(newp.getName());
		profile.setAboutMe(newp.getAboutMe());
		profile.setEducation(newp.getEducation());
		profile.setExperience(newp.getExperience());
		profile.setSkills(newp.getSkills());
		profile.setHobbiesAndInterests(newp.getHobbiesAndInterests());
		
		profileRepository.save(profile);
		
		return ResponseEntity.accepted().build();
	}
}
