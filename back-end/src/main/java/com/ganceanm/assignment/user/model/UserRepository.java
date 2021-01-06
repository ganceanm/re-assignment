package com.ganceanm.assignment.user.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ganceanm.assignment.room.model.Room;

public interface UserRepository extends JpaRepository<User, Long>{
	@Query("SELECT u FROM User u where u.userName = :name") 
    User findUserByName(@Param("name") String name);
	
	@Query("SELECT u FROM User u where u.resetToken = :token")
	User findUserByResetToken(@Param("token") String token);
	
	@Query("SELECT u FROM User u where u.room = :room")
	List<User> findUsersByRoomNumber(@Param("room") Room room);
}
