package com.ganceanm.assignment.room.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.room.model.Room;
import com.ganceanm.assignment.room.model.RoomPagingRepository;
import com.ganceanm.assignment.room.model.RoomRepository;
import com.ganceanm.assignment.room.model.RoomStatus;
import com.ganceanm.assignment.room.model.RoomType;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.service.UserService;

@Service
public class RoomServiceBean implements RoomService {

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private RoomPagingRepository roomPagingRepository;

	@Autowired
	private UserService usersService;

	@Override
	public Room save(Room room) {
		if (room.getId() == null) {
			room.setCreatedAt(new Date());
		}

		room.setModifiedAt(new Date());

		return roomRepository.save(room);
	}

	@Override
	public Room getById(Long roomId) {
		return roomRepository.getOne(roomId);
	}

	@Override
	public Room getByRoomNr(String roomNr) {
		return roomRepository.findByRoomNr(roomNr);
	}

	@Override
	public Page<Room> findByString(int page, int limit, String params) {
		return roomPagingRepository.findRoomByString(params, PageRequest.of(page, limit));
	}

	@Override
	public List<Room> getAll() {
		return roomRepository.findAll();
	}

	@Override
	public ResponseEntity<HttpStatus> putRoom(Long id, int beds, List<Long> users) {
		Room room = getById(id);

		if (room == null) {
			return ResponseEntity.notFound().build();
		} else {
			switch (beds) {
			case 0:
				room.setRoomStatus(RoomStatus.Inactive);
				break;
			case 3:
				room.setRoomStatus(RoomStatus.Active);
				room.setRoomType(RoomType.Three);
				break;
			case 4:
				room.setRoomStatus(RoomStatus.Active);
				room.setRoomType(RoomType.Four);
				break;
			}

			List<User> userList = new ArrayList<>();
			try {
				userList = usersService.getByRoom(room);

			} catch (UserNotFoundException e) {

			}

			if(beds == 0) {
				if (!userList.isEmpty()) {
					for (User u : userList) {
							usersService.setRoom(u.getId(), null);
					}
				}

			} else {
				if (!userList.isEmpty()) {
					for (User u : userList) {
						if (!users.contains(u.getId())) {
							usersService.setRoom(u.getId(), null);
						}
					}
				}

				for (Long userId : users) {
					User user = usersService.getById(userId);
					if(user != null) {
						if(user.getRoom() == null || !user.getRoom().getId().equals(id)) {
							user.setRoom(room);
						}
					}
				}
			}
			

			save(room);
			return ResponseEntity.accepted().build();
		}
	}

}
