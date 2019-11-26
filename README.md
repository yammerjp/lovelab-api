# lovelab.heroku

API server of lovelab with node.js and express

- node.js
 - express
 - TypeScript
 - Sequelize
- PostgreSQL

## Run

### Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

__Need PostgreSQL__

Install, setup PostgreSQL and add .env

```.env
ENV_HOST=localhost
ENV_DATABASE=yourDatabaseName
ENV_USER=yourDatabasesUser
ENV_PORT=5432
ENV_PASSWORD=yourPassword
ENV_DIALECT=postgres
```

Set your database name, database user, database password.

```sh
$ git clone https://github.com/basd4g/lovelab.heroku
$ cd lovelab.heroku
$ npm install
$ npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

### Deploying to Heroku

__Need PostgreSQL__

and set environment variables.

```sh
$ heroku create
$ git push heroku master
$ heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Specification

This is REST-like API(Authorization required).

[API Specification is here](documents/apiSpec.md)

