package com.lhh.eco.pigeon.adapter;

import com.lhh.eco.pigeon.domain.bo.Message;
import com.lhh.eco.pigeon.entities.MessageEntity;
import org.mapstruct.Mapper;

@Mapper
public interface MessageMapper {
    MessageEntity toEntity(Message bo);
    Message toBO(MessageEntity entity);
}
