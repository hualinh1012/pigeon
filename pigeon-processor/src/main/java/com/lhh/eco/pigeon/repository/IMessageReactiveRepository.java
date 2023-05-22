package com.lhh.eco.pigeon.repository;

import com.lhh.eco.pigeon.entities.MessageEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMessageReactiveRepository extends ReactiveMongoRepository<MessageEntity, String>, IMessageRepository<MessageEntity, String> {
}
