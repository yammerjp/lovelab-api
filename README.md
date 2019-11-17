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

### API URI

#### user

- GET /users?groups=:id // グループに所属するユーザーを取得 
- GET /users/:id // ユーザー情報を取得
- POST /users // ユーザーを追加 // 認証に絡む。新しいアカウントの作成

#### invitation

- POST /users/:id/invitation // グループへの招待を追加 自分の所属するグループへの招待のみ可能
- GET /users/:id/invitation // 招待をすべて取得 自分への招待のみ取得可能
- PUT /users/:id/invitation/:id // 招待を承諾/拒否 自分への招待のみ編集可能

#### group

- GET /groups/:id // グループの情報を取得
- POST /groups // グループを追加 自分が強制的にそのグループに所属することになる 

#### task

- GET /groups/:id/tasks // グループのタスク一覧を取得 自分の所属するグループのみ取得可能
- POST /groups/:id/tasks // タスクを追加 自分の所属するグループのみ追加可能
- GET /groups/:id/tasks/:id // タスクの詳細を取得 自分の所属するグループのみ取得可能
- PUT /groups/:id/tasks/:id // タスクを完了 自分の所属するグループのみ編集可能

### Database table structure

#### user table

- id ... int
- passwordhash ... char[]
- name ... nvarchar[]
- groupid ... int
- updatedtimestamp ... timestamp
- picturepath ... varchar[]

#### task table

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

#### group table

- id ... int
- name ... nvarchar[]
- updatedtimestamp ... timestamp
- picturepath varchar[]

#### invitation table

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

- install TypeScript
- commonjs -> ES6
- connect DataBase
- write code of API
