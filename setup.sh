#!/bin/bash
set -uxe

# for config
DB_HOST="localhost"
DB_PORT="27017"
DB_NAME="node-koa-boilerplate"
DB_COLLECTION="data"

DB_URL="mongodb://$DB_HOST:$DB_PORT/$DB_NAME"
