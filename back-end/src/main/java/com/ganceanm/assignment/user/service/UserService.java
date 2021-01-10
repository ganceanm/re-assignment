package com.ganceanm.assignment.user.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ganceanm.assignment.helpers.exception.NotUniqueUserNameException;
import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.helpers.exception.WrongUserNameException;
import com.ganceanm.assignment.user.model.Profile;
import com.ganceanm.assignment.user.model.User;

public interface UserService {
	public User save(User user);
	public User getById(Long userId);
	public User getByUserName(String userName) throws WrongUserNameException;
	public List<User> getAll();
	public Page<User> findByString(int page, int limit, String params);
	public ResponseEntity<HttpStatus> createUser(User users) throws NotUniqueUserNameException;
	public ResponseEntity<HttpStatus> putUser(User users) throws NotUniqueUserNameException;
	public ResponseEntity<HttpStatus> updateProfile(Profile profile, User users);
	public ResponseEntity<HttpStatus> deleteUser(Long userId);
	
	public User getByResetToken(String token) throws UserNotFoundException;
	
}
