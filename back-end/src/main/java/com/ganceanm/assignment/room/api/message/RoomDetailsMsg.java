package com.ganceanm.assignment.room.api.message;

import java.util.List;

import com.ganceanm.assignment.room.model.RoomStatus;
import com.ganceanm.assignment.room.model.RoomType;
import com.ganceanm.assignment.user.api.message.SimpleUserMsg;

public class RoomDetailsMsg {

	private Long id;
	private String roomNumber;
	private RoomType roomType;
	private List<SimpleUserMsg> userList;
	private RoomStatus roomStatus;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public RoomStatus getRoomStatus() {
		return roomStatus;
	}

	public void setRoomStatus(RoomStatus roomStatus) {
		this.roomStatus = roomStatus;
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

	public List<SimpleUserMsg> getUserList() {
		return userList;
	}

	public void setUserList(List<SimpleUserMsg> userList) {
		this.userList = userList;
	}

}
