package com.ganceanm.assignment.user.model;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserPagingRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User>{

}
