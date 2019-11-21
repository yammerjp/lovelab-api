# APIを試しにcallするときに使うサンプルのリスト

## users

### POST /users

#### Call 

```json
{
	"email": "email@example.com",
	"password": "password",
	"name": "username"
}
```
#### Responce

```json
{
    "groupid": null,
    "picturepath": null,
    "id": 1,
    "email": "email@example.com",
    "name": "username"
}
```
### GET /users/:id

#### Responce

```json
{
    "groupid": null,
    "picturepath": null,
    "id": 2,
    "email": "email@example.com",
    "name": "username"
}
```

### GET /users?groupid=1

#### Call

query ... groupid=1

#### Responce

```json
[
    {
        "groupid": 1,
        "picturepath": null,
        "id": 1,
        "email": "email@example.com",
        "name": "username"
    }
]
```
## groups

### POST /groups?userid=:userid

// 新しく作成したグループに作成したユーザーが加入するようにする予定。
ただし、現在は認証を実装しておらず、リクエストしたユーザーが誰かわからないので、自身のuseridをクエリに記述することで一応動作させる。


#### Call

```json
{
    "name": "first group",
    "picturepath": "#"
}
```

#### Responce

```json
{
    "id": 1,
    "name": "first group",
    "picturepath": "#"
}
```

### GET /groups/:id

#### Responce

```json
{
    "id": 1,
    "name": "first group",
    "picturepath": "#"
}
```
## invitations

### POST /invitations

#### Call

```json
{
	"groupid":1,
	"inviteruserid":"1",
	"inviteeuserid":"2",
	"message":"Hello!"
}
```

#### Responce

```json
{
    "id": 1,
    "groupid": 1,
    "inviteruserid": 1,
    "inviteeuserid": 2,
    "message": "Hello!",
    "updatedAt": "2019-11-21T10:03:03.225Z",
    "createdAt": "2019-11-21T10:03:03.225Z"
}
```

### GET /invitations/:id

#### Responce

未実装

### GET /invitations?inviteeuserid=

#### Call

query ... ?inviteeuserid=2

#### Responce

```json
[
    {
        "id": 1,
        "groupid": 1,
        "inviteruserid": 1,
        "inviteeuserid": 2,
        "message": "Hello!",
        "createdAt": "2019-11-21T10:03:03.225Z",
        "updatedAt": "2019-11-21T10:03:03.225Z"
    },
    {
        "id": 2,
        "groupid": 1,
        "inviteruserid": 1,
        "inviteeuserid": 2,
        "message": "Hello!",
        "createdAt": "2019-11-21T10:03:54.526Z",
        "updatedAt": "2019-11-21T10:03:54.526Z"
    }
]
```

### DELETE /invitation/:id

#### Call

http://localhost:3000/api/v1/invitations/1

#### Responce

```json
{
    "error": false,
}
```

### DELETE /invitations/:id?agreement=true

#### Responce

```json
{
    "error": false
}
```
