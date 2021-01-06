package com.ganceanm.assignment.room.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ganceanm.assignment.room.model.Room;

public interface RoomService {
	public Room save(Room room);
	public List<Room> getAll();
	public Room getById(Long roomId);
	public Room getByRoomNr(String roomNr);
	public Page<Room> findByString(int page, int limit, String params);
	public ResponseEntity<HttpStatus> putRoom(Long id, int beds, List<Long> users);
}
