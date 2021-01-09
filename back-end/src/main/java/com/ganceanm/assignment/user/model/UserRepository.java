package com.ganceanm.assignment.user.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long>{
	@Query("SELECT u FROM User u where u.userName = :name") 
    User findUserByName(@Param("name") String name);
	
	@Query("SELECT u FROM User u where u.resetToken = :token")
	User findUserByResetToken(@Param("token") String token);
	
}
