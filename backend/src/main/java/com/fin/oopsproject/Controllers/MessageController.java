package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.MessageModel;
import com.fin.oopsproject.Model.MessageRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping(path = "/")
    public Iterable<MessageModel> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping(path = "/user")
    public Iterable<MessageModel> getAllMessagesForUser(@RequestParam Long userId) {
        return messageService.getMessagesForUser(userId);
    }

    

    @PostMapping(path = "/")
public MessageModel addMessage(@RequestBody MessageRequest request) {
    return messageService.addMessage(request.getMessageText(),  request.getUserId(), request.getReceiverId());
}



    @GetMapping(path = "/sender")
    public Iterable<MessageModel> getMessagesBySenderId(@RequestParam Long senderId) {
        return messageService.getMessagesBySenderId(senderId);
    }

    @GetMapping(path = "/receiver")
    public Iterable<MessageModel> getMessagesByReceiverId(@RequestParam Long receiverId) {
        return messageService.getMessagesByReceiverId(receiverId);
    }

    @GetMapping(path = "/sender-receiver")
    public Iterable<MessageModel> getMessagesBySenderAndReceiver(
            @RequestParam Long userId1, 
            @RequestParam Long userId2) {
        return messageService.getMessagesBySenderAndReceiver(userId1, userId2, true);
    }

    


    @GetMapping(path = "/highestBid")
    public Object getMessagesByHighestBid(@RequestParam Long productId) {
        return messageService.getMessagesFromHighestBidder(productId);
    }

   
}
