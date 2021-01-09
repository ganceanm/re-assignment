package com.ganceanm.assignment.internship.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InternshipRepository extends JpaRepository<Internship, Long>{
//	@Query("SELECT r FROM Room r where r.roomNumber = :nr") 
//    Internship findByRoomNr(@Param("nr") String roomNr);
}
