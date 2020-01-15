# lovelab-api

API server of [Lovelab(private repository)](https://github.com/enpit2su-ics/2019-team-C/) with node.js and express

- [node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## What is Lovelab?

Lovelab is a to-do list application on iphone.
You can share a to-do list with a team or community like a laboratory.
Lovelab is suitable for laboratories.

## Running on web

Lovelab API server is running on [lovelab.pw](http://lovelab.pw/api/v1).

## Running Locally

Need docker-compose version 1.24.1

```sh
$ git clone https://github.com/basd4g/lovelab-api.git
$ cd lovelab-api
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

