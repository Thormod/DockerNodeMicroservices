# EAFIT: Microservices example

## Setup
For running locally the project you need to have installed on your local machine the following software:
 * Docker
 * Docker-compose
 * Node Js
 
 After installed, you need to execute the following steps:
 * First you need to clone the repository: 
 ```
git clone https://github.com/Thormod/DockerNodeMicroservices.git
```
 *  Then you need to install all needed modules via npm:
 ```
 npm install
 ```
 * Then you need to change the 'url' variable from the ´api_gateway/api/gateway.js´ file with your docker ip or localhost if is the case:
 ``` javascript
 var url = 'http://192.168.99.100';
 ```
 * Change also the 'url' variable inside the test ´test/test.js´ file:
 ``` javascript
 const url = 'http://192.168.99.100:8080';
  ```
 * If you need to know your docker ip, run the following command:
 ```
 docker-machine ip
  ```
 * Then you need to build the project via docker-compose, you need to be in the project root (./) - This step should take a few minutes because it is downloading all docker external images:
 ```
 docker-compose build
 ```
 * Then  you need to mount the containers via docker-compose:
 ```
 docker-compose up
 ```
 * For running the mocha tests you need to type the following command:
 ```
npm test
 ``` 
 ### Description of the microservices
 
  #### Users
  ```
/users/
 ```
It highlights the fields that a user will contain in the system such as: name, username and password

 #### Meetings
  ```
/meetings/
 ```
It highlights the fields that will contain a meeting in the system as: Subject, location, start date, end date, link

  #### Grades
  ```
/grades/
 ```
It highlights the fields that will contain a grade in the system as: qualifier, qualified, assistance, score, comment

  #### Assistance
  ```
/assistance/
 ```
It highlights the fields that will contain the assistance record in the system as: meeting, user

### Stuff used to make this:

 * [markdown-it](https://github.com/markdown-it/markdown-it) for Markdown parsing
 * [Express](https://www.npmjs.com/package/express/) for the server configuration
 * [Docker](https://www.docker.com/) as platform provider
 * [Node Js](https://nodejs.org/es/) as JS execution environment
 * [Mocha](https://www.npmjs.com/package/mocha) for testing
