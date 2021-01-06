package com.ganceanm.assignment.room.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ganceanm.assignment.room.api.converter.RoomDetailsConverter;
import com.ganceanm.assignment.room.api.message.PutRoomMsg;
import com.ganceanm.assignment.room.api.message.RoomDetailsMsg;
import com.ganceanm.assignment.room.service.RoomService;
import com.ganceanm.assignment.search.SearchResponse;
import com.ganceanm.assignment.search.SearchResponseConverter;
import com.ganceanm.assignment.security.clearance.ClearanceTwo;

@RestController
@RequestMapping("/room")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@Autowired
	private SearchResponseConverter searchResponseConverter;

	@Autowired
	RoomDetailsConverter roomDetailsConverter;

	@ClearanceTwo
	@GetMapping
	public SearchResponse find(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "15") int limit,
			@RequestParam(defaultValue = "") String keyword) {
		return searchResponseConverter.toMsg(roomService.findByString(page, limit, keyword));
	}

	@ClearanceTwo
	@GetMapping("/{roomId}")
	public RoomDetailsMsg getRoom(@PathVariable("roomId") Long roomId) {
		return roomDetailsConverter.toMsg(roomService.getById(roomId));
	}

	@ClearanceTwo
	@PutMapping
	public ResponseEntity<HttpStatus> put(@Valid @RequestBody PutRoomMsg msg) {
		return roomService.putRoom(msg.getId(), msg.getBeds(), msg.getUsers());
	}

}
