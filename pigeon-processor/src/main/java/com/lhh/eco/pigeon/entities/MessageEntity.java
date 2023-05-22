package com.lhh.eco.pigeon.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class MessageEntity {
 
    @Id
    private String id;
    private String topicId;
    private String senderId;
    private String messageType;
    private String messageValue;
    private String createdDate;
    private String updatedDate;
 }