# lovelab-api

API server of [Lovelab(private repository)](https://github.com/enpit2su-ics/2019-team-C/) with node.js and express

- [node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## What is Lovelab?

Lovelab is a to-do list application on iPhone.
You can share a to-do list with a team or community like a laboratory.
Lovelab is suitable for laboratories.

## Running on Web

Lovelab API server is running on [lovelab.pw](https://lovelab.pw/api/v1).

## Running Locally

Need [docker-compose](https://docs.docker.com/compose/install/) (version 1.24.1)

```sh
$ git clone https://github.com/basd4g/lovelab-api.git
$ cd lovelab-api
$ cp .env.example .env

$ ./run.sh local
# same as `$ docker-compose up`

# Open https://localhost/api/v1 on browser.
```

## Running test Locally

```sh
$ ./run.sh test
```

## Specification

This is REST-like API(Authorization required).

[API Specification is here](documents/specification/index.md)

