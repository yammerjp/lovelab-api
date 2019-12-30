# lovelab.heroku

API server of lovelab with node.js and express

- node.js
 - express
 - TypeScript
 - Sequelize
- PostgreSQL

## Running Locally

Need docker-compose

```sh
$ git clone https://github.com/basd4g/lovelab.heroku.git
$ cd lovelab.heroku
$ cp .env.example .env
$ docker-compose up
# Open [localhost:3000/api/v1](http://localhost:3000/api/v1) on browser.
```

## Running test Locally

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

## Specification

This is REST-like API(Authorization required).

[API Specification is here](documents/specification/index.md)

