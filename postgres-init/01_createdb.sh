#!/bin/sh

# create USER_UNROOT
# create DATABASE_UNROOT
if PGPASSWORD=$POSTGRES_PASSWORD_UNROOT psql $POSTGRES_DATABASE_UNROOT -U "$POSTGRES_USER_UNROOT" -c '\q'; then
  >&2 echo "Unroot user of postgreSQL is already exist. Skip to create user and data base."
else

  PGPASSWORD=$POSTGRES_PASSWORD

  psql $POSTGRES_DATABASE -U "$POSTGRES_USER" <<- EOSQL
    create role $POSTGRES_USER_UNROOT with login password '$POSTGRES_PASSWORD_UNROOT';
    create database $POSTGRES_DATABASE_UNROOT;
    grant all privileges on database $POSTGRES_DATABASE_UNROOT to $POSTGRES_USER_UNROOT;
    grant all privileges on all tables in schema public to $POSTGRES_USER_UNROOT;
EOSQL

  >&2 echo "Created UNROOT user and UNROOT database"
fi
