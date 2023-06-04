# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

#### Quick summary

This repository is about a system which can horizontally scale and handle 2 millions socket connection at the same time

#### Table of content
* Set up guide
* System architecture
* Technology adoption

### How do I get set up? ###

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

### Contribution guidelines ###

* Writing tests: TBD
* Code review: TBD
* Other guidelines: TBD