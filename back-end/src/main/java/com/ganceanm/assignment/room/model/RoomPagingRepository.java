package com.ganceanm.assignment.room.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface RoomPagingRepository extends PagingAndSortingRepository<Room, Long>{
	@Query("SELECT r FROM Room r where r.roomNumber like CONCAT(:text,'%') order by r.id asc") 
    Page<Room> findRoomByString(@Param("text") String text, Pageable page);
}
