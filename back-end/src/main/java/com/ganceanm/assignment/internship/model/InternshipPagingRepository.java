package com.ganceanm.assignment.internship.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.ganceanm.assignment.user.model.User;

public interface InternshipPagingRepository extends PagingAndSortingRepository<Internship, Long>, JpaSpecificationExecutor<Internship>{
	@Query("SELECT i FROM Internship i where i.createdBy = :user order by i.createdAt desc") 
    Page<Internship> findByCreator(@Param("user") User user, Pageable page);
	
}
