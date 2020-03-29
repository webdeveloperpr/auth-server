# AUTH API

## API

The purpose of this repo is to create a basic an API for authenticating users
using 

- JWT tokens
- Local authentication

## Resources

To support the application we will need 2 EC2 containers, one for hosting the DB
and the other for running the authentication app. The DB EC2 instance is 
separate just in case we decide to create multiple authentication apps.

### EC2 1

**Application**

 Will be running the nodeJS application inside a Docker container.


### EC2 2

**DB**

Will be running the MongoDB database inside a Docker container, eventually
switch it for dynamoDB so that we can use the DynamoDB docker image locally
and then use the DynamoDB service in production.

**references:**

- [running mongodb in Docker](https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/)


**Docker images**

- [dynamodb-local](https://hub.docker.com/r/amazon/dynamodb-local/ )
- [mongo](https://hub.docker.com/_/mongo)

## Frontend.

No frontend :(

## CI/CD

For CI/CD we well be using Jenkins server to run tests and kick off the
deployment process.

I don't have a Jenkins server right now but I will eventually set one up.

## Installation

**Database**

```bash
$ docker pull mongo
```

**App**

```bash
$ npm install
```

## Development

**Database**

**start**

```bash
$ docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest
```

**docker shell**

```bash
$ docker exec -it mongodb bash
```

**references**

[mongoose docs](https://mongoosejs.com/docs/connections.html)

### App

```
$ npm start
```


 # auth-server
