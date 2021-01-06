package com.ganceanm.assignment.room.api.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ganceanm.assignment.room.api.message.SimpleRoomMsg;
import com.ganceanm.assignment.room.model.Room;

@Component
public class RoomListConverter {
	public List<SimpleRoomMsg> toMsg(List<Room> from) {
		
		List<SimpleRoomMsg> to = new ArrayList<>();

		for (Room r : from) {
			SimpleRoomMsg roomMsg = new SimpleRoomMsg();
			
			roomMsg.setId(r.getId());
			roomMsg.setRoomNumber(r.getRoomNumber());
			roomMsg.setRoomStatus(r.getRoomStatus());
			roomMsg.setRoomType(r.getRoomType());
			
			to.add(roomMsg);
		}

		return to;
	}
}
