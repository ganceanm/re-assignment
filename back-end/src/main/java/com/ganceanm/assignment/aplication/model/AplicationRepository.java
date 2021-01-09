package com.ganceanm.assignment.aplication.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AplicationRepository extends JpaRepository<Aplication, Long>{
//	@Query("SELECT r FROM Room r where r.roomNumber = :nr") 
//  Internship findByRoomNr(@Param("nr") String roomNr);
}