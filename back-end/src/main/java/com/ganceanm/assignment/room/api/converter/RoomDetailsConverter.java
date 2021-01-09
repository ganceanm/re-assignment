package com.ganceanm.assignment.room.api.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ganceanm.assignment.helpers.exception.UserNotFoundException;
import com.ganceanm.assignment.room.api.message.RoomDetailsMsg;
import com.ganceanm.assignment.room.model.Room;
import com.ganceanm.assignment.user.api.converter.SimpleUserConverter;
import com.ganceanm.assignment.user.api.message.SimpleUserMsg;
import com.ganceanm.assignment.user.model.User;
import com.ganceanm.assignment.user.service.UserService;

@Component
public class RoomDetailsConverter {
	
	@Autowired
	SimpleUserConverter userConverter;
	
	@Autowired
	UserService usersService;
	
	public RoomDetailsMsg toMsg(Room from) {
		RoomDetailsMsg to = new RoomDetailsMsg();
		
		List<User> userList = new ArrayList<>();
		List<SimpleUserMsg> msgList = new ArrayList<>();
		
		try {
			userList = usersService.getByRoom(from);
		}catch (UserNotFoundException e) {
			userList.clear();
		}
		
		if(!userList.isEmpty()) {
			for(User u : userList) {
				msgList.add(userConverter.toMsg(u));
			}
		}
		
		to.setId(from.getId());
		to.setRoomNumber(from.getRoomNumber());
		to.setRoomType(from.getRoomType());
		to.setRoomStatus(from.getRoomStatus());
		to.setUserList(msgList);
		
		return to;
	}
}
