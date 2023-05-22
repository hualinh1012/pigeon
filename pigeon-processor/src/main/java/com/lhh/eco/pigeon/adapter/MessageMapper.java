package com.lhh.eco.pigeon.adapter;

import com.lhh.eco.pigeon.domain.MessageBO;
import com.lhh.eco.pigeon.entities.MessageEntity;
import org.mapstruct.Mapper;

@Mapper
public interface MessageMapper {
    MessageEntity toEntity(MessageBO bo);
    MessageBO toBO(MessageEntity entity);
}
