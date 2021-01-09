package com.ganceanm.assignment.internship.model;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface InternshipPagingRepository extends PagingAndSortingRepository<Internship, Long>, JpaSpecificationExecutor<Internship>{

}
