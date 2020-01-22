#!/bin/sh

LOCAL="local"
TEST="test"
PRODUCTION="production"

if [ $1 = $LOCAL ];then
  echo "run $1"
  docker-compose build
  docker-compose up
elif [ $1 = $TEST ]; then
  echo "run $1"
  docker-compose build
  docker-compose -f docker-compose.yml \
                 -f docker-compose.jest.yml \
                 run --rm lovelab-api
elif [ $1 = $PRODUCTION ]; then
  echo "run $1"
  docker-compose build
  docker-compose -f docker-compose.yml \
                 -f docker-compose.override.yml \
                 -f docker-compose.production.yml \
                 up
else
  echo 'example:'
  echo "$ $0 $LOCAL"
  echo "$ $0 $TEST"
  echo "$ $0 $PRODUCTION"
fi
