package com.lhh.eco.pigeon.domain.bo;

import lombok.Data;

@Data
public class Message {
    private String topicId;
    private String senderId;
    private String messageValue;
}
