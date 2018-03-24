# Getting started

Boilerplate code to start a database application (node.js REST API with MongoDB connection).

## Installation

```
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

## Run unit tests

```
npm test
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
