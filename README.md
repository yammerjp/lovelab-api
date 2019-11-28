# lovelab.heroku

API server of lovelab with node.js and express

- node.js
 - express
 - TypeScript
 - Sequelize
- PostgreSQL

## Running Locally

Make sure you have Node.js and PostgreSQL installed.

### Set .env

Set your database name, database user, database password.

```.env
ENV_HOST=localhost
ENV_DATABASE=yourDatabaseName
ENV_USER=yourDatabasesUser
ENV_PORT=5432
ENV_PASSWORD=yourPassword
ENV_DIALECT=postgres

ENV_HOST=localhost
ENV_DATABASE=yourDatabaseNameForTest
ENV_USER=yourDatabasesUserForTest
ENV_PORT=5432
ENV_PASSWORD=yourPasswordForTest
ENV_DIALECT=postgres
```

### Start PostgreSQL server

```sh
$ postgres -D /usr/local/var/postgres
```

### Start lovelab.heroku

```sh
$ git clone https://github.com/basd4g/lovelab.heroku
$ cd lovelab.heroku
$ npm install
$ npm start
```

Open [localhost:3000](http://localhost:3000/) on browser.

### Check database

```sh
$ psql -h localhost -p 5432 -d yourDatabaseName -U yourDatabaseUser
```

## Specification

This is REST-like API(Authorization required).

[API Specification is here](documents/apiSpec.md)

