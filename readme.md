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
 * Then you need to change the url from the ´api_gateway/api/gateway.js´with your docker ip or localhost if is the case:
 ``` javascript
 var url = 'http://192.168.99.100';
 ```
 * Change also the test url ´test/test.js´:
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
### Stuff used to make this:

 * [markdown-it](https://github.com/markdown-it/markdown-it) for Markdown parsing
 * [Express](https://www.npmjs.com/package/express/) for the server configuration
 * [Docker](https://www.docker.com/) as platform provider
 * [Node Js](https://nodejs.org/es/) as JS execution environment
 * [Mocha](https://www.npmjs.com/package/mocha) for testing
