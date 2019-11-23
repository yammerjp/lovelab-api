# lovelab.heroku

API server of lovelab with node.js and express

## Run

### Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/basd4g/lovelab.heroku
$ cd lovelab.heroku
$ npm install
$ npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

### Deploying to Heroku

```sh
$ heroku create
$ git push heroku master
$ heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Specification

This is REST-like API(Authentication required).

[API仕様書](document/apiSpec.md)にAPIの仕様を記述した。

## Database table structure

### user table

- id ... int
- passwordhash ... char[]
- name ... nvarchar[]
- groupid ... int
- updatedtimestamp ... timestamp
- picturepath ... varchar[]

### task table

- id ... int
- name ... nvarchar[]
- isfinished ... boolean
- groupid ... int 
- updateddate ... datetime
- updatedtimestamp ... timestamp
- comment ... nvarchar[]
- deadlinedate ... datetime
- finisheddate ... datetime
- whoisdoinguserid ... int

### group table

- id ... int
- name ... nvarchar[]
- updatedtimestamp ... timestamp
- picturepath varchar[]

### invitation table

- id ... int
- groupid ... int 
- inviteruserid ... int
- inviteeuserid ... int
- updatedtimestamp ... timestamp

## Documentation of Heroku and Node.js

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

## Developing

### ToDo

- install lint
- connect DataBase
- write code of API
