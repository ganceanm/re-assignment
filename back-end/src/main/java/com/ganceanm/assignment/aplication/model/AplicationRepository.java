package com.ganceanm.assignment.aplication.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.user.model.User;

public interface AplicationRepository extends JpaRepository<Aplication, Long>{
	@Query("SELECT a FROM Aplication a where a.applicant = :user AND a.internship = :internship AND a.deleted = false") 
  Aplication getByUserAndInternshipActive(
		  @Param("user") User user, 
		  @Param("internship") Internship internship
		  );
}