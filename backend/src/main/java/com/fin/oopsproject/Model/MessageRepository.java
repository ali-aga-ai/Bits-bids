package com.fin.oopsproject.Model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<MessageModel, Long> {

    Iterable<MessageModel> findAllBySender(UserModel sender);

    Iterable<MessageModel> findAllByReceiver(UserModel receiver);
    Iterable<MessageModel> findAllBySenderAndReceiver(UserModel sender, UserModel receiver);
    
    @Query("SELECT m FROM MessageModel m WHERE (m.sender.userId = :user1Id AND m.receiver.userId = :user2Id) OR (m.sender.userId = :user2Id AND m.receiver.userId = :user1Id) ORDER BY m.timestamp")
    List<MessageModel> findMessagesBetweenUsers(@Param("user1Id") Long userId1, @Param("user2Id") Long userId2);
    
}


