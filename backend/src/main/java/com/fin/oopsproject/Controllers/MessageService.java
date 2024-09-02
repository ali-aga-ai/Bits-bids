package com.fin.oopsproject.Controllers;

import com.fin.oopsproject.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BidRepository bidRepository;

    public MessageModel addMessage(String messageText, Long userId, Long receiverId) {
        MessageModel messageModel = new MessageModel();
        messageModel.setMessage(messageText);
        messageModel.setTimestamp(LocalDateTime.now().toString());

        UserModel sender = userRepository.findById(userId).orElseThrow();
        UserModel receiver = userRepository.findById(receiverId).orElseThrow();

        messageModel.setSender(sender);
        messageModel.setReceiver(receiver);

        return messageRepository.save(messageModel);
    }

    public Iterable<MessageModel> getAllMessages() {
        return messageRepository.findAll();
    }

    public Iterable<MessageModel> getMessagesBySenderId(Long senderId) {
        UserModel sender = userRepository.findById(senderId).orElse(null);
        return sender != null ? messageRepository.findAllBySender(sender) : Collections.emptyList();
    }

    public Iterable<MessageModel> getMessagesByReceiverId(Long receiverId) {
        UserModel receiver = userRepository.findById(receiverId).orElse(null);
        return receiver != null ? messageRepository.findAllByReceiver(receiver) : Collections.emptyList();
    }

    public Iterable<MessageModel> getMessagesForUser(Long userId) {
        UserModel user = userRepository.findById(userId).orElse(null);
        if (user == null) return Collections.emptyList();

        Set<MessageModel> messages = new HashSet<>();
        // messages.addAll(messageRepository.findAllBySender(user));
        // messages.addAll(messageRepository.findAllByReceiver(user));
        return messages;
    }
    public Iterable<MessageModel> getMessagesBySenderAndReceiver(Long userId1, Long userId2, boolean includeReversed) {
        if (includeReversed) {
            return messageRepository.findMessagesBetweenUsers(userId1, userId2);
        }
        return messageRepository.findMessagesBetweenUsers(userId1, userId2);
    }
    
    

    public Object getMessagesFromHighestBidder(Long productId) {
        ProductModel productModel = productRepository.findById(productId).orElse(null);
        if (productModel == null) return null;

        List<BidModel> bids = bidRepository.findAllByProduct(productModel);
        if (bids.isEmpty()) return null;

        BidModel highestBid = Collections.max(bids, Comparator.comparing(BidModel::getBid));
        UserModel highestBidder = highestBid.getUser();

        Set<MessageModel> messages = new HashSet<>();
        // messages.addAll(messageRepository.findAllBySender(highestBidder));
        // messages.addAll(messageRepository.findAllByReceiver(highestBidder));

        Map<String, Object> response = new HashMap<>();
        response.put("messages", messages);
        response.put("highestBid", highestBid.getBid());
        response.put("bidder", highestBidder);
        return response;
    }
}
