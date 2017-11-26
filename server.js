const {
  PORT = 9000,
  DB_URL = 'mongodb://localhost:21017/node-koa-boilerplate',
  MOUNT_PATH = '',
  DB_COLLECTION = 'data'
} = process.env;

// call packages
const Koa = require('koa');
const Router = require('koa-router');
const Cors = require('kcors');
const { MongoClient } = require('mongodb');
const BodyParser = require('koa-bodyparser');
const crypto = require('crypto');

// create router and define endpoints (GET, POST)
function createRouter(collection) {
  const router = new Router({prefix: `${MOUNT_PATH}/data`});

  // get count of all data
  router.get('/data', async ctx => {
    // await database call
    const count = await collection.count();
    ctx.status = 200;
    ctx.body = {status: 200, message: 'OK', data: count};
  });

  // get count of data by a single user
  router.get('/:userId', async ctx => {
    const countOfUser = await collection.find({userId: ctx.params.userId}).count();
    ctx.status = 200;
    ctx.body = {status: 200, message: 'OK', data: countOfUser};
  });

  // post data
  router.post('/', async ctx => {
    // check if userId is provided
    const userId = ctx.request.body && ctx.request.body.userId || undefined;

    // get ip of request
    const ip = ctx.request.ip;
    // create new entry containing userId, timestamp and hashed ip
    const newData = {
      userId,
      timestamp: new Date(),
      ip: crypto.createHash('md5').update(ip).digest('hex')
    };

    // insert data
    const insertion = await collection.insertOne(newData);
    // get index (id of inserted entry)
    const index = await collection.find({'_id': {$lte: insertion.insertedId}}).count();
  });

  return router;
}

async function main() {
  // connect to database and create 'data' collection
  const database = await MongoClient.connect(DB_URL);
  const collection = database.collection(DB_COLLECTION);
  // create compound index for userId and timestamp
  await collection.createIndex({userId: 1, timestamp: -1});
  // create index for field 'userId'
  await collection.createIndex({userId: 1});

  const router = createRouter(collection);

  // use koa framework with CORS middleware and body parser
  const app = new Koa();
  // match routes and check which routes are allowed
  app
    .use(Cors())
    .use(BodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  // start server
  app.listen(PORT, function() {
    process.stdout.write(`Server now listening on port ${PORT}\n`);
  });
}

// call main() and catch errors
main().catch(err => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});
