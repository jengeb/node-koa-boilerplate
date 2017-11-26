# Getting started

Boilerplate code to start a database application (node.js REST API with MongoDB connection).

## Installation

```
chmod +x setup.sh
./setup.sh
npm install
```

## API and DB run in Docker containers

```
docker-compose build
docker-compose up
```

Test if containers are created and running:

```
docker ps -a
```

Direct connection to database using Mongo shell (can be used as cheat sheet):

```
docker exec -it <CONTAINER ID> mongo
> use <DATABASE NAME>
> db.<COLLECTION>.count()
> db.<COLLECTION>.find()
> db.<COLLECTION>.getIndexes()
> exit
```


---


## Other ways to get the backend running

### MongoDB

Make sure MongoDB is running either installed on your system (here OS X using homebrew) or in a Docker container (recommended way):

#### System

```
brew services start mongodb
```

#### Docker

##### Installation

```
docker pull mvertes/alpine-mongo
```

##### Usage

```
docker run -d --name mongo -p 27017:27017 mvertes/alpine-mongo
```

If the container is already set up just start it:
```
docker start <CONTAINER ID>
```

#### Start server
```
npm start
```

---

## Test REST API locally
### POST
```
curl -X POST -H 'Content-Type: application/json' -d '{"userId":"123123123"}' localhost:9000/data
```

### GET
```
curl localhost:9000/data
```
