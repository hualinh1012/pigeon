# README #

This README would normally document whatever steps are necessary to get your application up and running.

## What is this repository for? ###

#### Quick summary

This repository is about a system which can horizontally scale and handle 2 millions socket connection at the same time

#### Table of content
* Set up guide
* System architecture
* Technology adoption

## How do I get set up? ###

##### Dependencies
* Docker
* Java 17
* NodeJs v18

##### Set up pigeon-dev-env
* Step 1: Add **127.0.0.1 mongo1 mongo2 mongo3** to hosts 
* Step 2: **cd pigeon-dev-env**
* Step 3: **docker compose up -d**
* Step 4: **sh scripts/mongodb-rs-init.sh**

##### Set up pigeon-processor
* Step 1: Set your **JAVA_HOME**
* Step 2: **cd pigeon-processor**
* Step 3: **./mvnw clean install -U**
* Step 4: Run with your IDE or : **java -jar ./target/pigeon-processor-0.0.1-SNAPSHOT.jar**

##### Set up pigeon-socket
* Step 1: **cd pigeon-docket**
* Step 2: **npm install**
* Step 3: **npm run start**

## Architecture ###

This is the general architecture. The system will follow Event Driven Design with Kafka.
We provide a horizontal scalable system. Technologies are used in the system have to be scalable to avoid bottleneck

![Alt text](/documentation/General%20architecture.drawio.png)

**pigeon-sockets** will have different consumer group-id.
When processor publishes a messages, Kafka will broadcast that message to all socket services.

**pigeon-processor** will have same consumer group-id.
When socket publishes a incoming message from client to processors. Kafka will work as a message queue and only 1 
processor will proceed that message

![Alt text](/documentation/Backend%20architecture.drawio.png)

## Technologies adoption ###

##### Why Kafka?

Comparing Kafka to other similar message broker technologies like Redis pubsub and RabbitMQ, we will see the different any why we should use Kafka.

This table will compare Kafka with Redis and RabbitMQ

| -                                                | Kafka                                      | Redis                                           | RabbitMQ                                    |
|--------------------------------------------------|--------------------------------------------|-------------------------------------------------|---------------------------------------------|
| What we need?<br/>Message queue and distribution | Yes                                        | Only distribution                               | Yes                                         |
| Scalable                                         | Yes                                        | Yes                                             | Yes                                         |
| Message size                                     | 10MB<br/>Can be larger but won't recommend | 32MB                                            | 128MB<br/>Can be larger but won't recommend |
| Message per second                               | Over 1 million                             | Over 1 million<br/>But can't exceed 32MB in 60s | 20.000                                      |
| Persistence                                      | Disk                                       | RAM                                             | Disk                                        |

Our system prefers high I/O and easy scaling. So Kafka is best choice clearly

##### Why MongoDB?

There are 3 main reason to choose MongoDB
* We won't have any financial functionalities in our system, so we may not need transaction.
* MongoDB is also flexible, we can change our data structure without any kind of migration technologies.
* MongoDB provides horizontal scaling with Replica and Sharding

## Contribution guidelines ###

* Writing tests: TBD
* Code review: TBD
* Other guidelines: TBD