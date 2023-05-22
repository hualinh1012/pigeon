package com.lhh.eco.pigeon.domain;

import lombok.Data;

@Data
public class MessageBO {
    private String topicId;
    private String senderId;
    private String messageValue;
}
