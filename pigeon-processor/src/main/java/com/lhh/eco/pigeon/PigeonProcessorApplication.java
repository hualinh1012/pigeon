package com.lhh.eco.pigeon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@SpringBootApplication
@EnableReactiveMongoRepositories
public class PigeonProcessorApplication {

	public static void main(String[] args) {
		SpringApplication.run(PigeonProcessorApplication.class, args);
	}

}
