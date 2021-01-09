package com.ganceanm.assignment.aplication.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.ganceanm.assignment.internship.model.Internship;
import com.ganceanm.assignment.user.model.User;


public interface AplicationPagingRepository extends PagingAndSortingRepository<Aplication, Long>, JpaSpecificationExecutor<Aplication>{
	@Query("SELECT a FROM Aplication a where a.applicant = :user order by a.createdAt desc") 
    Page<Aplication> findByUser(@Param("user") User user, Pageable page);
	
	@Query("SELECT a FROM Aplication a where a.internship = :internship order by a.createdAt desc") 
    Page<Aplication> findByInternship(@Param("internship") Internship internship, Pageable page);
}
