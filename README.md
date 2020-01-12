# lovelab.heroku

API server of lovelab with node.js and express

- [node.js](https://nodejs.org/)
 - [Express](https://expressjs.com/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Running Locally

Need docker-compose version 1.24.1

```sh
$ git clone https://github.com/basd4g/lovelab.heroku.git
$ cd lovelab.heroku
$ cp .env.example .env
$ docker-compose up
# Open http://localhost/api/v1 on browser.
```

## Running test Locally

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.test.yml run app
```

or

```sh
$ ./test.sh
```

## Specification

This is REST-like API(Authorization required).

[API Specification is here](documents/specification/index.md)

