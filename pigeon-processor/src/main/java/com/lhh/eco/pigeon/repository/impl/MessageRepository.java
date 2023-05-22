package com.lhh.eco.pigeon.repository.impl;

import com.lhh.eco.pigeon.entities.MessageEntity;
import com.lhh.eco.pigeon.repository.IMessageRepository;
import org.springframework.stereotype.Repository;

@Repository
public class MessageRepository implements IMessageRepository<MessageEntity, String> {
}
