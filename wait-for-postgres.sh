#!/bin/sh
# wait-for-postgres.sh

set -e

cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD_UNROOT psql $POSTGRES_DATABASE_UNROOT -h "$POSTGRES_HOST" -U "$POSTGRES_USER_UNROOT" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd

