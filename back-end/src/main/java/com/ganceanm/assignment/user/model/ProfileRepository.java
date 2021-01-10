package com.ganceanm.assignment.user.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfileRepository extends JpaRepository<Profile, Long>{
	@Query("SELECT u FROM Profile u where u.user = :user") 
    User findByUser(@Param("user") User user);	
}