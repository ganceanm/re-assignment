package com.ganceanm.assignment.room.api.message;

import com.ganceanm.assignment.room.model.RoomStatus;
import com.ganceanm.assignment.room.model.RoomType;

public class SimpleRoomMsg {
	private Long id;

	private String roomNumber;

	private RoomType roomType;

	private RoomStatus roomStatus;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public RoomStatus getRoomStatus() {
		return roomStatus;
	}

	public void setRoomStatus(RoomStatus roomStatus) {
		this.roomStatus = roomStatus;
	}

}
