package com.ganceanm.assignment.room.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<Room, Long>{
	@Query("SELECT r FROM Room r where r.roomNumber = :nr") 
    Room findByRoomNr(@Param("nr") String roomNr);
}
